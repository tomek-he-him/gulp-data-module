var dataModule = require('data-module');
var gutil = require('gulp-util');
var through2 = require('through2');

var DataModuleError = gutil.PluginError.bind(null, 'gulp-data-module');


var gulpDataModule = function gulpDataModule (options) { 'use strict';
    if (!options) options = {};

    var dataModuleOptions = {};
    if (typeof options.formatting == 'function') {
        dataModuleOptions.formatting = options.formatting;
        }

    return through2.obj(function dataModuleStream (file, encoding, done) {
        if (file.isBuffer()) {
            file.contents = dataModule
                ( file.contents.toString()
                , dataModuleOptions
                ).toBuffer();
            file.path = file.path.replace(/(?:\.[^\/\\\.]$|$)/, '.js');
            }

        else if (file.isStream()) return done(new DataModuleError
            ( 'Streams not supported'
            ));

        this.push(file);
        return done();
        });
    };


gulpDataModule.formatting =
    { diffy: dataModule.diffy
    };


module.exports = gulpDataModule;
