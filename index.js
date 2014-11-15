var merc    = require('mercury')
var State   = require('./lib/state')
var render  = require('./lib/render')
var Input   = require('./lib/input')
var update  = require('./lib/update')

var App = function() {
  var events = Input()
  var state = State(events)

  wire(state, events)
  return state
}

function  wire(state, events) {
  events.mousedown(update.down.bind(null, state))
  events.mouseover(update.over.bind(null, state))
  events.mouseout(update.out.bind(null, state))
}

//merc.app(document.body, App(), render)
boot(document.body, App(), render)

function boot(el, observ, render, opts) {
  var gatr = merc.Delegator(opts);

  ['mouseover', 'mouseout'].forEach(function(ev) {
    gatr.listenTo(ev)
  })

  var loop = merc.main(observ(), render, opts)

  el.appendChild(loop.target)

  return observ(loop.update)
}
