const { task, src, dest, series, watch, parallel } = require('gulp');

const rm = require('gulp-rm');
const browserSync = require('browser-sync').create();

const fileinclude = require('gulp-file-include');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');

/* const sass = require('gulp-sass'); */
const sass = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob');

const sourcemaps = require('gulp-sourcemaps');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');

const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

const imagemin = require('gulp-imagemin');

sass.compiler = require('node-sass');

task('clean:build', () => {
	return src('./build/**/*', { read: false }).pipe(rm());
});

task('clean:docs', () => {
	return src('./docs/**/*', { read: false }).pipe(rm());
});

const plumberConfig = {
	errorHandler: notify.onError(function (err) {
		return {
			title: 'HTML include',
			sound: false,
			message: err.message,
		};
	}),
};


// html-страницы
task('html:build', () => {
	return src('./src/html/*.html')
		.pipe(plumber(plumberConfig))
		.pipe(fileinclude())
		.pipe(dest('./build/'))
		.pipe(browserSync.reload({ stream: true }));
});

task('html:docs', () => {
	return src('./src/html/*.html')
		.pipe(plumber(plumberConfig))
		.pipe(fileinclude())
		.pipe(dest('./docs/'));
});

// стилевые файлы
task('styles:build', () => {
	return src(['./node_modules/normalize.css/normalize.css', './src/scss/main.scss'])
		.pipe(sourcemaps.init())
		.pipe(concat('main.css'))
		.pipe(sassGlob())
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(dest('./build/css/'))
		.pipe(browserSync.reload({ stream: true }));
});

task('styles:docs', () => {
	return src(['./node_modules/normalize.css/normalize.css', './src/scss/main.scss'])
		.pipe(concat('main.css'))
		.pipe(sassGlob())
		.pipe(sass().on('error', sass.logError))
		.pipe(gcmq())
		.pipe(autoprefixer({ cascade: false }))
		.pipe(cleanCSS())
		.pipe(dest('./docs/css/'));
});

// шрифты
task('copy:font:build', () => {
	return src('./src/fonts/**/*')
		.pipe(dest('./build/fonts/'))
		.pipe(browserSync.reload({ stream: true }));
});

task('copy:font:docs', () => {
	return src('./src/fonts/**/*')
		.pipe(dest('./docs/fonts/'))
});

// скрипты
task('scripts:build', () => {
    return src(['./src/js/*.js'])
		.pipe(sourcemaps.init())
		.pipe(concat('main.js', { newLine: ';' }))
		.pipe(sourcemaps.write())
		.pipe(dest('./build/js/'))
		.pipe(browserSync.reload({ stream: true }));
    }
);

task('scripts:docs', () => {
    return src(['./src/js/*.js'])
		.pipe(concat('main.js', { newLine: ';' }))
		.pipe(
			babel({
				presets: ['@babel/env'],
			})
		)
		.pipe(uglify())
		.pipe(dest('./docs/js/'));
    }
);

task('copy:libs:build', () => {
	return src('./src/libs/**/*')
		.pipe(dest('./build/libs/'))
		.pipe(browserSync.reload({ stream: true }));
});

task('copy:libs:docs', () => {
	return src('./src/libs/**/*')
		.pipe(dest('./docs/libs/'))
});

// изображение и иконки
task('copy:img:build', () => {
    return src('./src/img/**/*')
		.pipe(dest('./build/img/'))
		.pipe(browserSync.reload({ stream: true }));
})

task('copy:img:docs', () => {
    return src('./src/img/**/*')
		.pipe(
			imagemin({
				progressive: true,
				interlaced: true,
			})
		)
		.pipe(dest('./docs/img/'));
})

// отслеживание изменения файлов
task('watch', () => {
    watch('./src/html/**/*.html', series('html:build'));
    watch('./src/scss/**/*.scss', series('styles:build'));
    watch('./src/js/**/*.js', series('scripts:build'));
    watch('./src/libs/**/*', series('copy:libs:build'));
    watch('./src/img/**/*', series('copy:img:build'));
	  watch('./src/font/**/*', series('copy:font:build'));
})

task('server:build', () => {
	browserSync.init({
		server: {
			baseDir: './build/',
		},
	});
});

task('server:docs', () => {
	browserSync.init({
		server: {
			baseDir: './docs/',
		},
	});
});

task(
	'default',
	series(
		'clean:build',
		parallel('html:build', 'styles:build', 'copy:font:build', 'scripts:build', 'copy:img:build', 'copy:libs:build'),
		parallel('server:build', 'watch')
	)
);

task(
	'docs',
	series(
		'clean:docs',
		parallel('html:docs', 'styles:docs', 'copy:font:docs', 'scripts:docs', 'copy:img:docs', 'copy:libs:docs'),
		parallel('server:docs')
	)
);
