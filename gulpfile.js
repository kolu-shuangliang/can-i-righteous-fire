var gulp = require( 'gulp' );
var sass = require( 'gulp-sass' );
var autoprefixer = require( 'gulp-autoprefixer' );

gulp.task( 'default', function(){
	
	gulp.watch( 'sass/**/*.scss', [ 'styles' ] )
		.on( 'change', function( event ){
			console.log( 'File' + event.path + ' was ' + event.type + ', running tasks...' );
		} );
	
} );

gulp.task( 'styles', function(){
	
	gulp.src( 'sass/**/*.scss' )
		.pipe( sass().on( 'error', sass.logError ) )
		.pipe( autoprefixer({
			browsers: [ 'last 2 versions' ]
		}) )
		.pipe( gulp.dest( './css' ) );
	
} );