var merc = require('mercury')

var grid = module.exports = function(events) {
  var state =  merc.struct({
    rows: merc.value(10),
    cols: merc.value(10),
    world: merc.struct({}),
    mouseXY: merc.array([-1, -1]),
    events: events,
    handles: merc.value(0)
  })

  state.world.set(initWorld(state))
  return state
}

function initWorld(state) {
  var world = merc.struct({
    cols: merc.array([])
  })

  var rc = state.rows()
  var cc = state.cols()

  for(var c = 0; c < cc; c++) {
    var _row = merc.array([])
    for(var r = 0; r < rc; r++) {
      _row.push(initCell(c, r))
    }

    world.cols.push(_row)
  }

  return world
}

function initCell(c, r) {
  return merc.struct({
    col: merc.value(c),
    row: merc.value(r),
    click: merc.value('off')
  })
}
