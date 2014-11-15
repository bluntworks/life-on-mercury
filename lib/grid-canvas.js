var document = require('global/document')
var merc     = require('mercury')
var h        = merc.h

module.exports = Canvas

function Canvas(paint, data) {
  if(!(this instanceof Canvas)) return new Canvas(paint, data)

  this.data = data
  this.paint = paint
}

Canvas.prototype.type = "Widget"

Canvas.prototype.init = function() {
  var el = document.createElement('canvas')
  this.update(null, el)
  return el
}

Canvas.prototype.update = function(prev, el) {
  var ctx = el.getContext('2d')
  this.paint(ctx, this.data)
  log('canvas update', prev, el)
}

