var doc  = require('global/document')
var merc = require('mercury')
var m2g  = require('./mouse-grid').m2g
var g2m  = require('./mouse-grid').g2m
var raf  = require('raf')
var dump = require('../../dump')

module.exports = Canvas

function Canvas(data) {
  if(!(this instanceof Canvas)) return new Canvas(data)
  this.data = data
  //log('canvas data', this.data)
}

Canvas.prototype.type = 'Widget'

Canvas.prototype.init = function() {
  var el = doc.createElement('canvas')
  el.width = 800
  el.height = 800
  this.update(null, el)
  return el
}

Canvas.prototype.update = function(prev, el) {
  var ctx = el.getContext('2d')

  var mx = this.data.mx
  var my = this.data.my
  var over = m2g({ x: mx, y: my }, this.data.cc)
  var grid = this.data.grid
  var rc = cc = this.data.cc

  //dump('canvas', grid)

  raf(function() {
    ctx.clearRect(0, 0, 800, 800)
    for(var r = 0; r < rc; r++) {
      for(var c = 0; c < cc; c++) {
        var cell = {
          state: grid[r][c],
          r: r,
          c: c
        }

        var xy = g2m(cell, 10)

        if(over.r === r && over.c === c) {
          ctx.fillStyle = (cell.state) ? '#0cf' : '#444'
          ctx.fillRect(xy.x, xy.y, 80, 80)
        } else if(cell.state) {
          ctx.fillStyle = '#0cf'
          ctx.fillRect(xy.x, xy.y, 80, 80)
        }
      }
    }

    ctx.strokeStyle = '#303030'
    for(var i = 1; i < rc; i++) {
      var ly = i * 80
      ctx.beginPath()
      ctx.moveTo(0, ly)
      ctx.lineTo(800, ly)
      ctx.stroke()
    }
    for(var i = 1; i < rc; i++) {
      var ly = i * 80
      ctx.beginPath()
      ctx.moveTo(ly, 0)
      ctx.lineTo(ly, 800)
      ctx.stroke()
    }
  })
}
