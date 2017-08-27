module.exports = function (grunt) {
    grunt.initConfig({
        browserify: {
            dist: {
                options: {
                    transform: [
                        ["babelify", {
                            presets: ["es2015"]
                        }]
                    ]
                },
                files: {
                    "./dist/app.js": ["./scripts/*.js"]
                }
            }
        },
        sass: {
            // this is the "dev" Sass config used with "grunt watch" command
            dev: {
                options: {
                    style: 'expanded',
                    // tell Sass to look in the Bootstrap stylesheets directory when compiling
                    loadPath: 'node_modules/bootstrap-sass/assets/stylesheets'
                },
                files: {
                    // the first path is the output and the second is the input
                    'dist/css/mystyle.css': 'styles/mystyle.scss'
                }
            },
            // this is the "production" Sass config used with the "grunt buildcss" command
            dist: {
                options: {
                    style: 'compressed',
                    loadPath: 'node_modules/bootstrap-sass/assets/stylesheets'
                },
                files: {
                    'dist/css/mystyle.css': 'styles/mystyle.scss'
                }
            }
        },
        concat: {
            bootstrap: {
                src: ['node_modules/bootstrap-sass/assets/javascripts/bootstrap/*.js'],
                dest: 'dist/lib/bootstrap.js'
            }
        },
        copy: {
            fonts: {
                expand: true,
                cwd: 'node_modules/bootstrap-sass/assets/fonts/bootstrap/',
                src: ['**'],
                dest: 'fonts/bootstrap/'
            }
        },
        watch: {
            scripts: {
                files: ["./scripts/**/*.*", "./styles/**/*.scss"],
                tasks: ["browserify", "sass:dev"]
            }
        }
    });

    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-copy");

    grunt.registerTask("default", ["browserify", "sass:dev", "concat", "copy", "watch"]);
    grunt.registerTask("build", ["browserify", "sass:dist", "concat", "copy"]);
};