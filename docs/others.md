## Documentation in Other Languages

> [NEED HELP] Let's collaborate to make the documentation and examples even better!

### 日本語 (Japanese)

For our Japanese readers, please refer to these helpful articles:

- [Defer.js Documentation (Japanese Translation) by Ataruchi](https://blog.gadgets-geek.net/2023/02/deferjs-doc-japanese.html)
<!--
20240318: I am temporarily hiding the following URLs because
their websites have advertisements that could potentially deceive users.
- [Article by HeavyPeat](https://www.heavy-peat.com/2022/02/defer.html)
- [Article by Limosuki](https://www.limosuki.com/2022/06/twitter-lazyload-deferjs.html)
-->

> I would like to express warm gratitude to [@Ataruchi](https://twitter.com/Ataruchi), [@HeavyPeat](https://twitter.com/HeavyPeat), and [Limosuki](https://www.limosuki.com/) for their helpful articles in Japanese.

## Supported Browsers

Defer.js is compatible with all modern browsers, including:
- 🖥 IE9+ / Edge <sup>(*)</sup>
- 🖥 Firefox 4+
- 🖥 Safari 3+
- 🖥 Chrome
- 🖥 Opera
- 📱 Android 4+
- 📱 iOS 3.2+

<sup>(*) Older browsers like Internet Explorer 9 require the `IntersectionObserver` polyfill.</sup>

## Known Issues

- [Discussion #122](https://code.shin.company/defer.js/discussions/122):
In iOS Safari, the first `click` event may not work as expected when using `Defer.all()` with the `waitForUserAction` argument set to `true` and one of the deferred scripts makes a DOM change.

---

From Vietnam 🇻🇳 with love.
