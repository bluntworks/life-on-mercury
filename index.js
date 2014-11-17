var doc  = require('global/document')
var merc = require('mercury')
var h    = merc.h


var Grid = require('./lib/grid')
var grid = Grid()

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
//var app = merc.app(doc.body, state, render)
//merc.Delegator.listenTo('mouseover')
