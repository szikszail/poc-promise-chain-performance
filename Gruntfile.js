'use strict';

var path = require('path');

module.exports = function(grunt) {
    grunt.initConfig({
        env: {
            chrome: {
                PLATFORM: 'CHROME'
            },
            firefox: {
                PLATFORM: 'FIREFOX'
            }
        },

        exec: {
            run_cucumber_tests: {
                command: 'node ' + path.join('node_modules', 'cucumber',  'bin', 'cucumber.js -f pretty -t ~@ignore')
            }
        }

    });

    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-env');

    grunt.registerTask('chrome', ['env:chrome', 'exec']);
    grunt.registerTask('firefox', ['env:firefox', 'exec']);
};