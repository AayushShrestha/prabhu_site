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
                    style: 'expanded'
                },
                files: {
                    // the first path is the output and the second is the input
                    'dist/css/mystyle.css': 'styles/mystyle.scss'
                }
            },
            // this is the "production" Sass config used with the "grunt buildcss" command
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'dist/css/mystyle.css': 'styles/mystyle.scss'
                }
            }
        },
        copy: {
            fonts: {
                expand: true,
                cwd: 'node_modules/bootstrap-sass/assets/fonts/bootstrap/',
                src: ['**'],
                dest: 'fonts/bootstrap/'
            },
            bootstrapJs: {
                expand: true,
                cwd: 'node_modules/bootstrap/dist/js/',
                src: ['*.js'],
                dest: 'dist/lib/'
            },
            bootstrapCss: {
                expand: true,
                cwd: 'node_modules/bootstrap/dist/css/',
                src: ['bootstrap.min.css'],
                dest: 'dist/css/'
            },
            jquery: {
                expand: true,
                cwd: 'node_modules/jquery/dist/',
                src: ['jquery.min.js'],
                dest: 'dist/lib/'
            },
            popper: {
                expand: true,
                cwd: 'node_modules/popper.js/dist/umd/',
                src: ['popper.js'],
                dest: 'dist/lib/'
            },
            jqueryEasing: {
                expand: true,
                cwd: 'node_modules/jquery.easing/',
                src: ['jquery.easing.min.js'],
                dest: 'dist/lib/'
            }
        },
        watch: {
            scripts: {
                files: ["./scripts/**/*.*", "./styles/**/*.scss", "index.html"],
                tasks: ["browserify", "sass:dev"]
            }
        }
    });

    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks("grunt-contrib-copy");

    grunt.registerTask("default", ["browserify", "sass:dev", "copy", "watch"]);
    grunt.registerTask("build", ["browserify", "sass:dist", "copy"]);
};