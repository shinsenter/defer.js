# Package @shinsenter/defer.js

🥇 A JavaScript micro-library that helps you lazy load (almost) anything. Defer.js is zero-dependency, super-efficient, and Web Vitals friendly.

[![NPM](https://img.shields.io/npm/l/@shinsenter/defer.js)](https://code.shin.company/defer.js/blob/master/LICENSE)
[![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/@shinsenter/defer.js)](https://snyk.io/advisor/npm-package/@shinsenter/defer.js)
[![CodeFactor Grade](https://img.shields.io/codefactor/grade/github/shinsenter/defer.js)](https://www.codefactor.io/repository/github/shinsenter/defer.js)
[![GitHub Release Date](https://img.shields.io/github/release-date/shinsenter/defer.js)](https://code.shin.company/defer.js/releases)
[![GitHub package.json version](https://img.shields.io/github/package-json/v/shinsenter/defer.js)](https://code.shin.company/defer.js/releases)
[![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@shinsenter/defer.js)](https://www.npmjs.com/package/@shinsenter/defer.js)
[![jsDelivr hits (npm)](https://img.shields.io/jsdelivr/npm/hm/@shinsenter/defer.js)](https://www.jsdelivr.com/package/npm/@shinsenter/defer.js)


* * *


## Introduction

Lagging Big CSS files, slow JavaScript, or bulky media resources can cause issues with your website's Web Vitals, leading to a slow and frustrating user experience. But what if you could fully defer these resources and improve your website's load speed?

By using Defer.js, you can say goodbye to these issues! With its lazy loading capabilities, dependency-free design, lightning-fast performance, and hard-won experience, Defer.js is the perfect solution for optimizing your website's Web Vitals. Whether you're using a modern or legacy browser, Defer.js makes it easy to enhance your website's user experience with lightning-fast loading times.

[![NPM](https://nodei.co/npm/@shinsenter/defer.js.png?downloads=true)](https://www.npmjs.com/package/@shinsenter/defer.js)

- **Package**: [@shinsenter/defer.js](https://www.npmjs.com/package/@shinsenter/defer.js)
- **Version**: 3.7.0
- **Author**: Mai Nhut Tan <shin@shin.company>
- **Copyright**: 2019-2023 SHIN Company <https://code.shin.company/>
- **License**: [MIT](https://code.shin.company/defer.js/blob/master/LICENSE)

---

## Document in other languages

> [NEED HELP] Let's make the documentation and examples better together!

### 日本語

日本人のはこちらの記事を参考にしていただければ幸いです。

- アタルさんの[Defer.js ドキュメント （日本語訳）](https://blog.gadgets-geek.net/2023/02/deferjs-doc-japanese.html)
- あトんさんの[記事](https://www.heavy-peat.com/2022/02/defer.html)
- リモスキさんの[記事](https://www.limosuki.com/2022/06/twitter-lazyload-deferjs.html)

#### Credits

I would like to express warm thanks to [@Ataruchi](https://twitter.com/Ataruchi), [@HeavyPeat](https://twitter.com/HeavyPeat) and [Limosuki](https://www.limosuki.com/) for their articles in Japanese.

***

## Why Choose Defer.js

- 🧩 Lazy load almost anything with ease
- 🚀 Lightweight and fast, with no dependencies
- 🤝 Effortlessly integrates with your favorite frameworks
- 🔰 Easy to use, even for beginners
- ⚡️ Super tiny (minzipped size is around 1KB)
- 🦾 Optimized for the latest Web Vitals standards
- 📱 Optimized for use on smartphones
- ✅ Supports legacy browsers like Internet Explorer 9

<sup>*Legacy browsers like Internet Explorer 9 require `IntersectionObserver` polyfill.</sup>

## Browser Support

Defer.js is compatible with all modern browsers, including:
- 🖥 IE9+ / Edge
- 🖥 Firefox 4+
- 🖥 Safari 3+
- 🖥 Chrome
- 🖥 Opera
- 📱 Android 4+
- 📱 iOS 3.2+

---

## Known issues

- [Discussion #122](https://code.shin.company/defer.js/discussions/122):
In iOS Safari, the first `click` event may not work when using `Defer.all()` with the `waitForUserAction` argument set to `true` and one of deferred scripts make a DOM change.

---

## Getting started

Defer.js is an easy-to-use library that will help boost your website's performance by reducing loading times. Here's how to get started:

### Basic

Add the Defer.js library to your page by including a `<script>` tag just below the opening `<head>` tag.

```html
<head>
  <meta charset="UTF-8" />
  <title>My Awesome Page</title>

  <!-- Add Defer.js here -->
  <script src="https://cdn.jsdelivr.net/npm/@shinsenter/defer.js@3.7.0/dist/defer.min.js"></script>

  <!-- ... -->
</head>
```

### Inlining the library

To save an HTTP request, you can even inline the entire Defer.js library by copying its content from the [defer.min.js](https://cdn.jsdelivr.net/npm/@shinsenter/defer.js@3.7.0/dist/defer.min.js) and replacing the comments in the script tag with its content.

```html
<head>
  <meta charset="UTF-8" />
  <title>My Awesome Page</title>

  <!-- Add the Inlined Defer.js here -->
  <script>/* Defer.js content goes here */</script>

  <!-- ... -->
</head>
```

### Compatibility with older versions

If you're using an older version of Defer.js, you can use `defer_plus.min.js` instead of `defer.min.js`.

```html
<head>
  <meta charset="UTF-8" />
  <title>My Awesome Page</title>

  <!-- Put defer_plus.min.js here -->
  <script src="https://cdn.jsdelivr.net/npm/@shinsenter/defer.js@3.7.0/dist/defer_plus.min.js"></script>

  <!-- ... -->
</head>
```

### For OLD browsers (such as IE9)

To enhance performance for legacy browsers that don't support the `IntersectionObserver` feature, you can load the IntersectionObserver polyfill library after the `defer.min.js` script tag.

```html
<script>/* Defer.js content */</script>

<!-- Add the IntersectionObserver Polyfill for legacy browsers -->
<script>'IntersectionObserver'in window||document.write('<script src="https://cdn.jsdelivr.net/npm/@shinsenter/defer.js@3.7.0/dist/polyfill.min.js"><\/script>');</script>
```

*NOTE*: Modern browsers support the `IntersectionObserver` feature, so you don't have to worry about adding the polyfill if you don't have legacy browsers in mind.

---

