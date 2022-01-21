const path = require ('path')
const MiniCssPlugin = require('mini-css-extract-plugin');
const ImageMiniPlugin = require('image-minimizer-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin')
const { CleanWebPlugin } = require('clean-webpack-plugin');



module.exports ={
  mode: "development",
entry:'./src/index.js',
output: {
  path:path.resolve(__dirname,'build'),
  filename:"bundlle.min.js"
}, 
module: {
  rules: [
    {
      test:/\.css$/i,
      use:[MiniCssPlugin.loader, "css-loader"],
    },
    {
      test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
    },
    {
      test: /\.s[ac]ss$/i,
      use: [
        MiniCssPlugin.loader,
        "css-loader",
        "sass-loader",
      ],
    },
  ]
},
plugins: [
  new htmlPlugin(),
  new MiniCssPlugin({filename: "style.css",}),
  new ImageMiniPlugin({
    minimizerOptions:{
      plugins: [
        ['gifsicle', { interlaced: true }],
        ['mozjpeg', { quality: 60 }],
        ['mozjpeg', { quality: 60 }],
        [
          'svgo',
          {
            plugins: [
              {
                removeViewBox: false,
              },
            ],
          },
        ], 
      ]

    }
  }),
  new CleanWebPlugin()
, new CssMinimizerPlugin()
],
optimization: {
  minimize: true,
  minimizer: [
    "..."
  ]
}

}