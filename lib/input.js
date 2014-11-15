var merc = require('mercury')

module.exports = function() {
  var events = merc.input([
    'mousedown',
    'mouseover',
    'mouseout'
  ])
  return events
}
