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
const nijor = require('@nijor/nijor');
const NijorCompiler = require('@nijor/nijor-rollup-plugin');
const srcPath = path.join(__dirname,'src');
const includePathOptions = {
    include: nijor,
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
    input:path.join(__dirname,'src/App.js'),
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
    file:path.join(__dirname,'app/static/app.js'),
    format:'es',
};
async function build() {
    var cssStyle = sass.renderSync({file:path.join(__dirname,'src/styles/style.scss'),outputStyle:'compressed'});
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