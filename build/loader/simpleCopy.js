const fs = require('fs')
const process = require('child_process')
const path = require('path')
function writePathFile(resourcePath, path, codes, cb) {
  createDirsSync2(path, function() {
    fs.copyFile(resourcePath, path, function(value) {
      process.exec("echo '" + path + "' >> success.txt", function() {
        cb && cb()
      })
    }, function() {
      process.exec("echo '" + path + "' >> fail.txt", function() {
        cb && cb()
      })
    })
  })
}

function createDirsSync2(dir, callback) {
  const dirStr = path.dirname(dir)
  if (!fs.existsSync(dirStr)) {
    fs.mkdirSync(dirStr, {
      recursive: true
    })
  }
  callback()
}
module.exports = writePathFile
