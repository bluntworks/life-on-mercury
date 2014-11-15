var log  = console.log
var merc = require('mercury')
var val  = merc.value(0)

val(function(diff) {
  log('val diff', diff, diff._diff)
})

val.set(1)
val.set(2)

var array = merc.array([1, 2, 3])
array(function(diff) {
  log('array diff', diff, diff._diff)
})

array.push(4)

var struct = merc.struct({
  color: merc.value('red'),
  width: merc.value(100),
  height: merc.value(200)
})

struct(function(diff) {
  log('struct diff', diff, diff._diff)
})

struct.color.set('vroom')
