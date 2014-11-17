var doc  = require('global/document')
var merc = require('mercury')
var h    = merc.h
var canvas = require('./lib/grid-canvas')
var Down = require('./lib/mouse-handlers')
var drag = require('./ex/geometry/drag-handler')
var mouse = require('./lib/mouse-event.js')


function paint(ctx, data) {
  log('canvas paint', ctx, data)
}

function State() {
  var events =  merc.input(['mousedown'])

  events.mousedown(function() {
    log('events.mousedown', arguments)
  })

  var state = merc.struct({
    color: merc.value('#fff'),
    handles: merc.value(null),
    //events: events
  })

  state.handles.set(merc.handles({
   mousedown: mouseDown
  }, state))

  return state
}

function mouseDown(state, color) {
  log('mousedown', state(), color)
  state.color.set('#000')
}

function render(state) {
  var hand = state.handles
  var events = state.events
  return h('div#life', {
    'ev-mousedown': Down(hand.mousedown, { ok: true })
  }, [ new canvas(paint, state.color) ])
}

merc.app(document.body, State(), render)
