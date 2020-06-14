import gulp from 'gulp';
import del from 'del';
import sass from 'gulp-sass';
import minify from 'gulp-csso';
import autoprefixer from 'gulp-autoprefixer';
import gPages from 'gulp-gh-pages';
import ws from 'gulp-webserver';

sass.compiler = require('node-sass');

const routes = {
  css: {
    watch: 'src/scss/*',
    src: 'src/scss/index.scss',
    dest: 'dist/css',
    del: 'dist/css/*',
  },
  img: {
    src: 'src/img/*',
    dest: 'dist/img',
  },
  html: {
    src: 'src/*.html',
    dest: 'dist/',
    del: 'dist/*.html',
  },
};
const clean = () => del([routes.css.del, routes.html.del]);
const html = () => gulp.src(routes.html.src).pipe(gulp.dest(routes.html.dest));
const img = () => gulp.src(routes.img.src).pipe(gulp.dest(routes.img.dest));

const styles = () =>
  gulp
    .src(routes.css.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({ flexbox: true, grid: 'autoplace' }))
    .pipe(minify())
    .pipe(gulp.dest(routes.css.dest));

const watch = () => {
  gulp.watch(routes.css.watch, styles);
  gulp.watch(routes.html.src, html);
  gulp.watch(routes.img.src, img);
};

const ghPages = () => gulp.src('dist/**/*').pipe(gPages());
const webserver = () =>
  gulp.src('dist').pipe(
    ws({
      livereload: true,
      open: true,
    })
  );

const prepare = gulp.series([clean]);
const assets = gulp.series([html, styles, img]);
const live = gulp.series([webserver, watch]);

const build = gulp.series([prepare, assets]);

export const dev = gulp.series([prepare, assets, live]);
export const deploy = gulp.series([build, ghPages]);
