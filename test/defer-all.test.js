'use strict';

// Covers README.md "Defer.all([selector], [delay], [waitForUserAction])" and
// the corresponding examples in demo/index.html ("Fully Defer <script> Tags").
//
// Defer.all() is normally called from an inline <script> while the page is
// still loading (that's how every README/demo example uses it), so each test
// here calls it before firePageShow(), exactly like a real page would.

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createEnv, firePageShow, tick } = require('./helpers');

test('Defer.all() executes type="deferjs" scripts, in order, only after the page loads', async () => {
  const dom = createEnv({
    html: `<!doctype html><html><body>
      <script type="deferjs">window.hits.push('a');</script>
      <script type="deferjs">window.hits.push('b');</script>
    </body></html>`,
  });
  const { window } = dom;
  window.hits = [];

  window.Defer.all();
  assert.deepEqual(window.hits, [], 'scripts must not run just because Defer.all() was called');

  firePageShow(window);
  await tick();
  assert.deepEqual(window.hits, ['a', 'b'], 'scripts must run in document order once the page loads');

  dom.window.close();
});

test('Defer.all() strips the type attribute so scripts run as regular scripts', async () => {
  const dom = createEnv({
    html: `<!doctype html><html><body>
      <script type="deferjs" id="s1">window.hits.push(document.getElementById('s1').type);</script>
    </body></html>`,
  });
  const { window } = dom;
  window.hits = [];

  window.Defer.all();
  firePageShow(window);
  await tick();

  assert.deepEqual(window.hits, [''], 'the cloned script must not carry a type="deferjs" attribute');
  dom.window.close();
});

test('Defer.all() honors a data-type attribute, per the "module" example', async () => {
  // README: "<script type="deferjs" data-type="module" src="...">" should
  // maintain the "module" type on the executed script. jsdom does not
  // execute type="module" scripts at all, so we can only assert on the
  // resulting attribute here, not on the script actually having run as a
  // module - but that attribute is exactly what a real browser reads to
  // decide the execution mode.
  const dom = createEnv({
    html: `<!doctype html><html><body>
      <script type="deferjs" data-type="module" id="s1"></script>
    </body></html>`,
  });
  const { window } = dom;

  window.Defer.all();
  firePageShow(window);
  await tick();

  const clone = window.document.getElementById('s1');
  assert.equal(clone.getAttribute('type'), 'module');
  dom.window.close();
});

test('Defer.all() adds a preload <link> for scripts with a src attribute', async () => {
  const dom = createEnv({
    html: `<!doctype html><html><body>
      <script type="deferjs" src="https://example.com/lib.js"></script>
    </body></html>`,
  });
  const { window } = dom;

  window.Defer.all();
  firePageShow(window);
  await tick();

  const link = window.document.head.querySelector('link[rel="preload"]');
  assert.ok(link, 'a preload <link> must be added for the src script');
  assert.equal(link.getAttribute('as'), 'script');
  assert.equal(link.getAttribute('href'), 'https://example.com/lib.js');
  dom.window.close();
});

test('Defer.all(selector) can target a custom attribute value, per the "my-magic" example', async () => {
  // Note: the default (no-argument) Defer.all() is auto-invoked once by the
  // library itself for type="deferjs" tags (see the README notice about
  // calling Defer.all() again for that same selector). Examples that want
  // their own delay/waitForUserAction therefore use a custom type value
  // (e.g. "my-magic") so the automatic pass never touches them, which is
  // exactly what we mirror here.
  const dom = createEnv({
    html: `<!doctype html><html><body>
      <script type="my-magic">window.hits.push('magic');</script>
    </body></html>`,
  });
  const { window } = dom;
  window.hits = [];

  window.Defer.all('script[type="my-magic"]');
  firePageShow(window);
  await tick();

  assert.deepEqual(window.hits, ['magic']);
  dom.window.close();
});

test('Defer.all(selector, delay, waitForUserAction=true) defers execution until interaction', async () => {
  const dom = createEnv({
    html: `<!doctype html><html><body>
      <script type="myscript">window.hits.push('a');</script>
    </body></html>`,
  });
  const { window } = dom;
  window.hits = [];

  window.Defer.all('script[type="myscript"]', 0, true);
  firePageShow(window);
  await tick();
  assert.deepEqual(window.hits, [], 'must not run until a user interacts');

  window.dispatchEvent(new window.Event('keydown'));
  await tick(400);
  assert.deepEqual(window.hits, ['a']);
  dom.window.close();
});
