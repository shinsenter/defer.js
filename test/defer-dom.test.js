'use strict';

// Covers README.md "Defer.dom([selector], [delay], [unveiledClass], [resolver], [observeOptions])"
// and the corresponding examples in demo/index.html.
//
// jsdom has no IntersectionObserver, so Defer.dom() takes the same
// "unveil immediately" fallback path a legacy browser without the API would
// (see the IntersectionObserver branch in fnDeferDom). That keeps these
// tests deterministic without needing to simulate viewport intersections.

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createEnv, firePageShow, tick } = require('./helpers');

test('Defer.dom() converts data-src (and friends) into real attributes', async () => {
  const dom = createEnv({
    html: `<!doctype html><html><body>
      <img id="demo" data-src="https://picsum.photos/id/1003/200/300" data-sizes="200w"
           data-srcset="https://picsum.photos/id/1003/400/600 2x">
    </body></html>`,
  });
  const { window } = dom;

  window.Defer.dom('#demo');
  firePageShow(window);
  await tick();

  const img = window.document.getElementById('demo');
  assert.equal(img.getAttribute('src'), 'https://picsum.photos/id/1003/200/300');
  assert.equal(img.getAttribute('sizes'), '200w');
  assert.equal(img.getAttribute('srcset'), 'https://picsum.photos/id/1003/400/600 2x');
  dom.window.close();
});

test('Defer.dom() adds the unveiledClass once a node is unveiled', async () => {
  const dom = createEnv({
    html: `<!doctype html><html><body>
      <div id="demo" class="image" data-style="background-image:url(https://picsum.photos/id/1068/400/600)"></div>
    </body></html>`,
  });
  const { window } = dom;

  window.Defer.dom('#demo', 0, 'unveiled');
  firePageShow(window);
  await tick();

  const el = window.document.getElementById('demo');
  assert.equal(el.getAttribute('style'), 'background-image:url(https://picsum.photos/id/1068/400/600)');
  assert.ok(el.className.split(' ').includes('unveiled'));
  assert.ok(el.className.split(' ').includes('image'), 'existing class names must be preserved');
  dom.window.close();
});

test('Defer.dom() reveals descendant <source>/<img> tags inside <picture>', async () => {
  const dom = createEnv({
    html: `<!doctype html><html><body>
      <picture id="demo">
        <source type="image/webp" data-srcset="https://picsum.photos/id/1054/400/600.webp 2x">
        <img data-src="https://picsum.photos/id/1054/200/300">
      </picture>
    </body></html>`,
  });
  const { window } = dom;

  window.Defer.dom('#demo');
  firePageShow(window);
  await tick();

  const picture = window.document.getElementById('demo');
  assert.equal(picture.querySelector('source').getAttribute('srcset'), 'https://picsum.photos/id/1054/400/600.webp 2x');
  assert.equal(picture.querySelector('img').getAttribute('src'), 'https://picsum.photos/id/1054/200/300');
  dom.window.close();
});

test('Defer.dom() reveals a video via its child <source data-src>', async () => {
  const dom = createEnv({
    html: `<!doctype html><html><body>
      <video id="demo" data-poster="https://example.com/poster.jpg">
        <source type="video/mp4" data-src="https://example.com/video.mp4">
      </video>
    </body></html>`,
  });
  const { window } = dom;

  window.Defer.dom('#demo');
  firePageShow(window);
  await tick();

  const video = window.document.getElementById('demo');
  assert.equal(video.getAttribute('poster'), 'https://example.com/poster.jpg');
  assert.equal(video.querySelector('source').getAttribute('src'), 'https://example.com/video.mp4');
  dom.window.close();
});

test('Defer.dom() reveals an iframe via data-src', async () => {
  const dom = createEnv({
    html: `<!doctype html><html><body>
      <iframe id="demo" src="about:blank" data-src="https://example.com/embed"></iframe>
    </body></html>`,
  });
  const { window } = dom;

  window.Defer.dom('#demo', 0, 'iframe-loaded');
  firePageShow(window);
  await tick();

  const iframe = window.document.getElementById('demo');
  assert.equal(iframe.getAttribute('src'), 'https://example.com/embed');
  assert.ok(iframe.className.includes('iframe-loaded'));
  dom.window.close();
});

test('Defer.dom() skips a node when the resolver callback returns false', async () => {
  const dom = createEnv({
    html: `<!doctype html><html><body>
      <img id="demo" data-src="https://example.com/a.png">
    </body></html>`,
  });
  const { window } = dom;
  let resolverCalledWith = null;

  window.Defer.dom('#demo', 0, 'unveiled', (node) => {
    resolverCalledWith = node.id;
    return false;
  });
  firePageShow(window);
  await tick();

  const img = window.document.getElementById('demo');
  assert.equal(resolverCalledWith, 'demo');
  assert.equal(img.hasAttribute('src'), false, 'resolver returning false must block the reveal');
  assert.equal(img.className.includes('unveiled'), false);
  dom.window.close();
});

test('Defer.dom() unveils a node when the resolver callback returns a truthy/undefined value', async () => {
  const dom = createEnv({
    html: `<!doctype html><html><body>
      <img id="demo" data-src="https://example.com/a.png">
    </body></html>`,
  });
  const { window } = dom;
  const seen = [];

  window.Defer.dom('#demo', 0, 'unveiled', (node) => { seen.push(node.id); });
  firePageShow(window);
  await tick();

  const img = window.document.getElementById('demo');
  assert.deepEqual(seen, ['demo']);
  assert.equal(img.getAttribute('src'), 'https://example.com/a.png');
  dom.window.close();
});

test('Defer.reveal(node, unveiledClass) manually unveils a single node on demand', () => {
  const dom = createEnv({
    html: `<!doctype html><html><body>
      <img id="demo" data-src="https://example.com/a.png">
    </body></html>`,
  });
  const { window } = dom;

  const img = window.document.getElementById('demo');
  window.Defer.reveal(img, 'seen');

  assert.equal(img.getAttribute('src'), 'https://example.com/a.png');
  assert.ok(img.className.includes('seen'));
  dom.window.close();
});
