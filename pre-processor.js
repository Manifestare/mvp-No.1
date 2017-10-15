const less = require('less')
const path = require('path')
console.log('hello')
module.exports = (data, filename) => {
  console.log('PROCESSING CSS')
  console.log('filename:', filename)
  let n
  less.render(data, {
    syncImport: true,
    filename: path.resolve(filename)
  }, (err, output) => {
    if(err) console.log('preprocess error:', err)
    n = output.css
  })
  return n
}
