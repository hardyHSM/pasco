var gulp =				require('gulp');
var browserSync = 		require("browser-sync");
var gutil = 			require("gulp-util");
var concat = 			require('gulp-concat');
var concatCss = 		require('gulp-concat-css');
var cleanCSS = 			require('gulp-clean-css');
var autoprefixer = 		require("gulp-autoprefixer");
var jsmin = 			require('gulp-jsmin');
var rename = 			require('gulp-rename');
var sass = 				require('gulp-sass');
var htmlmin =           require('gulp-htmlmin');
var svgmin = 			require('gulp-svgmin');
var imagemin = 			require('gulp-imagemin');
var spritesmith = 		require('gulp.spritesmith');
var	gutil =  			require('gulp-util');
var	svgSprite = 		require('gulp-svg-sprite');
var	size= 				require('gulp-size');
var cheerio =           require("gulp-cheerio");
var replace = 			require("gulp-replace");
var gcmq = 				require('gulp-group-css-media-queries');
 

// var sassGlob = 			require('gulp-sass-glob');




var config = {
	root: "./app",
	dist: "./dist",
	html: {
		src: "index.html"
	},
	css: "/css",
	sasstype: "sass",
	sass: {
		src: '/sass'
	},
	img: {
		compl: '/img__templ',
		src: '/img'
	},
	js: {
		src: "/js",
		temp: '/js__templ'
	},
	fonts: {
		src: '/fonts'
	},
	libs: {
		src: '/libs'
	}
}




// gulp watch on def
gulp.task("default", ["watch"]);

// SVG

gulp.task('svgmin', function () {
    return gulp.src(config.root + config.img.compl + '/**/*.svg')
        .pipe(svgmin())
        .pipe(gulp.dest(config.root + config.img.src + '/'));
});

// png ang jpeg

gulp.task('imgmin', function () {
     return gulp.src([config.root + config.img.compl +'/**/*.*', '!' + config.root + config.img.compl + '/**/*.svg'])
        .pipe(imagemin())
        .pipe(gulp.dest(config.root + config.img.src +'/'))
});



// SASS
gulp.task('sass', function () {
  return gulp.src(config.root + config.sass.src +'/**/*.'+config.sasstype)
	// .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(config.root + config.css + '/'))
	.pipe(browserSync.reload({stream: true}));
});


 
// sprite png
		gulp.task('sprite', function () {
		  var spriteData = gulp.src(config.root + config.img.src + '/**/*.png').pipe(spritesmith({
			imgName: 'sprite.png',
			cssName: '_sprite.sass',
			imgPath: '../img/sprite/sprite.png',
			
		  }));
		spriteData.css.pipe(gulp.dest(config.root + config.sass.src + '/'));
		spriteData.img.pipe(gulp.dest(config.root + config.img.src + '/sprite'));
});

 

// SERVER
gulp.task('server', function() {
    browserSync.init({
      port: 8080,
      notify: false,
      browser: 'opera',
    	server : {
    		baseDir: config.root
    	}
    });
});

// HTML MIN

 
gulp.task('htmlminify', function() {
   return gulp.src(config.root + '/*.html')
     .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(config.dist + '/'));
 });
	  
// JS CONCAT
gulp.task('js', function() {
  return gulp.src(config.root + config.js.temp +'/*.js')
    .pipe(concat('main.js'))
	.pipe(jsmin())
	.pipe(gulp.dest(config.root + config.js.src))
	.pipe(browserSync.reload({stream: true}));
});

// CSS

gulp.task('css', function () {
	console.log("cssTRUE");
		return gulp.src(config.root + config.css +'/**/*.css')
		.pipe(concatCss("main.css"))
		.pipe(gcmq())
		.pipe(cleanCSS({compatibility: 'ie9'}))
		.pipe(autoprefixer())
		.pipe(gulp.dest(config.dist + config.css));

});

// SVG SPRITE
 gulp.task('svg-sprite', function () {
        return gulp.src(config.root + config.img.src + '/**/*.svg')
            .pipe(cheerio({
                run: function($) {
                    $('[fill]').removeAttr('fill');
                    $('[stroke]').removeAttr('stroke');
                    $('[style]').removeAttr('style');
                },
                parserOptions: { xmlMode: true }
            }))
            .pipe(replace('&gt;', '>'))
            .pipe(svgSprite({
                mode: {
                    symbol: {
                        sprite: "../sprite.svg"
                    }
                }
            }))
            .pipe(gulp.dest(config.root + config.img.src + '/'));
    });

 gulp.task('replace', function () {
	 gulp.src(config.root + config.img.src + "/**/*.*")
		.pipe(gulp.dest(config.dist + config.img.src))
	gulp.src(config.root + config.js.src + "/**/*.*")
		.pipe(gulp.dest(config.dist + config.js.src))
	gulp.src(config.root + config.fonts.src + "/**/*.*")
		.pipe(gulp.dest(config.dist + config.fonts.src))
	gulp.src(config.root + config.libs.src + "/**/*.*")
		.pipe(gulp.dest(config.dist + config.libs.src));
 });	

gulp.task("dist", ["replace","js", "css", "htmlminify"]);
 
gulp.task('watch', ["server"], function(){
  gulp.watch(config.root + config.sass.src + '/**/*.' + config.sasstype, ['sass']);
  browserSync.watch("./**/*.html").on("change", browserSync.reload);
});

