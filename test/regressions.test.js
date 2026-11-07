'use strict';

// Regression tests for specific past issues/discussions referenced directly
// in the source comments and in demo/index.html. Keep these mapped 1:1 to
// the linked issue so a future change that reintroduces one of them fails
// here first.

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createEnv, firePageShow, tick } = require('./helpers');

// https://code.shin.company/defer.js/discussions/122
// "A temporary fix for issue #121" (see the Math.max(...) comment in
// defer.js): lazy/waitForUserAction tasks are floored to a minimum 350ms
// delay after the triggering interaction, to avoid iOS Safari swallowing
// the very first tap that also causes a DOM mutation.
test('#122: a lazy task never fires before its ~350ms floor, even with delay=0', async () => {
  const dom = createEnv();
  const { window } = dom;
  let ran = false;

  window.Defer(() => { ran = true; }, 0, true);
  firePageShow(window);
  await tick();

  window.dispatchEvent(new window.Event('keydown'));

  await tick(100);
  assert.equal(ran, false, 'must still be waiting well before the 350ms floor');

  await tick(350);
  assert.equal(ran, true, 'must have run once the floor has elapsed');

  dom.window.close();
});

// https://code.shin.company/defer.js/issues/121
// demo/index.html mutates the DOM (#navs innerHTML) from a script deferred
// with Defer.all(selector, 0, true). The regression was that this kind of
// lazy DOM mutation triggered by a real user tap could interfere with the
// interaction itself; here we just pin that the deferred mutation still
// actually runs correctly once triggered.
test('#121: a lazy Defer.all() script that mutates the DOM runs correctly on interaction', async () => {
  const dom = createEnv({
    html: `<!doctype html><html><body>
      <nav id="navs"></nav>
      <script type="issue-121">
        document.getElementById('navs').innerHTML = '<a href="#done">done</a>';
      </script>
    </body></html>`,
  });
  const { window } = dom;

  window.Defer.all('script[type="issue-121"]', 0, true);
  firePageShow(window);
  await tick();
  assert.equal(window.document.getElementById('navs').innerHTML, '', 'must not mutate before interaction');

  window.dispatchEvent(new window.Event('keydown'));
  await tick(400);

  assert.equal(window.document.getElementById('navs').innerHTML, '<a href="#done">done</a>');
  dom.window.close();
});

// https://github.com/shinsenter/defer.js/issues/145
// https://github.com/shinsenter/defer.js/issues/148
// demo/index.html mixes a src script and an inline script under the same
// custom type selector, with the inline one carrying data-type="text/javascript"
// so it keeps a real MIME type instead of the "issue-145" sentinel. This is
// the same code path fixed for the "module" example (see the "data-type"
// test in defer-all.test.js), exercised here with a src+inline pair and
// waitForUserAction=false, matching the demo's exact usage.
test('#145/#148: data-type is preserved on an inline clone even when mixed with a src script', async () => {
  const dom = createEnv({
    html: `<!doctype html><html><body>
      <script type="issue-145" id="ext" src="https://example.com/sdk.js" data-xxx="test1"></script>
      <script type="issue-145" id="inline" data-type="text/javascript" data-yyy="test2">window.hits.push('ran');</script>
    </body></html>`,
  });
  const { window } = dom;
  window.hits = [];

  window.Defer.all('script[type="issue-145"]', 0, false);
  firePageShow(window);
  await tick();

  // The src script blocks the queue until it "loads"; simulate that so the
  // inline script after it gets dequeued too. Query by tag: a same-id
  // preload <link> is also added to <head> for this script (see the
  // "preload <link>" test in defer-all.test.js), so #ext alone is ambiguous.
  const extClone = window.document.body.querySelector('#ext');
  assert.equal(extClone.getAttribute('data-xxx'), 'test1', 'attributes must survive the clone');
  extClone.dispatchEvent(new window.Event('load'));
  await tick();

  const inlineClone = window.document.body.querySelector('#inline');
  assert.equal(inlineClone.getAttribute('type'), 'text/javascript', 'data-type must become the real type');
  assert.equal(inlineClone.getAttribute('data-yyy'), 'test2');
  assert.deepEqual(window.hits, ['ran']);
  dom.window.close();
});

// https://github.com/shinsenter/defer.js/discussions/131#discussioncomment-8775870
// Setting Defer.lazy to a number (instead of true/false) makes deferred
// tasks auto-run after that many milliseconds even without any user
// interaction.
test('discussion #131: Defer.lazy=<ms> auto-runs deferred tasks without requiring interaction', async () => {
  const dom = createEnv();
  const { window } = dom;
  let ran = false;

  window.Defer.lazy = 100;
  window.Defer(() => { ran = true; });

  firePageShow(window);
  await tick(20);
  assert.equal(ran, false, 'must still be waiting shortly after load');

  await tick(120);
  assert.equal(ran, true, 'must auto-run once the Defer.lazy timeout elapses with no interaction');

  dom.window.close();
});
