var merc = require('mercury')
var h    = merc.h

function EventComponent() {
  var events = merc.input(['toggle'])

  var state = merc.struct({
    name: 'event name',
    isOpen: merc.value(false),
    description: 'event description',
    events: events
  })

  events.toggle(function(data) {
    state.isOpen.set(data.value)
  })

  return { state: state }
}

EventComponent.render = function(state) {
  return h('div', [
    h('div', {
      'ev-click': merc.event(events.toggle, {
        evntIndex: j,
        dayIndex: i,
        value: !event.isOpen
      })
    }, event.name)
    h('div', {
      hidden: !event.isOpen
    }, event.description)
  ])
}

var state = merc.struct({
  calender: merc.struct({
    days: merc.array(initData.map(function (data) {
      return EventComponent(data).state
    }))
  })
})
