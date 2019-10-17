var Magix = require('magix')
var $ = require('jquery')

module.exports = Magix.View.extend({
  tmpl: '@confirm.html',
  ctor: function() {
    this.observe(null, true)
  },
  init: function(extra) {
    this.extraData = extra
  },
  render: function() {
    this.data = this.extraData
    this.data.title = this.data.title || '提示'
    this.setView()
  },
  'submit<click>': function(e) {
    e.preventDefault()
    if (this.extraData.enterCallback) {
      this.extraData.enterCallback()
    }
    this.extraData.dialog.close()
  },
  'cancel<click>': function(e) {
    e.preventDefault()
    if (this.extraData.cancelCallback) {
      this.extraData.cancelCallback()
    }
    this.extraData.dialog.close()
  },
})