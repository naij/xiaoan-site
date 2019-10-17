var script = function() {
  var scripts = document.getElementsByTagName('script')
  return scripts[scripts.length - 1]
}()

var base = function() {
  var src = script.getAttribute('src')
  var base = /(.*\/)(.+\/.+)/.exec(src)[1]
  return base
}()

seajs.config({
  alias: {
    'jquery': 'app/libs/jquery',
    'magix': 'app/libs/magix',
    'pat': 'app/libs/pat',
    'moment': 'app/libs/moment',
    'underscore': 'app/libs/underscore'
  },
  base: base,
  charset: 'utf-8'
})

seajs.use(['magix', 'jquery'], function(Magix, $) {
  Magix.boot({
    ini: 'app/ini'
  })
})
