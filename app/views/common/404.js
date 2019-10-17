var Magix = require('magix')

module.exports = Magix.View.extend({
  tmpl: '@404.html',
  render: function() {
    var me = this
    me.setView()
  }
})