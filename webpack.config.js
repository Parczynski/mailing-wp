const path = require("path");

const config = {
  entry: {
    app:"./assets-src/js/app.ts",
    dashboard:"./assets-src/js/dashboard.ts"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, 'assets' )
  },
  devServer: {
    static: path.join(__dirname, "assets"),
    port: 9000
  },
  mode: "development",
  module: {
    rules: [
      { 
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      { 
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  }
} 
module.exports = ( env, argv ) => {

  if( argv.mode === 'production' ) {
    config.output.path = path.resolve(__dirname, 'build/assets' )

  }

  return config
}