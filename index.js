var doc  = require('global/document')
var merc = require('mercury')
var h    = merc.h

var data = {
  gw: 800,
  gh: 800,
  rc: 20,
  cc: 20
}

var Grid      = require('./components/grid')
var Transform = require('./components/transform')
var Snippets  = require('./components/snippets')

var grid = Grid(data)
var tarnsform = Transform(grid.state)
var snippets = Snippets()


//Kick it all off
boot(doc.body, grid.state, Grid.render)

function boot(elem, observ, render, opts) {
  var del = new merc.Delegator(opts);
  ['mouseover', 'mouseout'].forEach(function(ev) {
    del.listenTo(ev)
  })
  var loop = merc.main(observ(), render, opts)
  elem.appendChild(loop.target)
  return observ(loop.update)
}
