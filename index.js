var doc  = require('global/document')
var merc = require('mercury')
var h    = merc.h


var Grid = require('./components/grid')
var Life = require('./components/life')

var grid = Grid()
var life = Life(grid.state)

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
