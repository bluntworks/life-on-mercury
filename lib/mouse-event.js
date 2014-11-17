var window = require('global/window')
var Event  = require('geval')
var merc   = require('mercury')

module.exports = createInput

function createInput() {
  var events = merc.input([
    'mouseover', 'mouseout', 'mouseover'
  ])




}


function lambda(ev) {
  var opts = this.opts
  log('mouse lambda', this)

  return this.data
}
