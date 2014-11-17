var Del = require('dom-delegator')
var EE  = require('events').EventEmitter
var doc = require('global/document')

var del = new Del()
var ee  = new EE()

ee.on('textClicked', function (val) {
  log('do stuff with', val)
})

var el = doc.querySelector('.foo')

var res = []
var c   = 0

var handle = Del.allocateHandle(function(ev) {
  res.push(ev)
  log('res', res)
})

var handle2 = Del.transformHandle(handle, function(ev) {
  log('hand2 clicked')
  return { clicks: c++ }
})

del.addEventListener(el.querySelector('.bar'), 'click', handle2)

log('handles', handle, handle2)
