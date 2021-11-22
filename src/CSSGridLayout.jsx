import React, {
  useState,
  useCallback,
  createContext,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useMemo,
  Children,
  isValidElement,
  cloneElement,
  createElement
} from 'react'
import { AutoSizer } from 'react-virtualized'
import PropTypes from 'prop-types'

export const defaultLayout = 'default'

const GridContext = createContext({})

const CSSGridLayout = forwardRef(({ children, layout }, ref) => {
  // holds state to trigger a reRender of GridElements
  const [reRenderState, setReRenderState] = useState(0)

  const [shouldAnimate, setShouldAnimate] = useState(false)
  const [layoutState, setLayoutState] = useState(defaultLayout)

  useEffect(() => {
    if (layout) {
      setShouldAnimate(true)
      setTimeout(() => {
        setLayoutState(layout)
        setReRenderState(Math.random())
        setTimeout(() => {
          setShouldAnimate(false)
        }, 415)
      }, 40)
    }
  }, [layout])

  const handleResize = useCallback(() => {
    setReRenderState(Math.random())
  }, [])

  useImperativeHandle(ref, () => ({
    setLayout: (layout) => {
      if (layout) {
        setLayoutState(layout)
      } else {
        // reset layout to defaultLayout
        setLayoutState(defaultLayout)
      }
    }
  }))

  const wrappedElements = useMemo(() => {
    return Children.map(children, (child) => {
      if (isValidElement(child)) {
        return cloneElement(child, {
          animate: shouldAnimate,
          reRender: reRenderState
        })
      }
      return child
    })
  }, [children, shouldAnimate, reRenderState])

  const gridElements = useMemo(() => {
    return Children.map(children, (child) => {
      if (isValidElement(child)) {
        return createElement('div', {
          className: `rcgl-grid-item ${child.props.name}`
        })
      }
      return child
    })
  }, [children])

  return (
    <GridContext.Provider value={{}}>
      <AutoSizer onResize={handleResize}>
        {({ height, width }) => (
          <div style={{ height, width }}>
            <div className='rcgl-float-box'>{wrappedElements}</div>
            <div className={`rcgl-grid ${layoutState}`}>{gridElements}</div>
          </div>
        )}
      </AutoSizer>
    </GridContext.Provider>
  )
})

CSSGridLayout.propTypes = {
  children: PropTypes.node,
  layout: PropTypes.string
}

export default CSSGridLayout
