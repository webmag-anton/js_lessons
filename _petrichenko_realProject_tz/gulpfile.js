'use strict'

const gulp = require('gulp')
const webpack = require('webpack-stream')    // для запуска webpack как потока, чтобы удобно интегрироваться с gulp
const browsersync = require('browser-sync')


const dist = './dist/'
// const dist = 'D:/Anton/OSPanel/domains/test'  // тестируем отправку форм и получение ответа на OpenServer

// копирует index.html в /dist без преобразований
gulp.task('copy-html', () => {
   return gulp.src('./src/index.html')
              .pipe(gulp.dest(dist))
              .pipe(browsersync.stream())
})

// копирует /assets из /src в /dist без преобразований
gulp.task('copy-assets', () => {
   return gulp.src('./src/assets/**/*.*')
              .pipe(gulp.dest(dist + '/assets'))
              .on('end', browsersync.reload)
})

// webpack собирает из src/js/main.js в dist/script.js в режиме разработки;
// вместо поля entry - gulp.src, вместо поля path в output - gulp.dest;
// без вотчинга (вотчим изменения галпом), с source-map, используем babel
gulp.task('build-js', () => {
   return gulp.src('./src/js/main.js')
               .pipe(webpack({
                  mode: 'development',
                  output: {
                     filename: 'script.js'
                  },
                  watch: false,
                  devtool: 'source-map',
                  module: {
                     rules: [
                        {
                           test: /\.m?js$/,
                           exclude: /(node_modules|bower_components)/,
                           use: {
                              loader: 'babel-loader',
                              options: {
                                 presets: [['@babel/preset-env', {
                                    debug: true,          // уведомляет про ошибки
                                    corejs: 3,            // 3 версия пакета core-js (corejs дополняет функционал babel полифилами)
                                    useBuiltIns: 'usage'  // использовать core-js для версий браузеров из browserslist в package.json
                                 }]]
                              }
                           }
                        }
                     ]
                  }
               }))
               .pipe(gulp.dest(dist))
               .on('end', browsersync.reload)
})

// следит за изменением всех файлов в /src с выполнением соответствующих тасков, запускает сервер на /dist
gulp.task('watch', () => {
   browsersync.init({
      server: './dist',
      port: 4000,
      notify: true
   })
   
   gulp.watch('./src/index.html', gulp.parallel('copy-html'))
   gulp.watch('./src/assets/**/*.*', gulp.parallel('copy-assets'))
   gulp.watch('./src/js/**/*.js', gulp.parallel('build-js'))
})

// для первой сборки при запуске gulp
gulp.task('build', gulp.parallel('copy-html', 'copy-assets', 'build-js'))

// webpack собирает из src/js/main.js в dist/script.js в режиме production
gulp.task('build-prod-js', () => {
   return gulp.src('./src/js/main.js')
               .pipe(webpack({
                  mode: 'production',
                  output: {
                     filename: 'script.js'
                  },
                  module: {
                     rules: [
                        {
                           test: /\.m?js$/,
                           exclude: /(node_modules|bower_components)/,
                           use: {
                              loader: 'babel-loader',
                              options: {
                                 presets: [['@babel/preset-env', {
                                    corejs: 3,
                                    useBuiltIns: 'usage'
                                 }]]
                              }
                           }
                        }
                     ]
                  }
               }))
               .pipe(gulp.dest(dist))
})

// дефолтный таск, запускается командой gulp
gulp.task('default', gulp.parallel('watch', 'build'))