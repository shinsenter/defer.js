'use strict';

// Covers README.md "Defer(func, [delay], [waitForUserAction])" and the
// "Defer.lazy" member.

const {
  test
} = require('node:test');
const assert = require('node:assert/strict');
const {
  createEnv,
  firePageShow,
  fireUserInteraction,
  tick
} = require('./helpers');

test('Defer() exposes Defer.all/dom/css/js/reveal and Defer.lazy is settable', () => {
  const dom = createEnv();
  const {
    Defer
  } = dom.window;

  assert.equal(typeof Defer, 'function');
  assert.equal(typeof Defer.all, 'function');
  assert.equal(typeof Defer.dom, 'function');
  assert.equal(typeof Defer.css, 'function');
  assert.equal(typeof Defer.js, 'function');
  assert.equal(typeof Defer.reveal, 'function');

  Defer.lazy = true;
  assert.equal(Defer.lazy, true);
  dom.window.close();
});

test('Defer() runs the function only after the page has "fully loaded"', async () => {
  const dom = createEnv();
  const {
    window
  } = dom;
  let ran = false;

  window.Defer(() => {
    ran = true;
  }, 0);

  await tick();
  assert.equal(ran, false, 'must not run before the boot event fires');

  firePageShow(window);
  await tick();
  assert.equal(ran, true, 'must run once the boot event has fired');
  dom.window.close();
});

test('Defer(func, delay, waitForUserAction=true) waits for user interaction', async () => {
  const dom = createEnv();
  const {
    window
  } = dom;
  let ran = false;

  window.Defer(() => {
    ran = true;
  }, 0, true);

  firePageShow(window);
  await tick();
  assert.equal(ran, false, 'page load alone must not run a lazy task');

  fireUserInteraction(window, 'keydown');
  // Lazy tasks are floored to a minimum 350ms delay (see the "issue #121"
  // comment in defer.js), so give it enough time to actually fire.
  await tick(400);
  assert.equal(ran, true, 'a user interaction event must run the lazy task');
  dom.window.close();
});

test('Defer(func, delay, waitForUserAction=<ms>) auto-runs after the timeout with no interaction', async () => {
  const dom = createEnv();
  const {
    window
  } = dom;
  let ran = false;

  window.Defer(() => {
    ran = true;
  }, 0, 50);

  firePageShow(window);
  await tick(10);
  assert.equal(ran, false, 'must still be waiting shortly after load');

  await tick(80);
  assert.equal(ran, true, 'must auto-run once the timeout elapses without interaction');
  dom.window.close();
});

test('Defer.lazy=true changes the default waitForUserAction for Defer()', async () => {
  const dom = createEnv();
  const {
    window
  } = dom;
  let ran = false;

  window.Defer.lazy = true;
  window.Defer(() => {
    ran = true;
  }, 0);

  firePageShow(window);
  await tick();
  assert.equal(ran, false, 'Defer.lazy=true must make Defer() wait for interaction by default');

  fireUserInteraction(window, 'mousemove');
  await tick(400);
  assert.equal(ran, true);
  dom.window.close();
});

test('Defer() invoked after the page is already ready runs asynchronously without waiting', async () => {
  const dom = createEnv();
  const {
    window
  } = dom;

  firePageShow(window);
  await tick();

  let ran = false;
  window.Defer(() => {
    ran = true;
  });
  await tick();
  assert.equal(ran, true);
  dom.window.close();
});
