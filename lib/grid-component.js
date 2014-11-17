var merc   = require('mercury')
var canvas = require('../lib/canvas.js')

module.exports = Grid


function Grid() {
  var events = merc.input(['mouseover', 'mousedown'])

  var state  = merc.struct({
    name: 'grid-comp',
    cellWidth: merc.value(80),
    cellHeight: merc.value(80),
    grid: merc.struct({
      clickGrid: genGrid(rc, cc),
      overGrid: genGrid(rc, cc)
    }),
    //events: events
    handles: merc.value(null)
  })

  state.handles.set(merc.handles({
    mousedown: down,
    mouseover: over
  }, state))

  function down(state, data) {
    log('down', state, data)
  }

  function over(state, data) {
    log('over state', state, data)
  }

  events.mouseover(function() {
    log('mouseover', arguments)
  })

  events.mousedown(function() {
    log('mousedown', arguments)
  })

  return state
}

Grid.render = function(state) {
  var events = state.events
  return h('div#life', {
    'ev-mousedown': merc.event(events.mousedown, { }),
    'ev-mouseover': merc.event(events.mousemove, { })
  },
  [
    canvas(painter, state)
  ])
}

function genGrid(rc, cc) {
  var rows = merc.array([])
  for(var r = 0; r < rc; r++) {
    var cols = merc.array([])
    for(var c = 0; c < cc; c++) {
      cols.push(genCell(r, c))
    }
    rows.push(cols)
  }
  return rows
}

function genCell(r, c) {
  return merc.value(false)
}
