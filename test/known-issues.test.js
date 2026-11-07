'use strict';

// Tests for the problems listed in KNOWN_ISSUES.md.
//
// Each test pins the CURRENT behavior, so it passes today.
// If you fix an issue on purpose, the matching test will fail.
// Update the test and remove the entry from KNOWN_ISSUES.md in the same commit.
//
// Run from the repo root:
//   node --test test/known-issues.test.js

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');
const { createEnv, firePageShow, tick } = require('./helpers');

// KI-2: Defer.dom() marks each element on its first visit.
// A later call that matches the same element is skipped.
// Its unveiledClass or resolver never applies.
test('KI-2: a second Defer.dom() call on the same element is ignored', async () => {
  const dom = createEnv({
    html: '<!doctype html><html><body><img id="i" data-src="a.png"></body></html>',
  });
  const { window } = dom;

  window.Defer.dom('#i', 0, 'first');
  window.Defer.dom('#i', 0, 'second');
  firePageShow(window);
  await tick(20);

  const cls = window.document.getElementById('i').className;
  assert.match(cls, /\bfirst\b/);
  assert.doesNotMatch(cls, /\bsecond\b/, 'the second class is never added');
  dom.window.close();
});

// KI-4: unveiledClass is added with "node.className += ...".
// On SVG elements className is read-only, so the class is not added.
test('KI-4: unveiledClass is not applied to SVG elements', () => {
  const dom = createEnv({
    html: '<!doctype html><html><body>' +
      '<svg><image id="s" class="k" data-href="x.png"></image></svg>' +
      '</body></html>',
  });
  const { window } = dom;
  const node = window.document.getElementById('s');

  window.Defer.reveal(node, 'shown');

  assert.equal(node.getAttribute('class'), 'k', 'the "shown" class is missing');
  assert.equal(node.getAttribute('href'), 'x.png', 'data-href is still unveiled');
  dom.window.close();
});

// KI-5: The first class added by unveiledClass has a leading space.
// A node with no class gets class=" shown".
// Browsers ignore it, but string comparisons on the attribute see it.
test('KI-5: unveiledClass adds a leading space on nodes with no class', () => {
  const dom = createEnv({
    html: '<!doctype html><html><body><img id="i" data-src="a.png"></body></html>',
  });
  const { window } = dom;
  const node = window.document.getElementById('i');

  window.Defer.reveal(node, 'shown');

  assert.equal(node.getAttribute('class'), ' shown');
  dom.window.close();
});

// KI-6 (issue #146): every Defer.dom() call creates its own IntersectionObserver,
// and the library never calls disconnect() on it.
test('KI-6: each Defer.dom() call creates a new IntersectionObserver', async () => {
  let created = 0;
  let disconnected = 0;
  const dom = new JSDOM('<!doctype html><html><body><img data-src="a.png"></body></html>', {
    runScripts: 'dangerously',
    pretendToBeVisual: true,
    beforeParse(window) {
      window.console = { log() {}, debug() {}, time() {}, timeEnd() {} };
      window.IntersectionObserver = function () {
        created++;
        this.observe = () => {};
        this.unobserve = () => {};
        this.disconnect = () => { disconnected++; };
      };
    },
  });
  const { window } = dom;

  window.eval(fs.readFileSync(path.join(__dirname, '../src/defer.js'), 'utf8'));
  window.Defer.dom();
  window.Defer.dom();
  window.Defer.dom();
  firePageShow(window);
  await tick(30);

  assert.equal(created, 3, 'one observer per call');
  assert.equal(disconnected, 0, 'none is ever disconnected');
  dom.window.close();
});

// KI-7 (issues #115, #109): two Defer.all() calls have separate queues.
// A script with "src" blocks only its own queue, so a lazy group can run
// while a deferjs group is still waiting for a download.
test('KI-7: a lazy Defer.all() group runs while a deferjs group waits for a download', async () => {
  const dom = createEnv({
    html: '<!doctype html><html><body>' +
      '<script type="deferjs" src="https://example.com/lib.js"></script>' +
      '<script type="deferjs">window.order.push("deferjs")</script>' +
      '<script type="lazyjs">window.order.push("lazy")</script>' +
      '</body></html>',
  });
  const { window } = dom;
  window.order = [];

  window.Defer.all('script[type=lazyjs]', 0, true);
  firePageShow(window);
  await tick(5);
  window.dispatchEvent(new window.Event('keydown'));
  await tick(450);

  assert.deepEqual(window.order, ['lazy'], 'the deferjs script is still blocked by lib.js');
  dom.window.close();
});
