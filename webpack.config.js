const path = require('path')

module.exports = {
  context: path.resolve(__dirname, '.'),
  entry: {
    index: './src/index.ts',
    createNewPost: './src/createNewPost.ts',
    uploadImage: './src/uploadImage.ts',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
}
