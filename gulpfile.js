var gulp = require('gulp');
var server = require('gulp-express');
 
gulp.task('server', function () {
    // Start the server at the beginning of the task 
    server.run(['bin/www']);
 
    // Restart the server when file changes 
    gulp.watch(['public/**/*.html'], server.notify);
    gulp.watch(['public/stylesheets/**/*.scss'], ['styles:scss']);
    //gulp.watch(['{.tmp,app}/styles/**/*.css'], ['styles:css', server.notify]); 
    //Event object won't pass down to gulp.watch's callback if there's more than one of them. 
    //So the correct way to use server.notify is as following: 
    gulp.watch(['{.tmp,app}/styles/**/*.css'], function(event){
        gulp.run('styles:css');
        server.notify(event);
        //pipe support is added for server.notify since v0.1.5, 
        //see https://github.com/gimm/gulp-express#servernotifyevent 
    });
 
    gulp.watch(['public/javascripts/**/*.js'], ['jshint']);
    gulp.watch(['public/images/**/*'], server.notify);
    gulp.watch(['lib/**/*.js'], [server.run]);
    gulp.watch(['app.js', 'routes/**/*.js'], [server.run]);
});

gulp.task('default', ['server']);