var merc = require('mercury')
var h    = merc.h
var genr = require('./life-matrix')
var raf  = require('raf')

module.exports = life

function life(gridState) {
  var state = merc.struct({
    looping: merc.value(false),
    tok: merc.value(125),
    events: merc.struct({})
  })

  var events = initEvents(state, gridState)
  state.events.set(events)
  return state
}

life.render = function(state) {
  return h('div#topbar', [
    renderTok(state.life.state)
  ])
}

function renderTok(state) {
  var events = state.events
  return h('input.tok', {
    name: 'tok',
    'ev-change': merc.changeEvent(events.change)
  })
}

function initEvents(state, gridState) {

  var events = merc.input([
    'change', 'keyup'
  ])

  events.change(function(val) {
    state.tok.set(val)
  })

  //set up generator loop handling
  //first pass sure theres a better way to do this
  //ask @raynos about this
  var del = merc.Delegator()
  del.addGlobalEventListener('keyup', function(ev) {
    if(32 === ev.keyCode)
      state.looping.set(!state.looping())
  })

  var stopped = true
  var tid

  state.looping(function(loop) {
    (loop) ? run(gridState) : stop(state)
  })

  function run(gridState) {
    log('start')
    stopped = false
    var tok = state.tok()
    function tik() {
      raf(function() {
        //if(stopped) return
        var grid = gridState.grid
        var rc   = gridState.rc()
        var cc   = gridState.cc()
        var next = genr(grid(), rc, cc)
        for(var r = 0; r < rc; r++) {
          for(var c = 0; c < cc; c++) {
            grid.get(r).get(c).set(next[r][c])
            //log('set')
            //grid[r][c].set(next[r][c])
          }
        }
        if(state.looping()) setTimeout(tik, tok)
      })
    }

    setTimeout(tik, tok)
  }

  function stop(state) {
    if(!stopped) {
      log('stop')
      stopped = true
      state.looping.set(false)
    }
  }
}


