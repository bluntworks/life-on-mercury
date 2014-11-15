var merc = require('mercury')
//var MDown = require('./lib/mouse-handler')
var events = merc.input(['mousedown'])

var Delegator = require('dom-delegator')
var delegator = new Delegator()

var cevents = [
  'mouseover',
  'mouseout'
]

cevents.forEach(function(ev) {
  delegator.listenTo(ev)
})


events.mousedown(function(data, ev) {
  log('mousedown event', data, ev)
})

function render(state) {
  return merc.h('div#life', {
    'ev-mousedown': merc.event(events.mousedown, { ok: 'clicked' })
  },
  [
    merc.h('h2', 'Doggy style')
  ])
}

var state = merc.struct({
  count: merc.value(0)
})


merc.app(document.body, state, render)
