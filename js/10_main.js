/* eslint-disable no-undef */
document.addEventListener('DOMContentLoaded', () => {
  let dragging = false
  let oX
  let angle

  addListenerMulti(document.getElementsByClassName('drag')[0], 'mousedown touchstart', e => {
    e.preventDefault()
    e.stopPropagation()
    dragging = true
    clearInterval(interval)
    if (e.targetTouches !== undefined) e = e.targetTouches[0]
    oX = e.pageX
    angle = getRotationDegrees(document.getElementById('bg_rotate'))
    toggleWolf(angle, false)
  })

  addListenerMulti(document, 'mousemove touchmove', e => {
    if (e.targetTouches !== undefined) e = e.targetTouches[0]
    if (dragging) {
      let sX = e.pageX
      if (sX !== oX) {
        let sRad = sX - oX
        angle = (sRad / 12) + angle
        if (angle < 0) angle = 360 + angle
        if (angle > 360) angle = 360 - angle
        document.getElementById('bg_rotate').style.transform = 'translate(-50%, -40%) rotate(' + angle + 'deg)'
        fieldBrightness(angle)
        oX = sX
      }
    }
  })

  addListenerMulti(document, 'mouseup touchend touchcancel', () => {
    if (dragging) {
      dragging = false
      switch (true) {
        case angle > 90:
        case angle > 270:
          animateStep('right', angle)
          break
        case angle < 90:
        case angle < 270:
          animateStep('left', angle)
          break
      }
    }
  })

  window.addEventListener('resize', setEdge.bind(this, document.querySelector('#bg_rotate')))
  setEdge(document.querySelector('#bg_rotate'))

  document.getElementById('about').addEventListener('click', e => {
    e.preventDefault()
    let el = document.getElementsByClassName('info')[0]
    if (el.className.search('active') === -1) el.className += ' active'
  })
  document.getElementById('close').addEventListener('click', e => {
    e.preventDefault()
    document.getElementsByClassName('info')[0].className = document.getElementsByClassName('info')[0].className.replace(' active', '')
  })
})

window.onload = () => {
  // Open loader
  for (let i = 0; i < 2; i++) {
    let el = document.getElementsByClassName('loader')[0].children[i]
    switch (el.className) {
      case 'left':
        el.className += ' toleft'
        break
      case 'right':
        el.className += ' toright'
        break
    }
  }

  setTimeout(() => {
    document.getElementsByClassName('loader')[0].style.display = 'none'
  }, 1050)
}
