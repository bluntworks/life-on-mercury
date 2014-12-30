var doc   = require('global/document')
var merc  = require('mercury')
var h     = merc.h

var data = {
  gw: 800,
  gh: 800,
  rc: 11,
  cc: 11,
  tok: 125
}

var Grid      = require('./components/grid')
var Transform = require('./components/transform')
var Snippets  = require('./components/snippets')
var Settings  = require('./components/settings')

var grid      = Grid(data)
var transform = Transform(grid.state)
var snippets  = Snippets()
var settings  = Settings(data)

function State() {
  return merc.struct({
    grid: grid.state,
    snips: snippets.state,
    settings: settings.state
  })
}

events()

function events() {
  var del = new merc.Delegator()
  del.addGlobalEventListener('keyup', function(ev) {
    if(32 == ev.keyCode) handleSpace()
    if(67 == ev.keyCode) handleReset()
  })

  //snippets
  snippets.events.click(function(ev) {
    grid.addSnip(ev.grid)
  })

  //settings
  settings.events.change(function(ev) {
    var key = Object.keys(ev)[0]
    var val = ev[key]
    log('settings change', ev, key, val)

    if(val < 2 || val > data.rc) return
    if('cc' === key || 'rc' === key) {
      if(settings.state.linked()) {
        grid.state.cc.set(val)
        grid.state.rc.set(val)
        settings.state.cc.set(val)
        settings.state.rc.set(val)
      } else {
        grid.state[key].set(val)
        settings.state[key].set(val)
      }
    }

    if('tok' === key) {
      transform.tok.set(val)
      settings.state.tok.set(val)
    }

  })

  settings.events.click(function(ev) {
    settings.state.linked.set(ev.link)
    log('settings click', ev, arguments)
  })
}



var spaced = false
function handleSpace() {
  if(spaced) return spaced = false
  spaced = true
  snippets.add(grid.state.grid())
}

function handleReset() {
  grid.reset()
}


function render(state) {
  return h('div#main', [
    h('div#top', [ Settings.render(state.settings) ]),
    h('div#left', [ Grid.render(state.grid) ]),
    h('div#right', [ Snippets.render(state.snips) ]),
  ])
}

//Kick it all off
boot(doc.body, State(), render, { preventDefault: true })

function boot(elem, observ, render, opts) {
  var del = new merc.Delegator(opts);
  ['mouseover', 'mouseout'].forEach(function(ev) {
    del.listenTo(ev)
  })
  var loop = merc.main(observ(), render, opts)
  elem.appendChild(loop.target)
  return observ(loop.update)
}
