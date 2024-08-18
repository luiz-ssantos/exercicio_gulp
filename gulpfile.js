const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");

let imageminMozjpeg, imageminOptipng, imageminSvgo, imageminGifsicle;

async function loadImageminPlugins() {
  imageminMozjpeg = (await import("imagemin-mozjpeg")).default;
  imageminOptipng = (await import("imagemin-optipng")).default;
  imageminSvgo = (await import("imagemin-svgo")).default;
  imageminGifsicle = (await import("imagemin-gifsicle")).default;
}
async function comprimirImagens() {
  await loadImageminPlugins();

  return gulp
    .src("./src/imgs/**/*")
    .pipe(
      imagemin([
        imageminGifsicle({ interlaced: true }),
        imageminMozjpeg({ quality: 75, progressive: true }),
        imageminOptipng({ optimizationLevel: 5 }),
        imageminSvgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(gulp.dest("./dist/imgs"));
}

function compilarSass() {
  return gulp
    .src("./src/styles/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(cleanCSS())
    .pipe(gulp.dest("./dist/styles"));
}

function comprimirJavaScript() {
  return gulp
    .src("./src/scripts/**/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("./dist/scripts/js"));
}

// Função de watch para monitorar mudanças
function watchFiles() {
  gulp.watch("./src/styles/**/*.scss", compilarSass);
  gulp.watch("./src/imgs/**/*", comprimirImagens);
  gulp.watch(".src/scripts/**/*.js", comprimirJavaScript);
}

// Exporta as funções para uso
exports.compilarSass = compilarSass;
exports.comprimirImagens = comprimirImagens;
exports.comprimirJavaScript = comprimirJavaScript;
exports.watch = watchFiles;
exports.default = gulp.parallel(
  watchFiles,
  compilarSass,
  comprimirImagens,
  comprimirJavaScript
);
