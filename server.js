var expr  = require('express')
var app   = expr()
var srvr  = require('http').createServer(app)

app.use(expr.static(__dirname + '/static'))

srvr.listen(5150, function() {
  console.log('Life on Mercury')
  console.log('open http://localhost:5150 in your browser')
})
