///
var pkg = require("./package.json")
  , gulp = require("gulp")
  , plumber = require("gulp-plumber")

///
// Lint JS
///
var jshint = require("gulp-jshint")
  , jsonFiles = [".jshintrc", "*.json"]
  , jsFiles = ["*.js", "src/**/*.js"]
gulp.task("scripts.lint", function() {
  gulp.src([].concat(jsonFiles).concat(jsFiles))
    .pipe(plumber())
    .pipe(jshint(".jshintrc"))
    .pipe(jshint.reporter("jshint-stylish"))
})

var jscs = require("gulp-jscs")
gulp.task("scripts.cs", function() {
  gulp.src(jsFiles)
    .pipe(plumber())
    .pipe(jscs())
})

gulp.task("scripts", ["scripts.lint", "scripts.cs"])

gulp.task("watch", function() {
  gulp.watch(jsFiles, ["scripts"])
})

gulp.task("dist", ["scripts"])
gulp.task("test", ["dist"])
gulp.task("default", ["test", "watch"])

var buildBranch = require("buildbranch")
gulp.task("publish", ["test"], function(cb) {
  buildBranch({folder: "src"}
  , function(err) {
      if (err) {
        throw err
      }
      console.log(pkg.name + " published.")
      cb()
    })
})
