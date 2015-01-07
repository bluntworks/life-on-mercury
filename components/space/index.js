var hg = require('mercury')
var h  = hg.h

module.exports = space


function space(data) {
  var state = hg.struct({
    on: hg.value(false),
    events: hg.struct({})
  })

  var events = hg.input(['click'])

  events.click(function() {
    state.on.set(!state.on())
  })

  state.events.set(events)

  return {
    state: state,
    events: events
  }
}

space.render = function(state) {
  var ison = state.on
  return h('button', {
    name: 'onoff',
    className: (ison) ? 'on' : 'off',
    //'ev-click': hg.event(state.events.click)
  }, (ison) ? 'press space bar to stop' : 'press space bar to run')
}
