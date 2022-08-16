# Package @shinsenter/defer.js

🥇 A super small, super-efficient library that helps you lazy load (almost) anything. Core Web Vitals friendly.

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
- **Version**: 3.1.0
- **Author**: Mai Nhut Tan <shin@shin.company>
- **Copyright**: 2022 AppSeeds <https://code.shin.company/>
- **License**: [MIT](https://code.shin.company/defer.js/blob/master/LICENSE)

> [NEED HELP] Please help me improve the documentation and examples. I appreciate your love and support.

* * *


## Introduction

Big CSS files, slow javascript (third-party add-ons, etc.)
or media resources (photos, videos, iframes) on your website may cause
[Web Vitals](https://web.dev/vitals/) issues in real scenarios.

Fully deferring (lazy loading) those resources may help your website
reduce those Web Vitals issues, or even deliver faster page load speed.

You would be happy, and your customers would be happy, too.

> [Japanese] 日本人の方は[こちらの記事](https://www.limosuki.com/2022/06/twitter-lazyload-deferjs.html)をご参考にして頂ければと思います。


## Why you should consider using Defer.js?

- 🧩 Lazy load (almost) anything
- 🎯 [Core Web Vitals](https://web.dev/vitals/) friendly
- 🚀 Dependency-free, no jQuery, amazing fast
- ⚡️ Super tiny (minzipped size is under 1KB)
- 🦾 Hardened (over 3 years old and used in many apps)
- 🤝 Works well with your favorite frameworks
- 🔰 Very easy to use
- 📱 Smartphone browser friendly
- ✅ Supports legacy browsers (IE9+)


## Browser support

The library works perfectly on any modern browser.
It also works on legacy browsers like Internet Explorer 9
<sup>* (with `IntersectionObserver` polyfill library)</sup>.

- 🖥 IE9+ / Microsoft EDGE
- 🖥 Firefox 4+
- 🖥 Safari 3+
- 🖥 Chrome
- 🖥 Opera
- 📱 Android 4+
- 📱 iOS 3.2+


## Getting started

### Basic

Just put a `<script>` tag pointing to the library URL just below the opening `<head>` tag of your page.

```html
<head>
  <meta charset="UTF-8" />
  <title>My Awesome Page</title>

  <!-- Put defer.min.js here -->
  <script src="https://cdn.jsdelivr.net/npm/@shinsenter/defer.js@3.1.0/dist/defer.min.js"></script>

  <!-- ... -->
</head>
```

### Inlining the library

Because `defer.min.js` is optimized to very tiny file size, you can even inline entire the library to save one HTTP request.

```html
<head>
  <meta charset="UTF-8" />
  <title>My Awesome Page</title>

  <!-- Copy the script from below URL -->
  <!-- https://cdn.jsdelivr.net/npm/@shinsenter/defer.js@3.1.0/dist/defer.min.js -->
  <script>/* then replace this comment block with the content of defer.min.js */</script>

  <!-- ... -->
</head>
```

### Compatibility with older versions

If you have no time to upgrade from an older version,
just use `defer_plus.min.js` instead of `defer.min.js`.

```html
<head>
  <meta charset="UTF-8" />
  <title>My Awesome Page</title>

  <!-- Put defer_plus.min.js here -->
  <script src="https://cdn.jsdelivr.net/npm/@shinsenter/defer.js@3.1.0/dist/defer_plus.min.js"></script>

  <!-- ... -->
</head>
```

### For OLD browsers (such as IE9)

To take advantage of native performance for legacy browsers (such as IE9)
that doesn't support `IntersectionObserver` feature,
you should load `IntersectionObserver` polyfill library
right after the `defer.min.js` script tag as following example:

```html
<script>/* the content of defer.min.js */</script>

<!-- If legacy browsers like Internet Explorer 9 still need to be supported -->
<!-- Please put IntersectionObserver polyfill right after defer.js script tag -->
<script>'IntersectionObserver'in window||document.write('<script src="https://cdn.jsdelivr.net/npm/@shinsenter/defer.js@3.1.0/dist/polyfill.min.js"><\/script>');</script>
```

*HINT*: Modern browsers support `IntersectionObserver` feature,
so you don't have to be concerned about it if you don't care about IE users.
