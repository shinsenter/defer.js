# @shinsenter/defer.js

🥇 A small JavaScript library to lazy-load almost anything. Defer.js is dependency-free, efficient, and optimized for Web Vitals.

[![NPM](https://img.shields.io/npm/l/@shinsenter/defer.js)](https://code.shin.company/defer.js/blob/master/LICENSE)
[![GitHub Release Date](https://img.shields.io/github/release-date/shinsenter/defer.js)](https://code.shin.company/defer.js/releases)
[![GitHub package.json version](https://img.shields.io/github/package-json/v/shinsenter/defer.js)](https://code.shin.company/defer.js/releases)
<!-- [![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@shinsenter/defer.js)](https://www.npmjs.com/package/@shinsenter/defer.js) -->
[![jsDelivr hits (npm)](https://img.shields.io/jsdelivr/npm/hm/@shinsenter/defer.js)](https://www.jsdelivr.com/package/npm/@shinsenter/defer.js)

> 💡 [View document in other languages](#documentation-in-other-languages)

## Introduction

Large CSS files, slow JavaScript, or bulky media resources can negatively impact your website's Web Vitals, leading to a slow and frustrating user experience. But what if you could seamlessly defer these resources and boost your website's load speed?

By utilizing Defer.js, you can say goodbye to these issues! With its lazy loading capabilities, no dependencies, lightning-fast performance, and long experience, Defer.js is the ultimate solution for optimizing your website's Web Vitals. Whether you're using a modern or older browser, Defer.js makes it easy to enhance your website's user experience with fast loading times.

## Why Choose Defer.js

- 🧩 Lazy load easily almost anything
- 🔰 Easy to use, even for beginners
- 🚀 Lightweight and very fast, with no dependencies
- ⚡️ Super tiny (compressed size is around 1KB)
- 🤝 Seamlessly integrates with your favorite frameworks
- 🦾 Optimized for the latest Web Vitals standards
- 📱 Optimized for smartphones
- ✅ Supports older browsers like Internet Explorer 9 <sup>[(*)](#supported-browsers)</sup>

## Contributing

[![NPM](https://nodei.co/npm/@shinsenter/defer.js.png?downloads=true)](https://www.npmjs.com/package/@shinsenter/defer.js)

- **Package**: [@shinsenter/defer.js](https://www.npmjs.com/package/@shinsenter/defer.js)
- **Version**: 3.10.0
- **Author**: Mai Nhut Tan <shin@shin.company>
- **Copyright**: 2019-2024 SHIN Company <https://code.shin.company/>
- **License**: [MIT](https://code.shin.company/defer.js/blob/master/LICENSE)

If you find the project useful, please give it a star or consider donating via [PayPal](https://www.paypal.me/shinsenter).
You can also [open a discussion](https://github.com/shinsenter/defer.js/discussions/new/choose) on Github if you have any idea to improve the library.

[![Donate via PayPal](https://img.shields.io/badge/Donate-Paypal-blue)](https://www.paypal.me/shinsenter) [![Become a Stargazer](https://img.shields.io/badge/Become-Stargazer-yellow)](https://code.shin.company/defer.js/stargazers) [![Report an issue](https://img.shields.io/badge/New-Discussions-green)](https://code.shin.company/defer.js/discussions/new/choose)

Your support helps maintain and improve this project for the community.

I appreciate you respecting my effort in creating this library.
If you intend to copy or use ideas from this project, please give proper credit.

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

To save an HTTP request, you can even inline the entire Defer.js library by copying its content from the [defer.min.js](https://cdn.jsdelivr.net/npm/@shinsenter/defer.js@3.10.0/dist/defer.min.js) and replacing the comments in the script tag with its content.

```html
<head>
  <meta charset="UTF-8" />
  <title>My Awesome Page</title>

  <!-- Add the Inlined Defer.js here -->
  <script>/* Defer.js content goes here */</script>

  <!-- ... -->
</head>
```

### Compatibility with Older Versions

If you're using Defer.js v1.x, you can use `defer_plus.min.js` instead of `defer.min.js` without wondering about migrations.

```html
<head>
  <meta charset="UTF-8" />
  <title>My Awesome Page</title>

  <!-- Put defer_plus.min.js here -->
  <script src="https://cdn.jsdelivr.net/npm/@shinsenter/defer.js@3.10.0/dist/defer_plus.min.js"></script>

  <!-- ... -->
</head>
```

### For OLD Browsers (such as IE9)

To enhance performance for older browsers that don't support the `IntersectionObserver` feature, you can load the IntersectionObserver polyfill library after the `defer.min.js` script tag.

```html
<script>/* Defer.js content */</script>

<!-- Add the IntersectionObserver Polyfill for legacy browsers -->
<script>'IntersectionObserver'in window||document.write('<script src="https://cdn.jsdelivr.net/npm/@shinsenter/defer.js@3.10.0/dist/polyfill.min.js"><\/script>');</script>
```

*NOTE*: Modern browsers support the `IntersectionObserver` feature, so you don't have to worry about adding the polyfill if you don't have older browsers in mind.

---
