const { src, dest, parallel, watch } = require('gulp');
const sass = require('gulp-sass')(require('node-sass'));
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const concat = require('gulp-concat');


//utilidades css
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps')

//utilidades JS
const terser = require('gulp-terser-js');
const rename = require('gulp-rename');

const paths = {
    imagenes : 'src/img/**/*',
    scss : 'src/scss/**/*.scss',
    js: 'src/js/**/*.js',
}

//Funcion que compila SASS


function compilarSASS() {
    return src(paths.scss)
        .pipe( sourcemaps.init() )
        .pipe( sass() )
        .pipe(postcss( autoprefixer(), cssnano() ))
        .pipe( sourcemaps.write('.') )   
        .pipe(dest("./build/css"));
}

function javascript(){
    return src(paths.js)
        .pipe(sourcemaps.init())
        .pipe( concat('bundle.js') )
        .pipe( terser() )
        .pipe(sourcemaps.write('.'))
        .pipe( rename({suffix: '.min'}))
        .pipe( dest("./build/js") )

}
function watchFiles() {
    watch("./src/scss/**/*.scss", compilarSASS);
    watch(paths.js, javascript); // * = la carpeta actual ** = todos los archivos y todas las carpetas
}

function imagenes() {
    return src(paths.imagenes)
        .pipe( imagemin() )
        .pipe(dest('./build/img'))
        .pipe(notify({message: 'imagen minificada'}));
}

function verWebp(){
   return src(paths.imagenes)
       .pipe( webp() )
       .pipe(dest('./build/img'))
       .pipe(notify({message: 'Convertida a webp'}));
}

exports.compilarSASS = compilarSASS;
exports.imagenes = imagenes;
exports.watchFiles = watchFiles;
exports.verWebp = verWebp;
exports.javascript = javascript;

exports.default = parallel(compilarSASS, imagenes, watchFiles, javascript, verWebp);
exports.dev = parallel(compilarSASS, watchFiles, javascript)