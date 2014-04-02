# Parallaxify

> Such deep. Very scroll. Wow background.

Parallaxify allow you to add parallax effect to background images when scrolling.
It's a simple standalone JavaScript module (no jQuery or similar required) that is
_less thant 1kb (minified &amp; gzipped)_.

## Installation

You can install parallaxify from **npm**

```shell
$ npm install parallaxify
```

Or using **bower**

```shell
$ bower install parallaxify
```

Parallaxify can obviously be downloaded directly.

## No dependencies

_There is nothing you need. No jQuery or something._

## Compatibility

Parallaxify should work with IE < 9 if you add [`window.getComputedStyle` polyfill](http://snipplr.com/view/13523/).

## Usage

```js
new Parallaxify({
  elements: ".js-Parallaxify" // default
, backgroundYMin: 100 // default
, backgroundYMax: 0 // default
}).registerUpdate()
```

This will enable Parallaxify on this kind of HTML elements

```html
<div class="js-Parallaxify"></div>
```

Note that the elements must have content or width/height.
See the [example page](src/index.html) to check what you might need.

### Options

#### `elements` (String or Array, default ".js-Parallaxify")

CSS Selector to use to retrieve elements to apply Parallaxify.
Can be an array of elements, an HTMLCollection, or a NodeList.

```js
new Parallaxify({ elements: document.getElementsByClassName(".parallax") }
```

#### `backgroundYMin` (Integer, default 100)

Default background position Y value when the element appears in the viewport.  
Can be define for each elements using `data-parallaxify-y-min`.  
See the [test page](src/index.html) for examples.

#### `backgroundYMax` (Integer, default 0)

Background position Y value when the element appears in the viewport.  
Can be define for each elements using `data-parallaxify-y-max`.  
See the [test page](src/index.html) for examples.

### API

#### `Parallaxify.toArray()`

Transform HTMLCollection, NodeList or similar to an array of DOM elements.

#### `Parallaxify.prototype.update()`

Just update Parallaxify elements.  
__You don't need to use this method unless you want to have full control of Parallaxify behavior.__

#### `Parallaxify.prototype.requestUpdate()`

Used to call `update()` method through `requestAnimationFrame()`.

#### `Parallaxify.prototype.registerUpdate()`

Use this function to enable Parallaxify automatically `requestUpdate()`.
It create a `requestAnimationFrame` loop but trigger update only if scroll have changed (just using window scroll give laggy results),
This will also attach the same behavior to window resize. Just to be sure.

If you don't want to make a requestAnimationFrameLoop, you can eventually listen
window scroll/resize & trigger `update()` and can skip `registerUpdate()`/`requestUpdate()`.
Note that it will probably result to more laggy results.

---

## [Changelog](CHANGELOG.md)

## Contributing

Please read the file nobody reads (make me lie) [CONTRIBUTING.md](CONTRIBUTING.md)

### tl;dr;

Fork, clone, then

```shell
$ npm i -g gulp
$ npm i
$ gulp
```

Now you can work on the file, then make a commit and a push something when gulp doesn't show any error.
Thanks.

## [License](LICENSE-MIT)
