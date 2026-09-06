# @shinsenter/defer.js

🥇 A small JavaScript library to lazy-load almost anything. Defer.js is dependency-free, efficient, and optimized for Web Vitals.

[![NPM](https://img.shields.io/npm/l/@shinsenter/defer.js)](https://code.shin.company/defer.js/blob/master/LICENSE)
[![GitHub Release Date](https://img.shields.io/github/release-date/shinsenter/defer.js)](https://code.shin.company/defer.js/releases)
[![GitHub package.json version](https://img.shields.io/github/package-json/v/shinsenter/defer.js)](https://code.shin.company/defer.js/releases)
<!-- [![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@shinsenter/defer.js)](https://www.npmjs.com/package/@shinsenter/defer.js) -->
[![jsDelivr hits (npm)](https://img.shields.io/jsdelivr/npm/hm/@shinsenter/defer.js)](https://www.jsdelivr.com/package/npm/@shinsenter/defer.js)

> 💡 [View documentation in other languages](#documentation-in-other-languages)

## Introduction

Large CSS files, slow JavaScript, and heavy media resources can negatively impact your website's Web Vitals, resulting in poor performance and a frustrating user experience. But what if you could seamlessly defer the loading of these resources?

By using Defer.js, you can eliminate these issues! With its lazy loading capabilities, zero dependencies, lightning-fast performance, and proven reliability, Defer.js is the ultimate solution for optimizing your website's performance.

## Why Choose Defer.js

- 🧩 Lazy load almost anything with ease
- 🔰 Simple to use, even for beginners
- 🚀 Lightweight and very fast, with no dependencies
- ⚡️ Super tiny (compressed size is approximately 1KB)
- 🤝 Seamlessly integrates with your favorite frameworks
- 🦾 Optimized for the latest Web Vitals standards
- 📱 Mobile-friendly and optimized for smartphones
- ✅ Supports older browsers, including Internet Explorer 9 <sup>[(*)](#supported-browsers)</sup>

## How Defer.js Works

Every `Defer()`, `Defer.all()`, `Defer.dom()`, `Defer.css()`, and `Defer.js()` call is just a task pushed onto one of two internal queues, released at the right moment instead of blocking the page:

- **`fastQueue`** runs as soon as the page finishes loading — no user action required.
- **`lazyQueue`** waits for the visitor's first interaction (or an optional timeout), then runs with a small built-in delay to avoid stealing the very first tap/click (see [Known Issues](#known-issues)).

## Contributing

[![NPM](https://nodei.co/npm/@shinsenter/defer.js.png?downloads=true)](https://www.npmjs.com/package/@shinsenter/defer.js)

- **Package**: [@shinsenter/defer.js](https://www.npmjs.com/package/@shinsenter/defer.js)
- **Version**: 3.10.0
- **Author**: Mai Nhut Tan <shin@shin.company>
- **Copyright**: 2019-2024 SHIN Company <https://code.shin.company/>
- **License**: [MIT](https://code.shin.company/defer.js/blob/master/LICENSE)

If you find this project useful, please give it a star or consider supporting us via [PayPal](https://www.paypal.me/shinsenter).
You can also [open a discussion](https://github.com/shinsenter/defer.js/discussions/new/choose) on GitHub if you have any ideas for improving the library.

[![Donate via PayPal](https://img.shields.io/badge/Donate-Paypal-blue)](https://www.paypal.me/shinsenter) [![Become a Stargazer](https://img.shields.io/badge/Become-Stargazer-yellow)](https://code.shin.company/defer.js)

Your support helps us maintain and improve this project for the community.

We appreciate you respecting the effort that has gone into creating this library.
If you intend to copy or use ideas from this project, please provide proper attribution.

---

## Getting Started

Defer.js is an easy-to-use library that will help boost your website's performance by reducing loading times. Here's how to get started:

### Basic

Add the Defer.js library to your page by including a `<script>` tag just below the opening `<head>` tag.

```html
<head>
  <meta charset="UTF-8" />
  <title>My Awesome Page</title>

  <!-- Add Defer.js here -->
  <script src="https://cdn.jsdelivr.net/npm/@shinsenter/defer.js@3.10.0/dist/defer.min.js"></script>

  <!-- ... -->
</head>
```

### Inlining the Library

To save an HTTP request, you can inline the entire Defer.js library by copying its content from [defer.min.js](https://cdn.jsdelivr.net/npm/@shinsenter/defer.js@3.10.0/dist/defer.min.js).

```html
<head>
  <meta charset="UTF-8" />
  <title>My Awesome Page</title>

  <!-- Add the inlined Defer.js here -->
  <script>/* Defer.js content goes here */</script>

  <!-- ... -->
</head>
```

### For Older Browsers (such as IE9)

To optimize performance for older browsers that don't support the `IntersectionObserver` feature, you can load the IntersectionObserver polyfill library after the `defer.min.js` script tag.

```html
<script>/* Defer.js content */</script>

<!-- Add the IntersectionObserver Polyfill for legacy browsers -->
<script>'IntersectionObserver'in window||document.write('<script src="https://cdn.jsdelivr.net/npm/@shinsenter/defer.js@3.10.0/dist/polyfill.min.js"><\/script>');</script>
```

*NOTE*: Modern browsers support the `IntersectionObserver` feature natively, so you don't need to add the polyfill if you're not targeting older browsers.

---
