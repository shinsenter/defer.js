# defer.js

Super tiny script to efficiently load JavaScript (and more).

**It makes your pages feel faster.**

Loading your deferred JavaScript also means no blocking, your browsing experience needn't wait for code you may not need yet.


## Usage
You need to load this library only once on a page, ideally right after the opening `<head>` tag:

```html
<!DOCTYPE html>
<html>
<head>
    <title>My awesome page</title>
    <script type="text/javascript" src="//raw.githubusercontent.com/shinsenter/defer.js/master/defer.min.js"></script>
</head>
<body>

</body>
</html>
```

Because the minified version is super tiny (less than 500 bytes), you can inline its content directly into the HTML document and avoid the network request.


## Methods

```js
defer(fn [, delay [, context ]])
```
This method allows us to delay the execution of `fn` function in `delay` miliseconds (default: 0) after the `onload` event.

The `context` argument sets the value of `this` when the `fn` function is called.



```js
deferscript(src [, id [, delay ]])
```
This method allows us to load a JavaScript file from the `src` URL, then execute it after the `onload` event.

We also can assign the `id` for the `<script>` tag, and delay time in miliseconds with the `delay` argument.



## Examples

Delay the execution of a simple inline script (and also complex inline scipt) after 2 seconds.
```js
defer(function() {
    alert("This message is shown after 2 seconds since 'onload' event.");
}, 2000);
```


Delay loading Google Publisher Tag script after 1 second (to prevent advertisement iframes that may block rendering).
```js
deferscript('//www.googletagservices.com/tag/js/gpt.js', 'gpt-js', 1000);
```

That is simple, isn't it?

---

Released under the MIT license.
https://raw.githubusercontent.com/shinsenter/defer.js/master/LICENSE

Copyright (c) 2019 Mai Nhut Tan <shin@shin.company>
