# Slides (test 2)

An HTML presentation experiment.

Install the [esbuild](https://esbuild.github.io/) build system with:

```bash
npm install
```

Run in development mode:

```bash
npm start
```

This builds a site to `build` and starts a local development server. Open `http://localhost:8111/` in your browser. All resources rebuild themselves when files change. CSS hot reloads, but other updates require a browser refresh.

Create a production build with minified CSS and JavaScript:

```bash
npm run build
```


## Build settings

Source files are located in `./src`.

Build files are built to `./build`.

Development mode can be configured in `.env.dev`.

`.env.prod` overrides `.env.dev` defaults when creating a production build.


## Creating slides

Create an HTML page. Any element can have a `slides` class to indicate it's a slide and will be monitored:

```html
<article class="slide">

  <h1>Slide 1 title</h1>
  <p>Slide 1 text</p>

</article>

<article class="slide">

  <h1>Slide 2 title</h1>
  <p>Slide 2 text</p>

</article>

<!-- not monitored -->
<article>

  <h1>Slide 3 title</h1>
  <p>Slide 3 text</p>

</article>
```


## Activation CSS

The following classes are applied to each `.slide` element as the user scrolls:

* `.in0` - the slide is out of view
* `.in1` - slide has at least one pixel in view
* `.in20` - slide is 20% or more in view
* `.in40` - slide is 40% or more in view
* `.in60` - slide is 60% or more in view
* `.in80` - slide is 80% or more in view
* `.in100` - slide is 100% or more in view


Two CSS custom properties (variables) are applied to each `.slide` element:

* `--inview` - the proportion of the slide in the viewport (0 to 1). A 500px height slide that is 100px in-view has a value of 0.2. Slides with a height greater than the viewport will reach 1 when the top of the slide reaches the top of the viewport.

* `--inprog` - the progress of the slide in the viewport as you scroll down (0 to 1). A value of 0 means the slide is off the bottom of the viewport. The value will increase as the first pixel appears and reaches 1 when the bottom of the slide is at the bottom of the viewport or beyond.

A CSS custom property is also applied to the `html` element:

* `--progress` - progress through whole presentation from `0` (top of first slide) to `1` (top of last slide)


## Animation

Reusable and combinable animation classes are defined in `src/css/02-design/_animations.css`. Examine how they work and define your own in `src/css/02-design/_slides-custom_.css` or elsewhere. It's best to animate the slide's inner elements using CSS transforms and opacity.

**IMPORTANT**: Ideally, slide content should **start** at its ending animation frame, e.g. fully opaque. This ensures it works without JavaScript. CSS animations can then be triggered which *move* the element to its start frame (e.g. fully transparent) and animate toward its end frame.

`.in<name>` classes apply an animation based on the slide's `--inview` value. For example, a slide that's 70% in view with `.inscale` applied is 70% of it's final size.

* `.infade` - opacity (0% to 100%)
* `.inscale` - scale (0% to 100%)
* `.inrotate` - rotation (0 to 360 degrees)
* `.inleft` - fly in from left
* `.inright` - fly in from right
* `.inup` - fly in from bottom
* `.indown` - fly in from top

`.prog<name>` classes apply an animation based on the slide's `--inview` value. For example, a slide that's twice the size of the viewport with the top half in-view that has `.progscale` applied is 50% of it's final size. It will reach it's final size when the bottom of the slide reaches the bottom of the viewport or beyond.

* `.progfade` - opacity (0% to 100%)
* `.progscale` - scale (0% to 100%)
* `.progrotate` - rotation (0 to 360 degrees)
* `.progleft` - fly in from left
* `.progright` - fly in from right
* `.progup` - fly in from bottom
* `.progdown` - fly in from top

`.show<name>` classes apply an animation which runs when a slide is at least 40% in-view. The animation completes even if the user never scrolls further. Multiple elements with `.show<name>` classes have an 0.25 second animation delay applied so they come in one after the other.

* `.showfade` - opacity (0% to 100%)
* `.showscale` - scale (0% to 100%)
* `.showrotate` - rotation (0 to 360 degrees)
* `.showleft` - fly in from left
* `.showright` - fly in from right
* `.showup` - fly in from bottom
* `.showdown` - fly in from top
