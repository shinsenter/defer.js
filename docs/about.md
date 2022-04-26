# Package @shinsenter/defer.js

🥇 A super small, super efficient library that helps you lazy load almost everything like images, video, audio, iframes as well as stylesheets, and JavaScript.

[![NPM](https://img.shields.io/npm/l/@shinsenter/defer.js)](https://code.shin.company/defer.js/blob/master/LICENSE)
[![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/@shinsenter/defer.js)](https://snyk.io/advisor/npm-package/@shinsenter/defer.js)
[![CodeFactor Grade](https://img.shields.io/codefactor/grade/github/shinsenter/defer.js)](https://www.codefactor.io/repository/github/shinsenter/defer.js)

* * *

[![GitHub Release Date](https://img.shields.io/github/release-date/shinsenter/defer.js)](https://code.shin.company/defer.js/releases)
[![GitHub package.json version](https://img.shields.io/github/package-json/v/shinsenter/defer.js)](https://code.shin.company/defer.js/releases)
[![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@shinsenter/defer.js)](https://www.npmjs.com/package/@shinsenter/defer.js)
[![jsDelivr hits (npm)](https://img.shields.io/jsdelivr/npm/hm/@shinsenter/defer.js)](https://www.jsdelivr.com/package/npm/@shinsenter/defer.js)

[![NPM](https://nodei.co/npm/@shinsenter/defer.js.png?downloads=true)](https://www.npmjs.com/package/@shinsenter/defer.js)

- **Package**: [@shinsenter/defer.js](https://www.npmjs.com/package/@shinsenter/defer.js)
- **Version**: 2.6.0
- **Author**: Mai Nhut Tan <shin@shin.company>
- **Copyright**: 2021 AppSeeds <https://code.shin.company/>
- **License**: [MIT](https://code.shin.company/defer.js/blob/master/LICENSE)

* * *


## Use cases

In real life, many resources and third-party scripts,
such as jQuery, are used to enhance our website
to add additional interactivity, animations, and other effects.

Unfortunately, third-party scripts usually block page rendering
and further downloading resources of the page.

There is a [common knowledge](https://web.dev/efficiently-load-third-party-javascript/)
that you should use `<script src="..." async>`
(or `<script src="..." defer>`)
and/or put your scripts at the very bottom of the page,
so that as much as possible of the page gets loaded
and rendered to the user, as fast as possible.

But in various cases, using `async` or `defer` attributes
does not deliver faster page speed than [defer.js](#Defer) does.
Furthermore [defer.js](#Defer) also gives you very simple ways
to flexibly optimize other resources in your website.


## Why you should consider defer.js

- ⚡️ Under 1KB (mingzipped size)
- 🚀 Native API, blazing fast
- 👍 No dependencies, no jQuery
- 🧩 Lazy load almost everything
- 🎯 [Core Web Vitals](https://web.dev/vitals/) friendly
- 🔰 Very easy to use
- 📱 Smartphone browser friendly
- ✅ Supports legacy browsers (IE9+)
- 🤝 Works well with your favorite frameworks


## Browser support

Works perfectly on modern browsers.
Lazy-loading is also available for Internet Explorer 9
<sup>* (with `IntersectionObserver` polyfill library)</sup> and later.

- 🖥 IE9+ / Microsoft EDGE
- 🖥 Firefox 4+
- 🖥 Safari 3+
- 🖥 Chrome
- 🖥 Opera
- 📱 Android 4+
- 📱 iOS 3.2+


## Getting started

### Basic

Add `defer.min.js` from this library into your HTML page,
just below the opening `<head>` tag.

You may download a ZIP of this library,
or load it from a CDN like below example.

```html
<head>
  <meta charset="UTF-8" />
  <title>My Awesome Page</title>

  <!-- Put defer.min.js here -->
  <script id="defer-js" src="https://cdn.jsdelivr.net/npm/@shinsenter/defer.js@2.6.0/dist/defer.min.js"></script>

  <!-- ... -->
</head>
```

### Compatibility with previous releases

I strongly recommend that you should migrate
to the latest version for better performance.

If you have no time and want to ensure compatibility
with older version, use `defer_plus.min.js`
instead of `defer.min.js`.

```html
<head>
  <meta charset="UTF-8" />
  <title>My Awesome Page</title>

  <!-- Put defer_plus.min.js here -->
  <script id="defer-js" src="https://cdn.jsdelivr.net/npm/@shinsenter/defer.js@2.6.0/dist/defer_plus.min.js"></script>

  <!-- ... -->
</head>
```

### Inlining the library

Since size of [defer.js](#Defer) library is optimized
to minimum size, you can inline entire library
in the `<head>` of the HTML document
to minimize the number of requests.

```html
<head>
  <meta charset="UTF-8" />
  <title>My Awesome Page</title>

  <!-- Inlining defer.min.js -->
  <script id="defer-js">/* content of defer.min.js will be here */</script>

  <!-- ... -->
</head>
```

### For OLD browsers (such as IE9)

To take advantage of native performance
for older browsers that doesn't support this feature (such as IE9),
you should load `IntersectionObserver` polyfill library
right after the `defer.min.js` script tag as following example:
```html
<!-- To support older browsers such as Internet Explorer 9 -->
<!-- Please put IntersectionObserver polyfill right after defer.js script tag -->
<script id="polyfill-js">'IntersectionObserver'in window||document.write('<script src="https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver"><\/script>');</script>
```

*Note*: most of modern browsers support IntersectionObserver feature,
so you don't have to concern about it.
