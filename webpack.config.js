var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
	entry:'./index.js',
	output:{
		path:__dirname + '/js/',
		filename:'[name].js'
	},
	module:{
		loaders:[
			{
				test:/.js$/,
				loaders: ['jsx', 'babel?presets[]=react,presets[]=es2015'],
				exclude: /node_modules/
			},
			{
				test:/\.scss$/,
				loader:ExtractTextPlugin.extract('style','css!sass')
			}
		]
	},
	plugins:[
		new ExtractTextPlugin('../css/all.css')
	]
}