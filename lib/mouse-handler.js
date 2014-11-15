var window    = require('global/window')
var xtend     = require('xtend')

module.exports = {
  MouseDown: MouseDown,
  MouseOver: MouseOver
}

function MouseDown(fn, state) {
  if(!(this instanceof MouseDown)) return new MouseDown(fn, state)
  this.fn = fn
  this.state = state || {}
  log('mousedown', state)
}

MouseDown.prototype.handleEvent = function(ev) {
  var fn = this.fn
  var state = this.state

  var cx = ev.offsetX || ev.layerX
  var cy = ev.offsetY || ev.layerY

  function onmove(ev) {
    fn({
      cx: cx,
      cy: cy,
      type: 'move',
      src: ev.target
    })
  }

  function onup(ev) {
    window.removeEventListener('mousemove', onmove)
    window.removeEventListener('mouseup', onup)
  }

  window.addEventListener('mousemove', onmove)
  window.addEventListener('mouseup', onup)

  fn({
    cx: cx,
    cy: cy,
    type: 'down',
    src: ev.target
  })
}

function MouseOver(fn, val) {
  if(!(this instanceof MouseOver)) return new MouseOver(fn, val)
  this.fn = fn
  this.val = val
}

MouseOver.prototype.handleEvent = function(ev) {
  var fn = this.fn
  var val = this.val

  var cX = ev.offsetX || ev.layerX
  var cY = ev.offsetY || ev.layerY

  log('mouse event', ev)

  fn({
    src: ev.target,
    type: 'over',
    cx: cX,
    cy: cY
  })
}
