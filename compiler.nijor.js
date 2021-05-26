const rollup = require('rollup');
const includePaths = require('rollup-plugin-includepaths');
const {terser} = require('rollup-plugin-terser');
const fs = require('fs');
const path = require('path');
const sass = require('sass');
const {nodeResolve} = require('@rollup/plugin-node-resolve');
const cjs = require('@rollup/plugin-commonjs');
const image = require('@rollup/plugin-image');
const asyncFn = require('rollup-plugin-async');
const NijorCompiler = require('@nijor/nijor-rollup-plugin');
const srcPath = path.join(__dirname,'src');
const includePathOptions = {
    include: {
        'nijor':path.join(__dirname,'node_modules/@nijor/nijor/src/nijor.js'),
        'nijor/components':path.join(__dirname,'node_modules/@nijor/nijor/src/components.js'),
        'nijor/router':path.join(__dirname,'node_modules/@nijor/nijor/src/router.js'),
        'nijor/#router':path.join(__dirname,'node_modules/@nijor/nijor/src/hashrouter.js'),
        'nijor/requests':path.join(__dirname,'node_modules/@nijor/nijor/src/requests.js'),
        'nijor/views':path.join(__dirname,'node_modules/@nijor/nijor/src/views.js')
    },
    paths: [srcPath],
    external: [],
    extensions: ['.js','.nijor','.svg','.jpg','.png']
};
function Style(style){
    let cssStyle = sass.renderSync({
        data:style,
        outputStyle:'compressed'
    });
    return cssStyle.css.toString();
}
const compilerOptions = {
    styleSheet:path.join(__dirname,'app/static/style.css'),
    Style
}
const inputOptions = {
    input:'src/App.js',
    plugins:[
        includePaths(includePathOptions),
        nodeResolve(),
        cjs(),
        NijorCompiler(compilerOptions),
        asyncFn(),
        image(),
        terser()
    ]
};
const outputOptions = {
    file:'app/static/app.js',
    format:'es',
};
async function build() {
    let globalStyles = fs.readFileSync('./src/styles/style.scss','utf-8');
    const cssStyle = sass.renderSync({
        data:globalStyles,
        outputStyle:'compressed'
    });
    globalStyles = cssStyle.css.toString();
    fs.writeFileSync(compilerOptions.styleSheet,globalStyles);
    console.log(`Nijor: Compiling the files.`);
    const bundle = await rollup.rollup(inputOptions);
    await bundle.write(outputOptions);
    await bundle.close();
    const outputFile = fs.readFileSync(outputOptions.file,'utf-8');
    fs.writeFileSync(outputOptions.file,`;(function(){${outputFile}})();`);
    console.log(`Nijor: Compiled all files successfully.`);
}

build();