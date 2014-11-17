var doc  = require('global/document')
var merc = require('mercury')
var h    = merc.h
var down = require('./lib/mouse-handlers')


//mouse event

//app
var events = merc.input(['mousedown'])
var state = merc.struct({
  x: merc.value(null),
  y: merc.value(null),
  handles: merc.value(null),
  events: events
})

events.mousedown(function(ev) {
  log('event mousdown', ev, this)
  state.x.set(ev.x)
  state.y.set(ev.y)
})

state.handles.set(merc.handles({
  down: mdown
}, state))

function mdown(state, data) {
  state.x.set(data.x)
  state.y.set(data.y)
  log('mdown', this, state, data)
}

function render(state) {
  var hand = state.handles
  var events = state.events
  return h('div#life', {
    //'ev-mousedown': merc.mouseEvent(hand.down, { ob: true })
    //'ev-mousedown': down(hand.down, { ob: true })
    'ev-mousedown': down(events.mousedown, { ob: true })
  }, [ Canvas(state) ])
}

function Canvas(data) {
  if(!(this instanceof Canvas)) return new Canvas(data)
  this.data = data
}

Canvas.prototype.type = 'Widget'

Canvas.prototype.init = function() {
  var el = doc.createElement('canvas')
  el.width = 800
  el.height = 800
  this.update(null, el)
  return el
}

Canvas.prototype.update = function(prev, el) {
  var ctx = el.getContext('2d')
  var x = this.data.x
  var y = this.data.y
  log('xy', x, y)
  if(null == x) return
  ctx.clearRect(0, 0, 800, 800)
  ctx.fillStyle = '#0cf'
  ctx.fillRect(x, y, 10, 10)
  log('canvas update', x, y, this.data)
}

boot(doc.body, state, render)
function boot(elem, observ, render, opts) {
  var del = new merc.Delegator(opts);
  ['mouseover', 'mouseout'].forEach(function(ev) {
    del.listenTo(ev)
  })
  var loop = merc.main(observ(), render, opts)
  elem.appendChild(loop.target)
  return observ(loop.update)
}
//var app = merc.app(doc.body, state, render)
//merc.Delegator.listenTo('mouseover')
