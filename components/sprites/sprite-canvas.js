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
  el.width = 121
  el.height = 121
  this.first(null, el)
  return el
}

Sniplet.prototype.update = function(prev, el) {
  //noop
}

Sniplet.prototype.first = function(prev, el) {
  var ctx = el.getContext('2d')
  var grid = this.data.grid
  var gw = gh = 121
  var rc = grid.length
  var cc = grid[0].length

  var cw = gw / cc
  var ch = gh / rc

  ctx.clearRect(0, 0, gw, gh)
  ctx.fillStyle = '#0cf'

  raf(function() {
    for(var r = 0; r < rc; r++) {
      for(var c = 0; c < cc; c++) {
        var cell = grid[c][r]
        if(cell) {
          var x = Math.floor(r * cw)
          var y = Math.floor(c * ch)
          ctx.fillRect(x, y, cw, ch)
        }
      }
    }

    ctx.strokeStyle = '#303030'
    // draw horiontal grid lines (rows)
    for(var i = 1; i < rc; i++) {
      var ly = i * ch
      ctx.beginPath()
      ctx.moveTo(0, ly)
      ctx.lineTo(gh, ly)
      ctx.stroke()
    }

    // draw verctical grid lines (cols)
    for(var i = 1; i < cc; i++) {
      var ly = i * cw
      ctx.beginPath()
      ctx.moveTo(ly, 0)
      ctx.lineTo(ly, gw)
      ctx.stroke()
    }
  })
}
