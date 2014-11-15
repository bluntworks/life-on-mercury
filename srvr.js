var dbug  = require('debug')('life:server')
var expr  = require('express')
var app   = expr()
var srvr  = require('http').createServer(app)

app.use(expr.static(__dirname + '/static'))

srvr.listen(5150, function() {
  dbug('life listening on', 5150)
})
