var merc = require('mercury')

function update(grid) {
    var result = [];
    /**
     * Return amount of alive neighbours for a cell
     */
    function _countNeighbours(x, y) {
        var amount = 0;
        
        function _isFilled(x, y) {
            return cells[x] && cells[x][y];
        }
        
        if (_isFilled(x-1, y-1)) amount++;
        if (_isFilled(x,   y-1)) amount++;
        if (_isFilled(x+1, y-1)) amount++;
        if (_isFilled(x-1, y  )) amount++;
        if (_isFilled(x+1, y  )) amount++;
        if (_isFilled(x-1, y+1)) amount++;
        if (_isFilled(x,   y+1)) amount++;
        if (_isFilled(x+1, y+1)) amount++;
        
        return amount;
    }
    
    cells.forEach(function(row, x) {
        result[x] = [];
        row.forEach(function(cell, y) {
            var alive = 0,
                count = _countNeighbours(x, y);
            
            if (cell > 0) {
                alive = count === 2 || count === 3 ? 1 : 0;
            } else {
                alive = count === 3 ? 1 : 0;
            }
            
            result[x][y] = alive;
        });
    });
    
    cells = result;
    
    draw();
}

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
