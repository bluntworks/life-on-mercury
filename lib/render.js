var merc  = require('mercury')
var h     = merc.h
var mdown = require('../lib/mouse-handler').MouseDown
var mover = require('../lib/mouse-handler').MouseOver
//var WorldCanvas = require('../lib/world-canvas')
var WorldCanvas = require('../lib/grid-canvas')

var render = module.exports = function(state) {
  var events = state.events

  return h('div#life', {
    //'ev-mousedown': mdown(events.mousedown, state),
    'ev-mousedown': merc.valueEvent(mdown(events.mousedown, state)),
    'ev-mouseover': mover(events.mouseover, state),
    'ev-mouseout': merc.event(events.mouseout, state)
  }, [
    WorldCanvas(paint, state.world.cols)
  ])
}

function paint(ctx, data) {
  log('paint', data)
}
