module.exports = function(grunt){

   "use strict";
   require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        // This line makes your node configurations available for use
        pkg: grunt.file.readJSON('package.json'),


        devUpdate: {
                main: {
                    options: {
                        updateType: 'report', //just report outdated packages
                        reportUpdated: false, //don't report up-to-date packages
                        semver: true, //stay within semver when updating
                        packages: {
                            devDependencies: true, //only check for devDependencies
                            dependencies: false
                        },
                        packageJson: null, //use matchdep default findup to locate package.json
                        reportOnlyPkgs: [] //use updateType action on all packages
                    }
                }
            },


        //Clean out the distrubution directory
        clean: ['dist/'],

        sass: {

            // Sass development options
            dev: {
                options: {
                    style: 'expanded',
                    lineNumbers: true
                },
                files: {
                  'dist/css/style.css': 'src/sass/style.scss'
                }
            },

            // Sass distribution options
            dist: {
                options: {
                  style: 'compressed'
                },
                files: {
                  'dist/css/style.css': 'src/sass/style.scss'
                }
            }

        },

        cssmin: {
            options: {
                banner: '/* minified css file */',
                report: 'min'
            },
            build: {
                src: 'dist/css/style.css',
                dest: 'dist/css/style.css'
            }
        },


        concat: {
            js: {
                // options: {
                //     separator: ';'
                // },
                src: [
                    'src/js/*.js'
                ],
                dest: 'dist/js/rm.js'
            }
        },

        copy: {
          fonts: {
            expand: true,
            cwd: 'src/fonts/',
            src: '**',
            dest: 'dist/fonts/',
            flatten: true,
            filter: 'isFile',
          },
          vids: {
            expand: true,
            cwd: 'src/vids/',
            src: '**',
            dest: 'dist/vids/',
            flatten: true,
            filter: 'isFile',
          },
          index: {
            expand: true,
            cwd: 'src/',
            src: 'index.html',
            dest: 'dist/',
            filter: 'isFile',
          },
        },

        uglify: {
            dist: {
                files: {
                    'dist/js/rm.js': ['dist/js/rm.js']
                }
            }
        },

        imagemin: {
            static: {                          // Target
              options: {                       // Target options
                optimizationLevel: 3,
                pngquant : true
              },
              files: [{
                expand: true,                  // Enable dynamic expansion
                cwd: 'src/img/',               // Src matches are relative to this path
                src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
                dest: 'dist/img'               // Destination path prefix
              }]
            }
        },

        staticinline: {
            main: {
                options: {
                    basepath: 'dist/'
                },
                files: {
                    'dist/index.html':'dist/index.html'
                }
            }
        },

        watch: {
            js: {
                files: ['src/js/**/*.js'],
                tasks: ['concat:js','copy:index','staticinline']
            },
            css: {
                files: ['src/sass/**/*.scss'],
                tasks: ['sass:dev','copy:index','staticinline']
            },
            img: {
                files: ['src/img/**/*'],
                tasks: ['imagemin']
            },
            html: {
                files: ['src/**/*.html'],
                tasks: ['copy:index','staticinline']
            }
        }

    });

    grunt.registerTask('default', ['clean','copy','sass:dev','concat','imagemin','staticinline']);

    grunt.registerTask('dist', ['clean','copy','concat','sass:dist','cssmin','imagemin','uglify','staticinline']);

    grunt.registerTask('prod', ['clean','copy','concat','sass:dist','cssmin','imagemin','staticinline']);

};
