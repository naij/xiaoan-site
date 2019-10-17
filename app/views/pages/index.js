var Magix = require('magix')
var $ = require('jquery')
var Dialog = require('app/mixins/dialog')

module.exports = Magix.View.extend({
  tmpl: '@index.html',
  mixins: [Dialog],
  render: function() {
    var me = this
    me.setView().then(function() {
      $('.slider').unslider({
        arrows: false,
        speed: 500
      })
    })
  }
})