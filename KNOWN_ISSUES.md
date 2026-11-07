# Known Issues

These are quirks in `src/defer.js` that we know about and have not fixed.
Most of them are the price of a tiny file.
A fix has to be worth the extra bytes.

Every issue has a test in `test/known-issues.test.js`.
The test checks the current behavior, so it passes today.
If you fix an issue, the test will fail.
Update the test and delete the entry here in the same commit.

Issue IDs are not reused, so gaps in the numbering are expected.

Run the tests:

```sh
node --test test/known-issues.test.js
```

- KI-2, `Defer.dom()`: a second call on the same element is ignored.
  Put all options in one call.
- KI-4, `Defer.reveal()`: `unveiledClass` is not added to SVG elements.
  Add the class in your own code.
- KI-5, `Defer.reveal()`: a node with no class gets `class=" name"`.
  Ignore it, or trim the value in your own code.
- KI-6, `Defer.dom()`: every call creates a new `IntersectionObserver`.
  Call it once for a batch of elements.
- KI-7, `Defer.all()`: separate calls do not wait for each other.
  Put scripts that depend on each other in one call.

## KI-2: A second `Defer.dom()` call on the same element is ignored

The first call marks the element as handled.
Later calls skip it, so a different `unveiledClass` or `resolver` never applies.

```js
Defer.dom('#photo', 0, 'first');
Defer.dom('#photo', 0, 'second');
// Result: only "first" is added.
```

Workaround: use one `Defer.dom()` call per element, with all options in it.

User report: [#146](https://github.com/shinsenter/defer.js/issues/146).
The reporter calls `Defer.dom()` again to pick up new elements.
New elements are picked up.
Elements that were already handled are skipped.

Why it stays: the mark stops the same element from being observed twice.
That check is needed.

## KI-4: `unveiledClass` is not added to SVG elements

`Defer.reveal()` adds the class with `node.className += ...`.
On SVG elements, `className` is read-only, so the class is not added.
The `data-*` attributes are still unveiled.

```html
<svg><image class="k" data-href="x.png"></image></svg>
<script>
  Defer.dom('image', 0, 'shown');
  // Result: href is set, class stays "k".
</script>
```

Workaround: add the class in your own code with `node.classList.add('shown')`.
For example, do it in the `resolver`.

## KI-5: A leading space in the class attribute

The class is added as `' ' + unveiledClass`.
A node that had no class ends up with `class=" shown"`.
Browsers and CSS ignore the space.
Code that compares the raw attribute string sees it.

Workaround: use `classList.contains()` or trim the value.

## KI-6: Every `Defer.dom()` call creates a new observer

Each call builds its own `IntersectionObserver`.
There is no `Defer.destroy()` or `disconnect()` to release it.
Elements that were already handled are skipped, so listeners are not duplicated.
The cost of many observers has not been measured.

```js
Defer.dom('[data-seen]', 0, 'is-seen');
Defer.dom('[data-seen]', 0, 'is-seen');
// Result: two observers, one for each call.
```

User report: [#146](https://github.com/shinsenter/defer.js/issues/146).

Workaround: call `Defer.dom()` once after a batch of changes, not once per element.

## KI-7: Separate `Defer.all()` calls do not wait for each other

Each call has its own queue.
Inside one call, scripts run in order, and a script with `src` blocks the next one until it loads.
Two calls run side by side.
A lazy group can run while a `deferjs` group is still downloading.

```html
<script type="deferjs" src="lib.js"></script>
<script type="deferjs">/* needs lib.js */</script>
<script type="lazyjs">/* runs on the first user action, even if lib.js is not loaded yet */</script>
<script>Defer.all('script[type=lazyjs]', 0, true);</script>
```

User reports: [#115](https://github.com/shinsenter/defer.js/issues/115), [#109](https://github.com/shinsenter/defer.js/issues/109).

Workaround: give both groups the same `type`, so one `Defer.all()` call handles them in order.

## Reported by users and already handled

- [#121](https://github.com/shinsenter/defer.js/issues/121):
  the first tap on a link did not work on mobile Safari.
  Lazy tasks now wait at least 350 ms after the trigger.
- [#145](https://github.com/shinsenter/defer.js/issues/145), [#148](https://github.com/shinsenter/defer.js/issues/148):
  script order and type were lost for some clones.
  Use `data-type` to keep a real type such as `module`.
- [#133](https://github.com/shinsenter/defer.js/issues/133):
  run on a delay or on the first user action, whichever comes first.
  Set `Defer.lazy` to a number of milliseconds, for example `Defer(fn, 0, 1000)`.

## Reported by users, but not a library bug

- [#99](https://github.com/shinsenter/defer.js/issues/99): SoundManager.
  Its docs ask you to call `soundManager.setup()` when you lazy-load it.
- [#100](https://github.com/shinsenter/defer.js/issues/100): `load` handlers do not run.
  The page has already loaded, so run the code directly inside `Defer()`.
- [#88](https://github.com/shinsenter/defer.js/issues/88): Cloudflare Rocket Loader.
  Two tools that rewrite the same HTML can conflict.
  Turn one of them off.
- [#135](https://github.com/shinsenter/defer.js/issues/135): the mobile menu does not respond.
  The maintainer found transparent layers from another plugin on top of the menu.
- [#140](https://github.com/shinsenter/defer.js/issues/140): icons look wrong after an upgrade.
  The maintainer could not reproduce it with the demo files.
- [#141](https://github.com/shinsenter/defer.js/issues/141), [#143](https://github.com/shinsenter/defer.js/issues/143):
  problems with the WordPress plugin.
  They belong to `defer-wordpress`, which is a separate project.

## Adding a new entry

1. Reproduce the problem and link the user report if there is one.
2. Write a test in `test/known-issues.test.js`.
3. Name the test `KI-<n>: <what happens>`. Assert the current behavior.
4. Add a list item and a section with a short example and a workaround.
5. Say why it stays, for example the extra bytes a fix would cost.
