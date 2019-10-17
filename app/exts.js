var Magix = require('magix')
var Pat = require('pat')
var $ = require('jquery')
var Manager = require('app/models/manager')
var filters = require('app/filters')
var Router = Magix.Router

Magix.View.merge({
  ctor: function() {
    this.$locker = {}
    this.on('rendercall', function() {
      this.$locker = {}
    })
  },
  param: function(key) {
    return Router.parse().params[key] || ''
  },
  to: function() {
    return Router.to.apply(Router, arguments)
  },
  request: function(key) {
    var me = this
    var s = new Manager()
    return me.capture(key || s.id, s, true)
  },
  /**
   * 更新view
   * @param  {function} firstCallback 第一次渲染view会调用
   * @param  {function} otherCallback 除第一次渲染其他时候的render会调用
   */
  setView: function(firstCallback, otherCallback) {
    var me = this
    var defer = $.Deferred()
    var wrapper = $('#' + me.id)
    var n = wrapper[0]

    var data = me.data

    var options
    if (!me.rendered) {
      me.beginUpdate(me.id)

      if (n) {
        options = {
          el: wrapper[0],
          data: data,
          template: me.tmpl,
          dataCheckType: 'dirtyCheck'
        }

        me.filters = me.filters || {}
        options.filters = $.extend(filters, me.filters)
        // $.each(me.filters, function(key, filter) {
        //   me.filters[key] = $.bind(filter, me)
        // })

        me.__pat = new Pat(options)
        me.__pat.on('beforeDeleteBlock', function(targets) {
          $.each(targets, function(index, target) {
            if (target.nodeType === 1) {
              me.owner.unmountZone && me.owner.unmountZone(target)
            }
          })
        })

        me.__pat.on('beforeUpdateAttribute', function(targets, attribute, value) {
          // if (!/(mx-|data-)/.test(attribute)) return

          for (var i = 0, target; i < targets.length; i++) {
            target = targets[i]
            if (target.hasAttribute('mx-view')) {
              var vf = Magix.Vframe.get(target.id)
              if (vf) {
                vf.unmountView()
              }
            }
          }
        })
          // 属性变更时有些特殊场景需要处理
        me.__pat.on('afterUpdateAttribute', function(targets, attribute, value) {
          if (!/(mx-|data-)/.test(attribute)) return

          for (var i = 0, target; i < targets.length; i++) {
            target = targets[i]
            if (target.hasAttribute('mx-view')) {
              var vf = Magix.Vframe.get(target.id)
              if (vf) {
                vf.mountView(target.getAttribute('mx-view'))
              }
            }
          }
        })

        // 添加时需要boot brix组件
        me.__pat.on('afterAddBlock', function(targets) {
          $.each(targets, function(i, target) {
            if (target.nodeType === 1) {
              if (target.getAttribute('mx-vframe')) {
                if (!target.id) {
                  target.id = 'mx_n_' + new Date().getTime()
                }
                me.owner.mountVframe(target.id, target.getAttribute('mx-view'))
              } else {
                me.owner.mountZone(target.id)
              }
            }

          })
        })
        me.data = me.__pat.$data
      }

      me.endUpdate(me.id)
      firstCallback && firstCallback.call(me)
      defer.resolve()

      me.on('destroy', function() {
        if (me.__pat) me.__pat.$destroy()
      })
      me.rendered = true
    } else {
      if (!data.__inject__) {
        $.extend(me.__pat.$data, me.data)
        me.data = me.__pat.$data
      }
      me.__pat.$apply()

      // me.owner.mountZone()

      otherCallback && otherCallback()
      defer.resolve()
    }

    return defer.promise()
  },
  animateLoading: function () {
    var uxloading = $('.block-switch-loading')
    uxloading.css({
      opacity: 1,
      width: 0
    })
    uxloading.stop().animate({
      width: '100%'
    }, 200, 'linear', function () {
      var _this = this
      setTimeout(function () {
        uxloading.stop().animate({
          opacity: 0
        }, 250)
      }, 250)
    })
  }
})
