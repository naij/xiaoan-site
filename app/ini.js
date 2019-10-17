var Magix = require('magix')
var Router = Magix.Router
var $ = require('jquery')

var routeMap = {
  'app/views/layout/default': [
    {path: '/'}
  ]
}
var routes = function() {
  var s = {}
  $.each(routeMap, function(k, item) {
    $.each(item, function(i, v) {
      s[v.path] = k
    })
  })
  return s
}()


return {
  defaultPath: '/',
  defaultView: 'app/views/layout/default',
  unmatchView: 'app/views/common/404',
  routes: routes,
  exts: [
    'app/exts',
    'app/vclick',
    'app/plugins/index'
  ]
}