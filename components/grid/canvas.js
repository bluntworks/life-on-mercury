var doc  = require('global/document')
var merc = require('mercury')
var m2g  = require('./mouse-grid').m2g
var g2m  = require('./mouse-grid').g2m
var raf  = require('raf')
var dump = require('../../dump')

module.exports = Canvas

var css = {
  over  : '#252525',
  off   : '#202020',
  on    : '#0cf',
  drag  : '#26697a',
  brdr  : '#272727',
  ctr   : '#212121'
}

function Canvas(data) {
  if(!(this instanceof Canvas)) return new Canvas(data)
  this.data = data
}

Canvas.prototype.type = 'Widget'

Canvas.prototype.init = function() {
  var el = doc.createElement('canvas')

  el.width  = this.data.gw
  el.height = this.data.gh

  this.update(null, el)
  return el
}

Canvas.prototype.update = function(prev, el) {
  var ctx = el.getContext('2d')

  var grid = this.data.grid

  //grid width/height
  var gw = this.data.gw
  var gh = this.data.gh

  //row / column counts
  var rc = this.data.rc
  var cc = this.data.cc

  var midr = (rc % 2) ? Math.floor(rc / 2) : false
  var midc = (cc % 2) ? Math.floor(cc / 2) : false

  //cell width/height
  var cw = gw / cc
  var ch = gh / rc

  var overs = this.data.over
  var mx = this.data.mx
  var my = this.data.my
  var over = m2g({ x: mx, y: my }, cw, ch)


  raf(function() {
    ctx.clearRect(0, 0, gw, gh)

    //if(midr && midc) {
    //  ctx.fillstyle = css.ctr
    //  ctx.fillRect(midc * cw , 0, cw, gh)
    //}

    for(var r = 0; r < rc; r++) {
      for(var c = 0; c < cc; c++) {
        var cell = {
          state: grid[r][c],
          r: r,
          c: c
        }

        var xy = g2m(cell, cw, ch)

        if(over.r === r && over.c === c) {
          ctx.fillStyle = (cell.state) ? css.on : css.over
            //: (10 == r || 10 == c ) ? css.over : css.over
          ctx.fillRect(xy.x, xy.y, cw, ch)
        } else if(cell.state) {
          ctx.fillStyle = css.on
          ctx.fillRect(xy.x, xy.y, cw, ch)
        }
      }
    }

    ctx.fillStyle = css.drag
    for(var i = 1; i < overs.length; i++) {
      var xy = g2m(overs[i], cw, ch)
      if(i === overs.length -1) ctx.fillStyle = css.on
      ctx.fillRect(xy.x, xy.y, cw, ch)
    }

    ctx.strokeStyle = css.brdr
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
