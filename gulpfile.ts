// declare function require(x: string): any;

import { src, dest, task, watch } from 'gulp';
import * as sourcemaps from 'gulp-sourcemaps';
import * as sass from "gulp-sass";
import * as babel from 'gulp-babel';
import * as concat from 'gulp-concat';
import * as ts from 'gulp-typescript';

const tsProject = ts.createProject({});

task("html", (done) => {
    src("src/**/*.html")
        .pipe(dest("dist"));
    done();
});

task("ts", (done) => {
    src("src/**/*.ts")
        .pipe(tsProject().on('error', () => { done() }))
        .pipe(babel())
        .pipe(concat("index.js"))
        .pipe(dest("dist"));
    done();
});

task("sass", (done) => {
    src("src/**/*.scss")
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(dest("dist"));
    done();
});

task("default", () => {
    watch("src/**/*.ts", task("ts"));
    watch("src/**/*.html", task("html"));
    watch("src/**/*.scss", task("sass"));
})

