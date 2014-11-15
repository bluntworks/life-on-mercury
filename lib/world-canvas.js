var document = require('global/document')
var merc     = require('mercury')
var h        = merc.h

module.exports = Canvas

function Canvas(state) {
  if(!(this instanceof Canvas)) return new Canvas(state)

  var self = this
  var world = state.world

  log(state)
  world.cols(function(data) {
    var _dif = data._diff[0]
    var indx = _dif[0]
    var cell = _dif[2][indx]
    self.update(cell, self.el)
  })
}

Canvas.prototype.type = "Widget"

Canvas.prototype.init = function() {
  var el = document.createElement('canvas')
  //this.update(null, el)
  this.el = el
  return el
}

Canvas.prototype.update = function(cell, el) {
  var ctx = el.getContext('2d')
  var w   = el.offsetWidth
  var h   = el.offsetHeight

}

