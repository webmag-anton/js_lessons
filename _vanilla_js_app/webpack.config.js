const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
   entry: './src/app.js',
   output: {
      // [chunkhash] - что бы не кешировалось название бандла в браузере
      filename: 'bundle.[chunkhash].js', 
      // глобальный путь до текущей дирректории (__dirname), складываем в public
      path: path.resolve(__dirname, 'public')
   },
   // ------- ^ базовая настройка (без [chunkhash]), достаточная для бандлинга с помощью ES6 imports
   devServer: {
      port: 3000
   },
   plugins: [
      new HTMLPlugin({
         template: './src/index.html'
      }),
      new CleanWebpackPlugin()
   ],
   module: {
      rules: [
         {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader']
         },
      ],
  }
}