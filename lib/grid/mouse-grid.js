var merc = require('mercury')

module.exports = {
  m2g: mouse2grid,
  g2m: grid2mouse
}

function mouse2grid(xy, cc) {
  var w = h = 800
  var cw = w / cc
  var ch = h / cc
  var c = Math.floor(xy.x / cw)
  var r = Math.floor(xy.y / ch)

  return {
    r: r,
    c: c
  }
}

function grid2mouse(rc, cc) {
  var w = h = 800
  var cw = ch = w / cc
  return {
    x: Math.floor(rc.c * cw),
    y: Math.floor(rc.r * ch)
  }
}
