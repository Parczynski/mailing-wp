const { src, dest, task, series } = require("gulp")
const wpPot = require( 'gulp-wp-pot' )
const replace = require( 'gulp-replace' )

const tag = require('child_process')
  .execSync('git describe')
  .toString().trim().replace( 'v', '' )

console.log( 'BUILDING', {tag})
const copy = _ => {
    return src( [ './admin/*', './includes/**/*', './templates/*', './*.php', './*.txt' ], { base: './' } )
        .pipe( 
            replace( 'v0.0.0', tag )
        )
        .pipe( 
            dest( 'build' )
        )
}

const pot = _ => {
    return src( [ '**/*.php' ] )
        .pipe( 
            wpPot( {
                domain: 'mailing_plugin',
                package: 'mailing'
            })
        )
        .pipe(
            dest( 'build/languages/mailing.pot' )
        )
}

const build = series( pot, copy )

module.exports = { copy, build, pot }