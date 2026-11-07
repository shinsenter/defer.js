'use strict';

// Covers README.md "Defer.css(...)" and "Defer.js(...)".
// No real network fetch happens here (jsdom does not auto-load external
// resources unless configured to), so onload is verified by dispatching a
// synthetic "load" event, matching how the browser would signal success.

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createEnv, firePageShow, tick } = require('./helpers');

test('Defer.css() appends a <link rel="stylesheet"> with the given attributes', async () => {
  const dom = createEnv();
  const { window } = dom;
  let onloadCalled = false;

  window.Defer.css('https://example.com/style.css', { crossorigin: 'anonymous' }, 0, () => {
    onloadCalled = true;
  });

  firePageShow(window);
  await tick();

  const link = window.document.head.querySelector('link[rel="stylesheet"]');
  assert.ok(link, 'a stylesheet <link> must be appended to <head>');
  assert.equal(link.getAttribute('href'), 'https://example.com/style.css');
  assert.equal(link.getAttribute('crossorigin'), 'anonymous');
  assert.equal(onloadCalled, false);

  link.dispatchEvent(new window.Event('load'));
  assert.equal(onloadCalled, true, 'onload must fire when the link loads');
  dom.window.close();
});

test('Defer.css(fileUrl, idString) accepts a plain string as the id attribute', async () => {
  const dom = createEnv();
  const { window } = dom;

  window.Defer.css('https://example.com/style.css', 'my-style-id');
  firePageShow(window);
  await tick();

  const link = window.document.getElementById('my-style-id');
  assert.ok(link, 'a string 2nd argument must become the id attribute');
  assert.equal(link.tagName, 'LINK');
  dom.window.close();
});

test('Defer.js() appends a <script src> with the given attributes', async () => {
  const dom = createEnv();
  const { window } = dom;
  let onloadCalled = false;

  window.Defer.js('https://example.com/lib.js', { 'data-id': 'GTM-XXX' }, 0, () => {
    onloadCalled = true;
  });

  firePageShow(window);
  await tick();

  const script = window.document.head.querySelector('script[src="https://example.com/lib.js"]');
  assert.ok(script, 'a <script src> must be appended to <head>');
  assert.equal(script.getAttribute('data-id'), 'GTM-XXX');
  assert.equal(onloadCalled, false);

  script.dispatchEvent(new window.Event('load'));
  assert.equal(onloadCalled, true, 'onload must fire when the script loads');
  dom.window.close();
});

test('Defer.js(fileUrl, idString) accepts a plain string as the id attribute', async () => {
  const dom = createEnv();
  const { window } = dom;

  window.Defer.js('https://example.com/lib.js', 'my-script-id');
  firePageShow(window);
  await tick();

  const script = window.document.getElementById('my-script-id');
  assert.ok(script, 'a string 2nd argument must become the id attribute');
  assert.equal(script.tagName, 'SCRIPT');
  dom.window.close();
});

test('Defer.css()/Defer.js() honor waitForUserAction, like the Animate.css example', async () => {
  const dom = createEnv();
  const { window } = dom;
  let cssLoaded = false;

  window.Defer.css('https://example.com/animate.css', { media: 'screen' }, 0, () => {
    cssLoaded = true;
  }, true);

  firePageShow(window);
  await tick();
  assert.equal(window.document.head.querySelector('link[rel="stylesheet"]'), null,
    'must not fetch the stylesheet until a user interacts');

  window.dispatchEvent(new window.Event('keydown'));
  await tick(400);

  const link = window.document.head.querySelector('link[rel="stylesheet"]');
  assert.ok(link, 'the stylesheet must be appended once the user interacts');
  link.dispatchEvent(new window.Event('load'));
  assert.equal(cssLoaded, true);
  dom.window.close();
});
