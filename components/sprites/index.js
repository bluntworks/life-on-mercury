var merc    = require('mercury')
var h       = merc.h
var mo      = require('moment')
var sprite  = require('./sprite-canvas')
var extend  = require('xtend')

module.exports = sprites

function sprites(data) {
  var state = merc.struct({
    items: merc.array([]),
    events: merc.struct({})
  })

  var events = merc.input([ 'click' ])
  state.events.set(events)

  return {
    state: state,
    events: events,
    add: add
  }

  function add(data) {
    if(isEmpty(data)) return
    state.items.push(spriteItem(data))
  }
}

sprites.render = function(state) {
  var items = state.items

  return h('div#sprites', [
    h('ul', items.map(function(it, i) {
      return itemRender(it, state.events)
    }))
  ])
}

function itemRender(state, events) {
  return h('li.sprite', {
   'ev-click': merc.event(events.click, state)
  }, [ sprite(state) ])
}

function isEmpty(data) {
  var m = []
  return !m.concat.apply(m, data).reduce(function(a, b) {
    return (b) ? a + 1 : a
  }, 0)
}

var sid = 0
function spriteItem(data) {
  return merc.struct({
    id: merc.value(sid++),
    title: merc.value('unnamed'),
    timestamp: mo(),
    grid: merc.array(data),
  })
}
