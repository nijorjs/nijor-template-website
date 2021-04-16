const rollup = require('rollup');
const includePaths = require('rollup-plugin-includepaths');
const babel = require('@rollup/plugin-babel');
const terser = require('rollup-plugin-terser');
const fs = require('fs');
const path = require('path');
const sass = require('sass');
const NijorCompiler = require('@nijor/nijor-rollup-plugin');
const srcPath = path.join(__dirname,'src');
let includePathOptions = {
    include: {
        'nijor':path.join(__dirname,'node_modules/@nijor/nijor/src/nijor.js'),
        'nijor/components':path.join(__dirname,'node_modules/@nijor/nijor/src/components.js'),
        'nijor/router':path.join(__dirname,'node_modules/@nijor/nijor/src/router.js'),
        'nijor/#router':path.join(__dirname,'node_modules/@nijor/nijor/src/hashrouter.js'),
        'nijor/requests':path.join(__dirname,'node_modules/@nijor/nijor/src/requests.js'),
        'nijor/views':path.join(__dirname,'node_modules/@nijor/nijor/src/views.js'),
        'nijor/events':path.join(__dirname,'node_modules/@nijor/nijor/src/events.js')
    },
    paths: [srcPath],
    external: [],
    extensions: ['.js','.nijor']
};
const inputOptions = {
    input:'src/App.js',
    plugins:[
        includePaths(includePathOptions),
        NijorCompiler(__dirname,includePathOptions),
        //babel.babel({ babelHelpers:'bundled',presets:['@babel/preset-env']}),
        terser.terser()
    ]
};
const outputOptions = {
    file:'app/static/app.js',
    format:'es',
};
async function build() {
  const bundle = await rollup.rollup(inputOptions);
  const { output } = await bundle.generate(outputOptions);
  for (const chunkOrAsset of output) {
    if (chunkOrAsset.type === 'asset') {
    } else {
    }
  }
  await bundle.write(outputOptions);
  await bundle.close();
  console.log('Nijor Compilation Successfull !');
}
let globalStyles = fs.readFileSync('./src/styles/style.scss','utf-8');
let cssStyle = sass.renderSync({
    data:globalStyles,
    outputStyle:'compressed'
});
globalStyles = cssStyle.css.toString();
let fn_Nijorview = `
    function fn_Nijorview(element){
        var model=element.getAttribute('n-model');
        var newVal;
        if(element.tagName==="INPUT"){newVal = element.value;}
        else{
            newVal=element.innerHTML;
        }
        document.querySelectorAll('nijorview[view="'+model+'"]').forEach(function(child){child.innerHTML=newVal;})
    }
`.replace(/\s+/g,' ').trim();
fs.writeFileSync('./app/static/script.js',`"use strict";${fn_Nijorview}`);
fs.writeFileSync('./app/static/style.css',globalStyles);
build();