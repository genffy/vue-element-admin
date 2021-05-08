const { getOptions } = require('loader-utils')
const path = require('path')
const child_process = require('child_process')
const simpleCopy = require('./simpleCopy')
const compiler = require('vue-template-compiler')
module.exports = function loader(source) {
  const resourcePath = this.resourcePath
  const options = getOptions(this)
  const { toRoot, fromRoot = process.cwd() } = options
  const ast = compiler.parseComponent(source, { pad: 'line' })
  // 获取css的依赖
  ast.styles.map(style => {
    // 移除掉注释
    // eg: /* @import '//at.alicdn.com/t/font_1776686_mw0jz39v97.css'; */
    const commentReg = new RegExp('(/\\\*([^*]|[\\\r\\\n]|(\\\*+([^*/]|[\\\r\\\n])))*\\\*+/)|(//.*)', 'g')
    const sc = style.content.trim().replace(commentReg, '\n')
    const reg = /@import.*$/gim
    const importArr = sc.match(reg)
    if (Object.prototype.toString.call(importArr).slice(8, -1) === 'Array') {
      importArr.forEach(item => {
        const ic = item.split(' ')[1].replace(';', '').replace(/'/gi, '"')
        let icKey
        try {
          icKey = JSON.parse(ic)
        } catch (err) {
          console.log(item, ic)
          console.log(err)
        }
        if (icKey) {
          const lessfilePath = path.resolve(path.dirname(resourcePath), icKey)
          const tarPath = path.join(process.cwd(), toRoot, path.relative(fromRoot, lessfilePath))
          child_process.exec("echo '" + lessfilePath + "' >> files.txt")
          simpleCopy(
            lessfilePath,
            tarPath,
            null,
            null
          )
        }
      })
    }
  })
  return source
}
