var path = require('path')
var combineTool = require('magix-combine')

combineTool.config({
  // 包含html,css,js的模板目录
  tmplFolder: './',
  // 禁用Magix自身的局部刷新功能
  // 如果不禁用，则解析模板时会返回一个对象
  disableMagixUpdater: true,
  addEventPrefix: false
})

module.exports = function() {
  return function* combine(next) {
    yield next

    if (/sea\.js|boot\.js|\.json/.test(this.path)) return

    var body = this.body.toString()

    if (body == 'Not Found') {
      throw new Error('路径：' + this.path + ' 对应的文件没有找到')
    }
    // 对source进行加工，变成amd里面define的包裹格式
    if (!/define\s*\(\s*['"]\s*[\w\W]+['"]/.test(body) || /define\.amd/.test(body)) {
      var file = path.join(__dirname, '../', this.path)
      body = yield combineTool.processContent(file, '', body)
      body = body.content
    }

    this.body = body
  }
}