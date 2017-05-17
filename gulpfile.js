'use strict';

const gulp = require('gulp'),
      sass = require('gulp-sass'),
      babel = require('gulp-babel'),
      concat = require('gulp-concat'),
      uglify = require('gulp-uglify');

// Define gulp tasks
gulp.task('js', () => {
    return gulp.src('js/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/assets'));
});

gulp.task('scss', () => {
    return gulp.src('scss/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('public/assets'))
});

gulp.task('default', ['scss', 'js'], ()=>{});

