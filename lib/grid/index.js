var merc      = require('mercury')
var h         = merc.h

var Canvas    = require('./canvas')
var MouseDown = require('./mouse').MouseDown
var MouseOver = require('./mouse').MouseOver
var m2g       = require('./mouse-grid').m2g

module.exports = grid

function grid(data) {
  data = (data) || {}

  var state = merc.struct({
    cc: merc.value(10),
    mx: merc.value(null),
    my: merc.value(null),
    grid: initGrid(data),
    events: merc.struct({})
  })

  var events = initEvents(state)
  state.events.set(events)

  return {
    state: state,
    events: events
  }
}

grid.render = function(state) {
  var events = state.events

  var view = h('div#life', {
    'ev-mousedown': MouseDown(events.mousedown),
    'ev-mouseover': MouseOver(events.mouseover)
  }, [ new Canvas(state) ])

  return view
}

function initEvents(state) {
  var events = merc.input([
    'mousedown', 'mouseover', 'mouseout'
  ])

  events.mousedown(function(xy) {
    var rc = m2g(xy, state.cc())
    var c = state.grid.get(rc.r).get(rc.c);
    (c()) ? c.set(false) : c.set(true)
  })

  events.mouseover(function(ev) {
    state.mx.set(ev.x)
    state.my.set(ev.y)
  })

  return events
}

function initGrid(data) {
  var rc = cc = 10
  var rows = merc.array([])

  for(var r = 0; r < rc; r++) {
    var col = merc.array([])
    for(var c = 0; c < cc; c++) {
      col.push(initCell(r,c))
    }
    rows.push(col)
  }

  return rows
}

function initCell(r, c) {
  return merc.value(false)
}
