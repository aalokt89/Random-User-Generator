var gulp = require('gulp');
var run  = require('gulp-run-command').default;
var runSequence = require('run-sequence');

var scriptPath = 'public/scripts.js';
var jsonPath = 'https://my-user-generator.firebaseapp.com/users.json';

gulp.task('build', function(callback) {
  runSequence('runScript', 'deployFB', 'openSite', callback);
});

gulp.task('runScript', run('node ' + scriptPath));
gulp.task('deployFB', run('firebase deploy'));
gulp.task('openSite', run('open ' + jsonPath));
