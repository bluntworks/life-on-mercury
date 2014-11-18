//algorithm taken from this fiddle http://jsfiddle.net/ankr/tgjLA/
module.exports = function(cells, rc, cc) {
  return genr()

  function genr() {
    var res   = []
    for(var r = 0; r < rc; r++) {
      res[r] = []
      for(var c = 0; c < cc; c++) {
        var alive = 0
        var count = neighbours(r, c)
        if(cells[r][c]) alive = (count === 2 || count === 3) ? true : false
        else alive = (count === 3) ? true : false
        res[r][c] = alive
      }
    }
    return res
  }

  function neighbours(x, y) {
    var count = 0

    if(isOn( x-1, y-1 )) count++
    if(isOn( x,   y-1 )) count++
    if(isOn( x+1, y-1 )) count++
    if(isOn( x-1, y   )) count++
    if(isOn( x+1, y   )) count++
    if(isOn( x-1, y+1 )) count++
    if(isOn( x,   y+1 )) count++
    if(isOn( x+1, y+1 )) count++

    return count

    function isOn(x, y) {
      return cells[x] && cells[x][y]
    }
  }
}
