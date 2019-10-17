// 'top@../views/partials/alert.js'
// 'top@../views/partials/confirm.js'
var Magix = require('magix')
var $ = require('jquery')
var Win = $(window)
module.exports = {
  alert: function(content, enterCallback, title) {
    this.confirm(content, enterCallback, null, title, 'alert')
  },
  confirm: function(content, enterCallback, cancelCallback, title, view) {
    this.mxDialog('app/views/partials/' + (view || 'confirm'), {
      body: content,
      cancelCallback: cancelCallback,
      enterCallback: enterCallback,
      title: title,
      modal: true,
      width: 400,
      closable: false,
      left: (Win.width() - 400) / 2,
      top: Math.max((Win.height() - 220) / 2, 0)
    })
  },
  mxDialog: function(view, options) {
    var me = this
    var dlg
    var closeCallback
    var dOptions = {
      view: view
    }
    seajs.use(['app/coms/dialog/dialog', view], me.wrapAsync(function(MxDialog, V) {
      var key = '$dlg_' + view
      if (me[key]) return
      me[key] = 1
      Magix.mix(dOptions, V.dialogOptions)
      Magix.mix(dOptions, options)
      if (!dOptions.width) dOptions.width = 500
      if (!dOptions.left) dOptions.left = (Win.width() - dOptions.width) / 2
      if (!dOptions.top) dOptions.top = Math.max((Win.height() - dOptions.height) / 2, 0)
      dOptions.dialog = {
        close: function() {
          if (dlg) dlg.trigger('dlg_close')
        }
      }
      dlg = MxDialog.show(me, dOptions)
      dlg.on('close', function() {
        delete me[key]
        if (closeCallback) {
          closeCallback()
        }
      })
    }))
    return {
      close: function() {
        if (dlg) dlg.trigger('dlg_close')
      },
      whenClose: function(fn) {
        closeCallback = fn
      }
    }
  }
}