let sw = window.screen.width
if (sw > 1200) {
  (function webpackUniversalModuleDefinition (root, factory) {
    if (typeof exports === 'object' && typeof module === 'object') { module.exports = factory() } else if (typeof define === 'function' && define.amd) { define([], factory) } else if (typeof exports === 'object') { exports['POWERMODE'] = factory() } else { root['POWERMODE'] = factory() }
  }
  )(this, function () {
    return (function (modules) {
      let installedModules = {}
      // eslint-disable-next-line camelcase
      function __webpack_require__ (moduleId) {
        if (installedModules[moduleId]) { return installedModules[moduleId].exports }
        let module = installedModules[moduleId] = {
          exports: {},
          id: moduleId,
          loaded: false
        }
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__)
        module.loaded = true
        return module.exports
      }
      __webpack_require__.m = modules
      __webpack_require__.c = installedModules
      __webpack_require__.p = ''
      return __webpack_require__(0)
    }
    // eslint-disable-next-line camelcase
    )([function (module, exports, __webpack_require__) {
      'use strict'
      let canvas = document.createElement('canvas')
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      canvas.style.cssText = 'position:fixed;top:0;left:0;pointer-events:none;z-index:999999'
      window.addEventListener('resize', function () {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      })
      document.body.appendChild(canvas)
      let context = canvas.getContext('2d')
      let particles = []
      let particlePointer = 0
      let rendering = false
      POWERMODE.shake = true
      function getRandom (min, max) {
        return Math.random() * (max - min) + min
      }
      function getColor (el) {
        if (POWERMODE.colorful) {
          let u = getRandom(0, 360)
          return 'hsla(' + getRandom(u - 10, u + 10) + ', 100%, ' + getRandom(50, 80) + '%, ' + 1 + ')'
        } else {
          return window.getComputedStyle(el).color
        }
      }
      function getCaret () {
        let el = document.activeElement
        let bcr
        if (el.tagName === 'TEXTAREA' || (el.tagName === 'INPUT' && el.getAttribute('type') === 'text')) {
          let offset = __webpack_require__(1)(el, el.selectionEnd)
          bcr = el.getBoundingClientRect()
          return {
            x: offset.left + bcr.left,
            y: offset.top + bcr.top,
            color: getColor(el)
          }
        }
        let selection = window.getSelection()
        if (selection.rangeCount) {
          let range = selection.getRangeAt(0)
          let startNode = range.startContainer
          if (startNode.nodeType === document.TEXT_NODE) {
            startNode = startNode.parentNode
          }
          bcr = range.getBoundingClientRect()
          return {
            x: bcr.left,
            y: bcr.top,
            color: getColor(startNode)
          }
        }
        return {
          x: 0,
          y: 0,
          color: 'transparent'
        }
      }
      function createParticle (x, y, color) {
        return {
          x: x,
          y: y,
          alpha: 1,
          color: color,
          velocity: {
            x: -1 + Math.random() * 2,
            y: -3.5 + Math.random() * 2
          }
        }
      }
      function POWERMODE () {
        // eslint-disable-next-line no-lone-blocks
        {
          let caret = getCaret()
          let numParticles = 5 + Math.round(Math.random() * 10)
          while (numParticles--) {
            particles[particlePointer] = createParticle(caret.x, caret.y, caret.color)
            particlePointer = (particlePointer + 1) % 500
          }
        }
        // eslint-disable-next-line no-lone-blocks
        {
          if (POWERMODE.shake) {
            let intensity = 1 + 2 * Math.random()
            let x = intensity * (Math.random() > 0.5 ? -1 : 1)
            let y = intensity * (Math.random() > 0.5 ? -1 : 1)
            document.body.style.marginLeft = x + 'px'
            document.body.style.marginTop = y + 'px'
            setTimeout(function () {
              document.body.style.marginLeft = ''
              document.body.style.marginTop = ''
            }, 75)
          }
        }
        if (!rendering) {
          requestAnimationFrame(loop)
        }
      }
      POWERMODE.colorful = false
      function loop () {
        rendering = true
        context.clearRect(0, 0, canvas.width, canvas.height)
        let rendered = false
        let rect = canvas.getBoundingClientRect()
        for (let i = 0; i < particles.length; ++i) {
          let particle = particles[i]
          if (particle.alpha <= 0.1) { continue }
          particle.velocity.y += 0.075
          particle.x += particle.velocity.x
          particle.y += particle.velocity.y
          particle.alpha *= 0.96
          context.globalAlpha = particle.alpha
          context.fillStyle = particle.color
          context.fillRect(Math.round(particle.x - 1.5) - rect.left, Math.round(particle.y - 1.5) - rect.top, 3, 3)
          rendered = true
        }
        if (rendered) {
          requestAnimationFrame(loop)
        } else {
          rendering = false
        }
      }
      module.exports = POWERMODE
    },
    function (module, exports) {
      (function () {
        let properties = ['direction', 'boxSizing', 'width', 'height', 'overflowX', 'overflowY', 'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth', 'borderStyle', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'fontStyle', 'fontVariant', 'fontWeight', 'fontStretch', 'fontSize', 'fontSizeAdjust', 'lineHeight', 'fontFamily', 'textAlign', 'textTransform', 'textIndent', 'textDecoration', 'letterSpacing', 'wordSpacing', 'tabSize', 'MozTabSize']
        let isFirefox = window.mozInnerScreenX != null
        function getCaretCoordinates (element, position, options) {
          // eslint-disable-next-line no-mixed-operators
          let debug = options && options.debug || false
          if (debug) {
            let el = document.querySelector('#input-textarea-caret-position-mirror-div')
            if (el) {
              el.parentNode.removeChild(el)
            }
          }
          let div = document.createElement('div')
          div.id = 'input-textarea-caret-position-mirror-div'
          document.body.appendChild(div)
          let style = div.style
          let computed = window.getComputedStyle ? getComputedStyle(element) : element.currentStyle
          style.whiteSpace = 'pre-wrap'
          if (element.nodeName !== 'INPUT') { style.wordWrap = 'break-word' }
          style.position = 'absolute'
          if (!debug) { style.visibility = 'hidden' }
          properties.forEach(function (prop) {
            style[prop] = computed[prop]
          })
          if (isFirefox) {
            if (element.scrollHeight > parseInt(computed.height)) { style.overflowY = 'scroll' }
          } else {
            style.overflow = 'hidden'
          }
          div.textContent = element.value.substring(0, position)
          if (element.nodeName === 'INPUT') { div.textContent = div.textContent.replace(/\s/g, '\u00a0') }
          let span = document.createElement('span')
          span.textContent = element.value.substring(position) || '.'
          div.appendChild(span)
          let coordinates = {
            top: span.offsetTop + parseInt(computed['borderTopWidth']),
            left: span.offsetLeft + parseInt(computed['borderLeftWidth'])
          }
          if (debug) {
            span.style.backgroundColor = '#aaa'
          } else {
            document.body.removeChild(div)
          }
          return coordinates
        }
        if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
          module.exports = getCaretCoordinates
        } else {
          window.getCaretCoordinates = getCaretCoordinates
        }
      }())
    }
    ])
  })
}
