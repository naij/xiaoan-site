var Magix = require('magix')
var $ = require('jquery')

var Service = Magix.Service.extend(function(bag, callback) {
  var ajaxSetting = {
    method: 'GET',
    dataType: 'json'
  }
  var params = bag.get('params') || bag.get('formParams') || bag.get('urlParams') || {}
  var url = bag.get('url')
  var method = bag.get('method') || ajaxSetting.method
  var dataType = bag.get('dataType') || ajaxSetting.dataType
  var paramsStrArr = []

  $.extend(params, {
    t: (+new Date())
  })

  if (typeof params === 'object') {
    for (var key in params) {
      if (params.hasOwnProperty(key)) {
        if (typeof params[key] === 'object') {
          paramsStrArr.push(key + '=' + encodeURIComponent(JSON.stringify(params[key])))
        } else {
          paramsStrArr.push(key + '=' + encodeURIComponent(params[key]))
        }
      }
    }
    params = paramsStrArr.join('&')
  }

  $.ajax({
    url: Magix.toUrl(url),
    dataType: dataType,
    data: params,
    type: method,
    complete: function(xhr, text) {
      if (text === 'error') {
        // callback({
        //   msg: xhr.statusText
        // })
        // 缺少一个统一的错误处理
        console.log('error....')
      } else {
        var resp = $.parseJSON(xhr.responseText)
        if (resp.bool) {
          bag.set('data', resp.data)
          callback()
        } else {
          bag.set('data', '')
          callback()
          // callback({
          //   msg: resp.message
          // })
          // console.log('error....')
        }
      }
    }
  })
})

module.exports = Service
