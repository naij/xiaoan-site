var nodeless  = require('less')
var path      = require('path')
var Stream    = require('stream')
var normalize = path.normalize
var resolve   = path.resolve
var dirname   = path.dirname
var join      = path.join

function coless(body, config) {
  return function(cb) {
    nodeless.render(body, config, function (err, css) {
      if (err) {
        return cb(err)
      }
      cb(null, css.css)
    })
  }
}

function less(opts) {
  return function *less(next) {
    yield next

    var body = this.body.toString()

    if (body == 'Not Found') {
      throw new Error('路径：' + this.path + ' 对应的文件没有找到')
    }

    var path = this.path
    var root = this.app.root
    root = normalize(resolve(root))
    path = normalize(join(root, path))
    path = dirname(path)

    opts = opts || {}
    opts.paths = [path]
    
    this.body = yield coless(body, opts)
    this.type = 'text/css'
  }
}

module.exports = less