var merc    = require('mercury')
var h       = merc.h
var mo      = require('moment')
var sniplet = require('./snip-canvas')
var extend  = require('xtend')

module.exports = snippets

function snippets(data) {
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
    state.items.push(snipItem(data))
  }

}

snippets.render = function(state) {
  return h('div#snips', [
    h('ul', state.items.map(function(it, i) {
      it.indx = i
      return itemRender(it, state.events)
    }))
  ])
}

function itemRender(state, events) {
  return h('li.snip', {
   'ev-click': merc.event(events.click, state)
  }, [ sniplet(state) ])
}

function isEmpty(data) {
  var m = []
  return !m.concat.apply(m, data).reduce(function(a, b) {
    return (b) ? a + 1 : a
  }, 0)
}

function snipItem(data) {
  return merc.struct({
    title: merc.value('unnamed'),
    timestamp: mo(),
    grid: merc.array(data),
  })
}
