var webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var config = {
    // TODO: Add common Configuration
    module: {},
};
module.sorceEnable = false;

returnAll = watchFile => {

var ampHomePageConfig = Object.assign({}, config, {
  entry: "./javascript/amp-homepage.js",  
  watch: true,
  output: {
    path: __dirname,
    filename: "theme/assets/amp-homepage.js"
  },
  module: {     
    rules: [  
    {
      test: /\.scss$/,
      use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: __dirname  
        }
      },
      "css-loader",
      "sass-loader"
      ]
    }    
    ]  
  },
  plugins: [
  new MiniCssExtractPlugin({
    filename: "theme/snippets/amp-homepage.liquid"
  })   
  ]
});

var ampAhmedabadStudioConfig = Object.assign({}, config, {
  entry: "./javascript/amp-ahmedabad-studio.js",  
  watch: true,
  output: {
    path: __dirname,
    filename: "theme/assets/amp-ahmedabad-studio.js"
  },
  module: {     
    rules: [  
    {
      test: /\.scss$/,
      use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: __dirname  
        }
      },
      "css-loader",
      "sass-loader"
      ]
    }    
    ]  
  },
  plugins: [
  new MiniCssExtractPlugin({
    filename: "theme/snippets/amp-ahmedabad-studio.liquid"
  })   
  ]
});

var ampheaderConfig = Object.assign({}, config, {
  entry: "./javascript/amp-general.js",
  watch: true,
  output: {
    path: __dirname,
    filename: "theme/assets/amp-general.js"
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: __dirname
            }
          },
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "theme/snippets/amp-general.liquid"
    })
  ]
});
var barConfig = Object.assign({}, config, {
	entry:'./javascript/app.js',
	watch:true,
	output:{
		path:__dirname,
		filename:'theme/assets/bundle.js'
	},
  externals: {
    "jquery": "jQuery"
  }, 
	module: {
		rules: [
		{
			test: /\.scss$/,
			use: [
			{
				loader: MiniCssExtractPlugin.loader,
				options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: __dirname
          }
      },
      "css-loader",
      "sass-loader"
      ]
  }
  ]
},
plugins:[
new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "theme/assets/bundle.scss.liquid"
          })
]
});

var chackoutPage = Object.assign({}, config, {
  entry:'./javascript/new-app-checkout.js',
  watch:true,
  output:{
    path:__dirname,
    filename:'theme/assets/simply-checkout.js'
  },
  externals: {
    "jquery": "jQuery"
  }, 
  module: {
    rules: [
    {
      test: /\.scss$/,
      use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: __dirname
          }
      },
      "css-loader",
      "sass-loader"
      ]
  }
  ]
},
plugins:[
new MiniCssExtractPlugin({
  filename: "theme/assets/checkout.scss.liquid"
})
]
});

return [
   barConfig,
  ampheaderConfig,
  ampHomePageConfig,
  ampAhmedabadStudioConfig,
  chackoutPage,
  ];
}
// Return Array of Configurations
module.exports = (env, argv) => {
   let watchFile = false;
  if (argv.mode === "development") {
    watchFile = true;
  }
  return returnAll(watchFile);
};