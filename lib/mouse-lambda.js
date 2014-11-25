var BaseEvent = require('value-event/base-event')
var xtend = require('xtend')

module.exports = BaseEvent(mouseLambda)

function mouseLambda(ev) {
  var opts = this.opts
// var data = {
//   src: ev.target,
//   x: ev.offsetX || ev.layerX,
//   y: ev.offsetY || ev.layerY
// }

  ev.preventDefault()

  return xtend(this.data, data)
}
