const { override, addWebpackAlias,} = require('customize-cra');
const path = require('path');
const jsconfig  =  require('./jsconfig.json');
const aliases = {};

for(const [key, value] of Object.entries(jsconfig.compilerOptions.paths) ){
        const rekey = key.replace('/*','');
        let revalue = value.join('').replace('/*','');
        revalue = (revalue === 'src' ? revalue : `src/${revalue}`);
        aliases[rekey] = path.resolve(__dirname, revalue);
}


module.exports = override(
    addWebpackAlias(aliases)
);



