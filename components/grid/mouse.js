var window = require('global/window')
var extend = require('xtend')
var merc   = require('mercury')

module.exports =  {
  MouseDown: MouseDown,
  MouseOver: MouseOver
}

function MouseDown(fn, value) {
  if(!(this instanceof MouseDown))
    return new MouseDown(fn, value)

  this.fn = fn
  this.value = value || {}
}

MouseDown.prototype.handleEvent = function(ev) {
  var fn = this.fn
  var value = this.value

  var curX = ev.offsetX || ev.layerX
  var curY = ev.offSetY || ev.layerY

  fn({
    x: curX,
    y: curY
  })
}

function MouseOver(fn, value) {
  if(!(this instanceof MouseOver)) return new MouseOver(fn, value)
  this.fn = fn
  this.value = value
}

MouseOver.prototype.handleEvent = function(ev) {
  var fn = this.fn
  var isdown = false
  var src = ev.target

  function onmove(ev) {
    var cX  = ev.offsetX || ev.layerX
    var cY  = ev.offSetY || ev.layerY
    fn({
      x: cX,
      y: cY,
      isdown: isdown
    })
  }

  function ondown(ev) {
    isdown = true
  }

  function onup(ev) {
    isdown = false
  }

  function onout(ev) {
    window.removeEventListener('mousemove', onmove)
    window.removeEventListener('mousedown', ondown)
    window.removeEventListener('mouseup', onup)
    src.removeEventListener('mouseout', onout)
  }

  window.addEventListener('mousemove', onmove)
  window.addEventListener('mousedown', ondown)
  window.addEventListener('mouseup', onup)
  src.addEventListener('mouseout', onout)

}
