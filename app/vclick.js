var Magix = require('magix')
var $ = require('jquery')

$('body').on('click', 'a', function(e) {
  var $tar = $(e.currentTarget)
  var href = $tar.attr('href')
  var ignore = $tar.attr('vclick-ignore')

  if (href && /^\/[^\/]/.test(href) && !ignore) {
    e.preventDefault()
    Magix.Router.to(href)
  }
})
