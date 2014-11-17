var doc   = require('global/document')
var merc  = require('mercury')
var h     = merc.h

module.exports = CanvasWidget

function CanvasWidget(paint, data) {
  if(!(this instanceof CanvasWidget)) return new CanvasWidget(piant, data)
  this.paint = paint
  this.data = data
}

CanvasWidget.prototype.type = "Widget"

CanvasWidget.prototype.init = function() {
  var el = doc.createElement('canvas')
  this.update(null, el)
  return el
}

CanvasWidget.prototype.update = function(prev, el) {
  log('udate canv prev', prev)
  var ctx = el.getContext('2d')
  this.paint(ctx, this.data)
}
