const readSource = require('./readSource')
const fs = require('fs')
const path = require('path')

const sources = readSource()

fs.writeFileSync(
  path.join(__dirname, '_sourceCodes.json'),
  JSON.stringify(sources, null, 2)
)
