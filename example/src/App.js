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

export default App
