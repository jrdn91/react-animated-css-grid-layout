import React, { memo, useEffect, useState } from 'react'
import classnames from 'clsx'
import PropTypes from 'prop-types'

function getWindowRelativeOffset(parent, elem) {
  const parentBounds = parent.getBoundingClientRect()
  const elemBounds = elem.getBoundingClientRect()

  return {
    top: elemBounds.top,
    left: elemBounds.left,
    bottom: parentBounds.height - elemBounds.bottom,
    right: parentBounds.width - elemBounds.right
  }
}

const GridElement = memo(({ children, name, reRender, animate }) => {
  const [boxOffset, setBoxOffset] = useState({
    top: 0,
    left: 0,
    right: 'initial',
    bottom: 'initial'
  })

  useEffect(() => {
    setTimeout(() => {
      const gridElement = document.querySelector('.rcgl-grid')
      const moduleGridElement = document.querySelector(
        `.rcgl-grid-item.${name}`
      )
      if (gridElement && moduleGridElement) {
        const result = getWindowRelativeOffset(gridElement, moduleGridElement)
        if (result) {
          setBoxOffset(result)
        }
      }
    })
  }, [reRender, name])

  return (
    <div
      className={classnames(`rcgl-grid-element ${name}`, {
        animate
      })}
      style={{
        top: `${boxOffset.top}px`,
        right: `${boxOffset.right}px`,
        bottom: `${boxOffset.bottom}px`,
        left: `${boxOffset.left}px`
      }}
    >
      {children}
    </div>
  )
})

GridElement.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string.isRequired
}

export default GridElement
