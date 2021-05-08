var { getOptions } = require('loader-utils')
var child_process = require('child_process')
var simpleCopy = require('./simpleCopy')
const path = require('path')
module.exports = function loader(source) {
  var callback = this.async()
  child_process.exec("echo '" + this.resourcePath + "' >> files.txt")
  var resourcePath = this.resourcePath
  console.log(' ', resourcePath)
  const options = getOptions(this)
  const { toRoot, fromRoot = process.cwd() } = options
  const tarPath = path.join(process.cwd(), toRoot, path.relative(fromRoot, resourcePath))
  simpleCopy(
    resourcePath,
    tarPath,
    source,
    function(err, result, sourceMaps, ast) {
      callback(err, source, sourceMaps, ast)
    }
  )
}
