var doc = require('global/document')
var raf = require('raf')
module.exports = Sniplet

function Sniplet(data) {
  if(!(this instanceof Sniplet)) return new Sniplet(data)
  this.data = data
}

Sniplet.prototype.type = 'Widget'

Sniplet.prototype.init = function() {
  var el = doc.createElement('canvas')
  el.width = 40
  el.height = 40
  this.first(null, el)
  return el
}

Sniplet.prototype.update = function(prev, el) {
  //noop
}

Sniplet.prototype.first = function(prev, el) {
  var ctx = el.getContext('2d')
  var grid = this.data.grid
  var rc = grid.length
  var cc = grid[0].length

  ctx.clearRect(0, 0, 40, 40)
  ctx.fillStyle = '#0cf'

  raf(function() {
    for(var r = 0; r < rc; r++) {
      for(var c = 0; c < cc; c++) {
        var cell = grid[c][r]
        if(cell) {
          var x = Math.floor(r * 2)
          var y = Math.floor(c * 2)
          ctx.fillRect(x, y, 2, 2)
        }
      }
    }
  })
}
