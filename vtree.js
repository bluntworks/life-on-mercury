var VNode = require('vtree/vnode')
var diff  = require('vtree/diff')
var patch = require('vdom/patch')
var crel  = require('vdom/create-element')

var leftNode  = new VNode('div')
var rightNode = new VNode('text')

log('left/right', leftNode, rightNode)

var root = crel(leftNode)
log('root', root)

document.body.appendChild(root)
var patches = diff(leftNode, rightNode)
log('patches', patches)


patch(root, patches)

