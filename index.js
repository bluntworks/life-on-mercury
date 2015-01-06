var doc   = require('global/document')
var merc  = require('mercury')
var h     = merc.h

var data = {
  gw: 600,
  gh: 600,
  rc: 11,
  cc: 11,
  tok: 125
}

var Grid      = require('./components/grid')
var Transform = require('./components/transform')
var Sprites   = require('./components/sprites')

var grid      = Grid(data)
var transform = Transform(grid.state)
var sprites   = Sprites()

function State() {
  return merc.struct({
    grid: grid.state,
    sprites: sprites.state
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
  sprites.events.click(function(ev) {
    grid.addSprite(ev.grid)
  })
}

var spaced = false
function handleSpace() {
  if(spaced) return spaced = false
  spaced = true
  sprites.add(grid.state.grid())
}

function handleReset() {
  grid.reset()
}

function render(state) {
  return h('div#main', [
    h('div#left', [ Grid.render(state.grid) ]),
    h('div#right', [ Sprites.render(state.sprites) ]),
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
