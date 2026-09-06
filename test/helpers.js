'use strict';

// Test utilities that boot a real jsdom window, inject the library exactly
// like a <script> tag would, and let callers drive the same lifecycle events
// (pageshow/load and user-interaction events) that Defer.js listens for.
// This is what keeps the tests honest against README.md / demo/index.html:
// we exercise the public API the same way a website author would.

const fs = require('fs');
const path = require('path');
const {
  JSDOM
} = require('jsdom');

const DEFER_SRC = fs.readFileSync(path.join(__dirname, '../src/defer.js'), 'utf8');

// Creates a jsdom window with Defer.js already injected, while the document
// is still "loading".
function createEnv({
  html
} = {}) {
  // "runScripts: dangerously" is required even though we inject the library
  // via window.eval() ourselves: without it, jsdom evaluates window.eval()
  // in a detached sandbox where globals like "document" don't exist.
  // It also lets Defer.all() actually execute the inline scripts it clones,
  // matching how a real browser behaves.
  const dom = new JSDOM(html || '<!doctype html><html><body></body></html>', {
    runScripts: 'dangerously',
    pretendToBeVisual: true,
  });

  const {
    window
  } = dom;

  // Sanity check: our tests rely on jsdom exposing "onpageshow", which makes
  // Defer.js pick "pageshow" as its boot event (see WINDOW_EVENT in defer.js).
  if (!('onpageshow' in window)) {
    throw new Error('Test environment assumption broken: window has no onpageshow');
  }

  // Keep test output readable and avoid duplicate console.time() labels
  // colliding across the many windows created by the test suite.
  window.console = { log() {}, debug() {}, time() {}, timeEnd() {}, warn() {}, error() {} };

  window.eval(DEFER_SRC);

  return dom;
}

// Fires the event Defer.js is listening for to detect "page fully loaded".
function firePageShow(window) {
  window.dispatchEvent(new window.Event('pageshow'));
}

// Fires one of the user-interaction events Defer.js listens for to release
// the lazy queue (see ACTION_EVENTS in defer.js).
function fireUserInteraction(window, type) {
  window.dispatchEvent(new window.Event(type || 'keydown'));
}

// Lets pending setTimeout(..., delay) callbacks queued by Defer.js run.
function tick(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms == null ? 0 : ms));
}

module.exports = {
  createEnv,
  firePageShow,
  fireUserInteraction,
  tick
};
