module.exports = {
  down: function(state, coords) {
    var xy   = pos2grid(coords, state)
    var cell = state.world().cols.get(xy.c).get(xy.r);

    ('on' == cell.click())
      ? cell.click.set('off')
      : cell.click.set('on')
  },

  over: function(state, coords, ev) {
    var xy = pos2grid(coords, state)
    var cell = state.world().cols.get(xy.c).get(xy.r)
    log('over coords', coords)
    //cell.state.set('over')
  },

  out: function(state) {
    log('mouse out')
  }
}

function pos2grid(coords, state) {
  var el = coords.src
  var w  = el.offsetWidth
  var h  = el.offsetHeight
  var rc = state.rows()
  var cc = state.cols()
  var cX = coords.cx
  var cY = coords.cy

  var cw = w / cc
  var ch = h / rc

  var cp = Math.floor(cX / cw)
  var rp = Math.floor(cY / ch)

  return {
    c: cp,
    r: rp
  }
}
