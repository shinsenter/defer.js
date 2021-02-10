# Package @shinsenter/defer.js

🥇 A super small, super efficient library that helps you lazy load almost everything like images, video, audio, iframes as well as stylesheets, and JavaScript.

[![NPM](https://img.shields.io/npm/l/@shinsenter/defer.js)](https://raw.githubusercontent.com/shinsenter/defer.js/master/LICENSE)
[![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/@shinsenter/defer.js)](#)
[![CodeFactor Grade](https://img.shields.io/codefactor/grade/github/shinsenter/defer.js)](https://www.codefactor.io/repository/github/shinsenter/defer.js)

* * *
[![GitHub Release Date](https://img.shields.io/github/release-date/shinsenter/defer.js)](https://github.com/shinsenter/defer.js/releases)
[![GitHub package.json version](https://img.shields.io/github/package-json/v/shinsenter/defer.js)](https://github.com/shinsenter/defer.js/releases)
[![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@shinsenter/defer.js)](https://www.npmjs.com/package/@shinsenter/defer.js)
[![jsDelivr hits (npm)](https://img.shields.io/jsdelivr/npm/hm/@shinsenter/defer.js)](https://www.jsdelivr.com/package/npm/@shinsenter/defer.js)

[![NPM](https://nodei.co/npm/@shinsenter/defer.js.png?downloads=true)](https://www.npmjs.com/package/@shinsenter/defer.js)

- **Package**: [@shinsenter/defer.js](https://www.npmjs.com/package/@shinsenter/defer.js)
- **Version**: 2.0
- **Author**: Mai Nhut Tan <shin@shin.company>
- **Copyright**: 2021 AppSeeds <https://code.shin.company/>
- **License**: [MIT](https://raw.githubusercontent.com/shinsenter/defer.js/master/LICENSE)


* * *


## Use cases

In real life, many resources and third-party scripts,
such as jQuery, are used to enhance our website
to add additional interactivity, animations, and other effects.

Unfortunately, third-party scripts usually block page rendering
and further downloading resources of the page.

There is a [common knowledge](https://web.dev/efficiently-load-third-party-javascript/)
that you should use `<script src=".." async>`
(or `<script src=".." defer>`)
and/or put your scripts at the very bottom of the page,
so that as much as possible of the page gets loaded
and rendered to the user, as fast as possible.

But in various cases, using `async` or `defer` attributes
does not deliver faster page speed than [defer.js](#Defer) does.
Furthermore [defer.js](#Defer) also gives you very simple ways
to flexibly optimize other resources in your website.


## Key features

- 🎯 No dependencies, no jQuery
- ⚡️ Native API, blazing fast
- ✅ Legacy browsers support (IE9+)
- 🧩 Lazy load almost everything
- 👍 Very easy to use
- 🤝 Works well with your favorite frameworks


## Browser support

Available in latest browsers, also works perfectly with Internet Explorer 9 and later.

- 🖥 IE9+
- 🖥 Firefox 4+
- 🖥 Safari 3+
- 🖥 Chrome *
- 🖥 Opera *
- 📱 Android 4+
- 📱 iOS 3.2+


## Getting started

### Basic

Insert `defer.min.js` of this library into your HTML page,
just below the opening `<head>` tag:

```html
<head>
  <meta charset="UTF-8" />
  <title>My Awesome Page</title>

  <!-- Put defer.min.js here -->
  <script src="https://cdn.jsdelivr.net/npm/@shinsenter/defer.js@2.0.0/dist/defer.min.js"></script>

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
<!-- Put defer_plus.min.js here -->
<script src="https://cdn.jsdelivr.net/npm/@shinsenter/defer.js@2.0.0/dist/defer_plus.min.js"></script>
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
  <script>/* content of defer.min.js will be here */</script>

  <!-- ... -->
</head>
```

