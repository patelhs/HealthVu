var dest = './dist';
var src = './src';
var gutil = require('gulp-util');
var debug = false;

module.exports = {
  server: {
    settings: {
      root: dest,
      host: 'localhost',
      port: 8080,
      livereload: {
        port: 35929
      }
    }
  },
  sass: {
    src: src + '/styles/**/*.{sass,scss,css}',
    dest: dest + '/styles',
    settings: {
      indentedSyntax: false, // Enable .sass syntax?
      imagePath: '/images' // Used by the image-url helper
    }
  },
  browserify: {
    settings: {
      transform: ['babelify', 'reactify']
    },
    src: src + '/js/index.jsx',
    dest: dest + '/js',
    outputName: 'build.js',
    debug: gutil.env.type === 'dev'
  },
  html: {
    src: 'src/index.html',
    dest: dest
  },
  manualjs: {
    src: src + '/manualjs/*.js',
    dest: dest + '/manualjs'
  },
  images: {
    src: src + '/styles/assets/images/*.*',
    dest: dest + '/styles/images'
  },
  watch: {
    src: 'src/**/*.*',
    tasks: ['build']
  }
};
