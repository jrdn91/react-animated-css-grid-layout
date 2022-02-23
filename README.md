# react-animated-css-grid-layout

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/react-animated-css-grid-layout.svg)](https://www.npmjs.com/package/react-animated-css-grid-layout) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## What is this?

This is a layout engine specifically designed for a project where I wanted control over where elements aligned on a grid, that supported multiple layouts and could animate between the different layouts. I didn't want to have to manage with crazy math how to keep my elements on this imaginary grid and animate them around the page when the user picked a different layout.

I like the solution that CSS grid supplied but the major downside for me was that grid items cannot be animated / transitioned into place.

This engine creates an element where a CSS grid is applied to and empty elements are added to it with the intention of being positioned on the grid via CSS. Another element is placed with `position: absolute` over top of the grid element with the actual children passed in rendered in special grid elements that map directly to the empty grid item elements in the shadow grid. When rendered, the special grid elements find their corresponding shadow grid item and figure out where within the shadow grid that element is positioned and copies the top, right, bottom and left positions to the grid element. This way a transition can be applied to those properties.

## Install

```bash
yarn add react-animated-css-grid-layout
```

## Usage

Render a grid with the default layout class applied.

```jsx
import React from 'react'

import CSSGridLayout, { GridElement } from 'react-animated-css-grid-layout'
import 'react-animated-css-grid-layout/dist/index.css'

const App = () => {
  return (
    <>
      <div style={{ width: "100%", height: 768}}>
        <CSSGridLayout>
          <GridElement name="one">
            Element 1
          </GridElement>
          <GridElement name="two">
            Element 2
          </GridElement>
          <GridElement name="three">Element 3</GridElement>
          <GridElement name="four">Element 4</GridElement>
        </CSSGridLayout>
      </div>
    </>
  )
}

export default App
```

You can pass a layout prop to manage different layouts and animate between them

```jsx
import React, { useCallback, useState } from 'react'

import CSSGridLayout, { GridElement } from 'react-animated-css-grid-layout'
import 'react-animated-css-grid-layout/dist/index.css'

const App = () => {
  const [layout, setLayout] = useState("layout1");
  const handleChangeLayout = useCallback((l) => {
    setLayout(`layout${l}`);
  }, []);
  return (
    <>
      <div style={{ width: "100%", height: 768}}>
        <CSSGridLayout layout={layout}>
          <GridElement name="one">
            Element 1
          </GridElement>
          <GridElement name="two">
            Element 2
          </GridElement>
          <GridElement name="three">Element 3</GridElement>
          <GridElement name="four">Element 4</GridElement>
        </CSSGridLayout>
      </div>
      <button onClick={() => handleChangeLayout("1")}>Layout 1</button>
      <button onClick={() => handleChangeLayout("2")}>Layout 2</button>
    </>
  )
}
```

### Additional watch properties

If there are other properties you want to trigger an animation such as something changing an element of your layout without changing the layout string property, pass them in as an array which will get passed to an effect like dependencies...

```jsx
<CSSGridLayout layout={layout} watchedProps={[prop1, state1]}>
  ...
</CSSGridLayout>
```

## TODO

- [ ] Add story book or another live example
- [ ] Write tests

## License

MIT © [jrdn91](https://github.com/jrdn91)
