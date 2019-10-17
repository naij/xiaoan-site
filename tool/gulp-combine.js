var fs = require('fs')
var through = require('through2')
var combineTool = require('magix-combine');

combineTool.config({
  prefix: 'mx',
  tmplFolder: './',
  loaderType: 'cmd',
  // 禁用Magix自身的局部刷新功能
  // 如果不禁用，则解析模板时会返回一个对象
  disableMagixUpdater: true,
  addEventPrefix: false
})

module.exports = function() {
  return through.obj(function(file, enc, cb) {
    combineTool.config({
      tmplFolder: file.cwd
    })
    var jsStr = file.contents.toString(enc)
    if (/define\(.*function\s*\(\s*require\s*(.*)?\)\s*\{/.test(jsStr)) {
      cb(null, file)
    } else {
      combineTool.processContent(file.path, '', jsStr).then(function(content) {
        file.contents = new Buffer.from(content.content);
        cb(null, file)
      })
    }
  })
}
