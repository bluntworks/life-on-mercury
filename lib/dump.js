module.exports = function(name, grid) {
  var o = ''
  for(var r = 0; r < 10; r ++) {
    for(var c = 0; c < 10; c++) {
      o += (grid[r][c]) ? 1 : 0
    }
    o += '\n'
  }
  log('----' + name + '----')
  log(o)
  log('------------------------------')
}
