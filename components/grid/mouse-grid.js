var merc = require('mercury')

module.exports = {
  m2g: mouse2grid,
  g2m: grid2mouse
}

function mouse2grid(xy, cw, ch) {
  var c = Math.floor(xy.x / cw)
  var r = Math.floor(xy.y / ch)
  return { r: r,  c: c  }
}

function grid2mouse(rc, cw, ch) {
  return {
    x: Math.floor(rc.c * cw),
    y: Math.floor(rc.r * ch)
  }
}
