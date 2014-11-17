var window = require('global/window')
var extend = require('xtend')

module.exports = {
  MouseDown: MouseDown,
  MouseOver: MouseOver
}

function MouseDown(fn, value) {
  if(!(this instanceof MouseDown))
    return new MouseDown(fn, value)

  this.fn = fn
  this.value = value || {}
}

MouseDown.prototype.HandleEvent = function(ev) {
  var fn = this.fn
  var value = this.value

  var curX = ev.offsetX || ev.layerX
  var curY = ev.offSetY || ev.layerY

  function onmove(ev) {
    var delta = {
      x: ev.clientX - curX,
      y: ev.clientY - curY
    }

    fn(extend(value, delta))
    curX = ev.clientX
    curY = ev.clientY
  }

  function onup(ev) {
    window.removeEventListener('mousemove', onmove)
    window.removeEventListener('mouseup', onmove)
  }

  window.addEventListener('mousemove', onmove)
  window.addEventListener('mouseup', onup)

}
