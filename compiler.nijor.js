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
        NijorCompiler(__dirname),
        babel.babel({ babelHelpers:'bundled',presets:['@babel/preset-env']}),
        terser.terser()
    ]
};
const outputOptions = {
    file:'app/static/app.js',
    format:'iife',
};
async function build() {
  console.log(`Nijor: Compiling the files.`);
  const bundle = await rollup.rollup(inputOptions);
  const { output } = await bundle.generate(outputOptions);
  for (const chunkOrAsset of output) {
    if (chunkOrAsset.type === 'asset') {
    } else {
    }
  }
  await bundle.write(outputOptions);
  await bundle.close();
  console.log(`Nijor: Compiled all files successfully.`);
}
let globalStyles = fs.readFileSync('./src/styles/style.scss','utf-8');
let cssStyle = sass.renderSync({
    data:globalStyles,
    outputStyle:'compressed'
});
globalStyles = cssStyle.css.toString();
fs.writeFileSync('./app/static/style.css',globalStyles);
build();
