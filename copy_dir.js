const copydir = require('copy-dir')
const fs = require('fs')

console.log('--------------------------------------------')

console.log('copying.....resources')
const output = '../backend/src/main/resources/static/';
const exist = fs.existsSync(output)
if (!exist) {
    fs.mkdirSync(output, {recursive: true})
}


console.log('copying.....index.peb')
copydir.sync('build/', output, {
    cover: true
})

fs.unlink(`${output}/index.html`, ()=> {
    fs.copyFileSync('build/index.html', '../backend/src/main/resources/templates/index.peb');
    console.log('Done...')
});

