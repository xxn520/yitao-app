/*

 Default Gruntfile for AppGyver Steroids
 http://www.appgyver.com
 Licensed under the MIT license.

 */

module.exports = function(grunt) {
    grunt.initConfig({
        copy: {
            main: {
                expand: true,
                cwd: './',
                src: ["import.html"],
                dest: "bower_components/supersonic/components/",
                flatten: true,
                filter: 'isFile',
            },
        },
        concat: {
            options: {
                separator: ";\n"
            },
            dist: {
                src: [
                    "bower_components/angular-local-storage/dist/angular-local-storage.js",
                    "bower_components/js-base64/base64.js",
                    "bower_components/angular-touch/angular-touch.js",
                    "bower_components/angular-carousel/dist/angular-carousel.js",
                    "bower_components/lodash/lodash.js",
                    "bower_components/restangular/dist/restangular.js",
                    "bower_components/angular-inview/angular-inview.js",
                    "bower_components/ngCordova/dist/ng-cordova.min.js",
                    "bower_components/blueimp-canvas-to-blob/js/canvas-to-blob.js",
                    "bower_components/me-lazyload/me-lazyload.js",
                ],
                dest: "bower_components/default/scripts/default.js"
            }
        },
        cssmin: {
            options: {
                keepSpecialComments: 0
            },
            compress: {
                files: {
                    'bower_components/default/styles/default.css': [
                        "app/common/stylesheets/application.css",
                        "bower_components/angular-carousel/dist/angular-carousel.css"
                    ]
                }
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            dist: {
                files: {
                    'bower_components/default/scripts/default.min.js': 'bower_components/default/scripts/default.js'
                }
            }
        }
    });
    grunt.loadNpmTasks("grunt-steroids");
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask("default", [
        'copy', 'concat', 'uglify', 'cssmin', "steroids-make-fresh"
    ]);
}
