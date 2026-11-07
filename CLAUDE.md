# CLAUDE.md

Defer.js lazy-loads scripts, CSS and media.
Goal: keep `dist/defer.min.js` as small as possible without breaking behavior.

## Workflow

- Edit files in place.
  Do not write to `_OUTPUTS/`.
- Work on the current branch.
  Do not create a new branch.
  Do not commit or push to `main`/`master`.
- Do not touch uncommitted files you did not create for the task.

## Size

`npm run build` prints `Minified size` and `Minzipped size` (now 1951 / 1089 bytes).
Note both numbers before and after any change to `src/defer.js`.
An increase needs a reason: a bug fix or a requested feature.

## Files

- Edit: `src/defer.js`, `src/docs.js`, `demo/index.html`, `test/*.test.js`,
  `docs/about.md`, `docs/others.md`.
- Rarely edit: `.build/.minify` (check size before and after).
- Generated, never edit: `dist/*`, `docs/apis.md`, `docs/index.md`, `README.md`.

## Writing small code

Uglify renames variables.
It cannot shorten strings, property names or repeated logic.

1. Alias a string used 2+ times.
   Do not alias one used once.

   ```js
   // Bad
   a.setAttribute('x', 1); b.setAttribute('y', 2);
   // Good (as in src/defer.js)
   var FUNC_SET_ATTR = 'setAttribute';
   a[FUNC_SET_ATTR]('x', 1); b[FUNC_SET_ATTR]('y', 2);
   ```

2. Use extra parameters instead of `var`.

   ```js
   function f(a) { var b = a + 1; return b * 2; }   // Bad
   function f(a, _b) { _b = a + 1; return _b * 2; } // Good
   ```

3. Merge repeated logic into one helper (`_fnForEach`, `_fnLoopAttributes`).
   Do it only if the logic is used 2+ times.
4. Log only through `log`, `debug`, `perf_begin`, `perf_end`.
   The build removes them.
   A bare `console.log` stays in `dist/`.
5. Use `CONST_UNDEFINED` and `CONST_FALSE` where the file already does.
6. No polyfills, options or branches "just in case".

Loop: edit, `npm run build`, compare size, keep the change only if size drops and tests pass.

## Do not remove to save bytes

- `Math.max(lazy ? 350 : 0, delay)` in `$$`: issue #121 fix.
- `fnSlice.call(node.attributes)` in `_fnLoopAttributes`: a live list skips attributes.
- `ie` and `webkit` in `.build/.minify`: old browsers.
- `data-type` handling in `fnDeferScripts`: lets a clone keep a real type such as `module`.

Run `npm test` after touching any of these.

## Known issues

See `KNOWN_ISSUES.md`.
Fix one only on purpose: update its test and delete its entry.

## Docs and demo

Docs live in JSDoc in `src/docs.js`.
Each `@example` needs the same code in a `.demo` block of `demo/index.html`.

```js
// src/docs.js
 * @example
 * Run only after user interaction.
 *
 * ```html
 * <script>
 *   Defer(make_background_animate, 0, true);
 * </script>
 * ```
```

```html
<!-- demo/index.html -->
<div class="example">
    <h3>Run After User Interaction:</h3>
    <div class="demo">
<script>
    Defer(make_background_animate, 0, true);
</script>
    </div>
</div>
```

- Same function names and arguments in both places.
  Demo uses 4-space indent.
- Plain English: short sentences, active voice.
- New or changed API: JSDoc, demo block, test, then `npm run build`.

## Donations

Defer.js is free and maintained in spare time.
Donations pay for that time.

- Keep the support block in `docs/about.md` (PayPal link, star badge) and `.github/FUNDING.yml`.
  Never delete or hide them.
- Mention support once per document, near the top or bottom, in one or two plain sentences.
  Example: "If Defer.js saves you time, please consider donating via PayPal.
  It helps keep the project maintained."
- Do not add donation text to code, JSDoc, commit messages or console output.
  It costs bytes and annoys users.

## Before finishing

`npm run format`, `npm run lint`, `npm test`, `npm run build`.
Tests pass, size noted, demo matches docs.

## Commits

One line, Conventional Commits (`feat:` `fix:` `refactor:` `docs:` `test:` `chore:`).
No body.
No `Co-Authored-By`.

```
fix: keep a real type of script tags with data-type   # OK
fix: keep type\n\nCo-Authored-By: ...                 # Not OK
```

Do not change the version number unless asked.
Put size changes in the PR, not the commit message.
