var merc = require('mercury')
var h    = merc.h

var clickEvent = require('../../lib/click-event')

module.exports = Settings


function Settings(data) {
  var state = merc.struct({
    cc: merc.value(data.cc || 11),
    rc: merc.value(data.rc || 11),
    linked: merc.value(true),
    tok: merc.value(data.tok || 250),
    gen: merc.value(10),
    events: merc.struct({})
  })

  var events = merc.input(['click', 'change'])

  state.events.set(events)

  return {
    state: state,
    events: events
  }

}

Settings.render = function (state) {
  var events = state.events

  return h('div#dashboard', [

    h('div.fld', [
      h('label', { for: 'cc' }, [ 'Column Count' ]),
      h('input', {
        type: 'text',
        name: 'cc',
        value: state.cc,
        'ev-event': merc.changeEvent(events.change)
      })
    ]),

    h('div.fld.link', [
      h('a', {
        href: '#linked',
        'ev-click': clickEvent(events.click, {
          link: !state.linked,
          preventDefault: true
        })
      }, [ (state.linked) ? h('i.fa.fa-link') : h('i.fa.fa-unlink') ])
    ]),

    h('div.fld', [
      h('label', { for: 'cc' }, [ 'Row Count' ]),
      h('input', {
        type: 'text',
        name: 'rc',
        value: state.rc,
        'ev-event': merc.changeEvent(events.change)
      })
    ]),

    h('div.fld', [
      h('label', { for: 'tok' }, [ 'Genartion Time' ]),
      h('input', {
        type: 'text',
        name: 'tok',
        value: state.tok,
        'ev-event': merc.changeEvent(events.change)
      })
    ]),

    h('div.fld', [
      h('label', { for: 'cycle' }, [ 'Generation' ]),
      h('input', {
        type: 'text',
        name: 'gen',
        value: state.gen,
        disabled: true
      })
    ]),

  ])
}
