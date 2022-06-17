const { join, resolve } = require("path");


process.env.WP_ENTRY = JSON.stringify({ 
  subscribe: join(__dirname, "assets-src/js/gutenberg/subscribe/subscribe.ts"),
  newsletter: join(__dirname, "assets-src/js/gutenberg/newsletter/newsletter.ts"),
});


const config = require("@wordpress/scripts/config/webpack.config");
config.output = {
  filename: '[name].js',
  path: resolve( process.cwd(), 'assets/gutenberg' ),
}
config.resolve.extensions = config.resolve.extensions ?? []
config.resolve.extensions.push( '.tsx', '.ts', '.js' )
config.module.rules.push( {
  test: /\.tsx?$/,
  use: 'ts-loader',
  exclude: /node_modules/,
})
module.exports = ( env, argv ) => {

  if( argv.mode === 'production' ) 
    config.output.path = resolve( process.cwd(), 'build/assets/gutenberg' )

  return config
}