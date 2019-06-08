module.exports = {
  entry: {
    app: './src/app.js'
  },
  module: {
    rules: [
      {
        test: /\.(js$)|(jsx$)/,
        loader: 'babel-loader',
        exclude: [/node_modules/],
        query: {
          presets: ['es2017']
        }
      },
      {
        test: /\.(csv)$/,
        loader: 'csv-loader',
        options: {
          header: true,
          dynamicTyping: true
        }
      }
    ]
  },
  devServer: {
    stats: {
      warnings: false
    }
  },
  output: {
    filename: 'bundle.js'
  },

  devtool: 'source-maps'
};
