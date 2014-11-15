var merc = require('mercury')

var grid = module.exports = function(events) {
  return merc.struct({
    rows: merc.value(10),
    cols: merc.value(10),
    events: events
  })
}
