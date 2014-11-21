var merc      = require('mercury')
var h         = merc.h
var Canvas    = require('./canvas')
var MouseDown = require('./mouse').MouseDown
var MouseOver = require('./mouse').MouseOver
var m2g       = require('./mouse-grid').m2g
var dump      = require('../../dump')

module.exports = grid

function grid(data) {
  data = (data) || {}

  var state = merc.struct({
    gw: merc.value(data.gw),
    gh: merc.value(data.gh),
    rc: merc.value(data.rc),
    cc: merc.value(data.cc),
    mx: merc.value(null),
    my: merc.value(null),
    over: merc.array([]),
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

function initGrid(data) {
  var rc = data.rc
  var cc = data.cc
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

grid.render = function(state) {
  var events = state.events

  var view = h('div#life', {
    'ev-mousedown': MouseDown(events.mousedown),
    'ev-mouseover': MouseOver(events.mouseover),
    'ev-mouseup': MouseDown(events.mouseup)
  }, [ new Canvas(state) ])

  return view
}

function initEvents(state) {
  var events = merc.input([
    'mousedown', 'mouseover', 'mouseout', 'mouseup'
  ])

  events.mousedown(function(xy) {
    var roco = m2g(xy, state.gw() / state.cc(), state.gh() / state.rc())
    var c = state.grid.get(roco.r).get(roco.c);
    (c()) ? c.set(false) : c.set(true)
  })

  events.mouseover(function(xy) {
    if(xy.isdown) {
      var roco = m2g(xy, state.gw() / state.cc(), state.gh() / state.rc())
      if(indexOf(state.over(), roco) < 0) state.over.push(roco)
    }
    state.mx.set(xy.x)
    state.my.set(xy.y)
  })

  events.mouseup(function(xy) {
    var over = state.over()
    for(var i = 1; i < over.length ; i++) {
      var o = over[i]
      var c = state.grid.get(o.r).get(o.c)
      c.set(!c())
    }
    state.over.set([])
  })

  return events
}

function indexOf(arr, it) {
  for(var i = 0, len = arr.length; i < len; i++) {
    if(arr[i].r === it.r && arr[i].c === it.c) return i
  }
  return -1
}


