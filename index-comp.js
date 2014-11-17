var doc  = require('global/document')
var merc = require('mercury')
var h    = merc.h
var canvas = require('./lib/grid-canvas')
var Down = require('./lib/mouse-handlers')
var drag = require('./ex/geometry/drag-handler')
var mouse = require('./lib/mouse-event.js')

dom.listenTo('mouseover')

var GridComponent = function() {
  var events = merc.input(['mousedown', 'mouseover'])
  var state  = merc.struct({
    mx: merc.value(null),
    my: merc.value(null),
    events: events
  })

  var grid = new canvas(paint, state)
  var prev = null
  this.grid = grid

  events.mousedown(function() {
    log('mousedown args', arguments)
    grid.update(null, grid.init())
  })

  return {
    state: state,
    events: events
  }
}

GridComponent.render = function(state) {
  log('render comp', state)
  return h('div#life', {
    'ev-mousedown': Down(state.events.mousedown, { ok: 'yay' })
  }, [ this.canvas ])
}

function paint(ctx, data) {
  log('canvas paint', ctx, data)
}

function State() {
  var state = merc.struct({
    grid: GridComponent().state
  })
  return state
}

function render(state) {
  log('render state', state)
  return GridComponent.render(state.grid)
}


merc.app(document.body, State(), render)
log('delegator', delegator)
