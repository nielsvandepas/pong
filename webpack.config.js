var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
	entry: './client/game.es6',
	output: {
		path: __dirname + '/dist',
		filename: 'script.js'
	},
	module: {
		loaders: [{
			test: /\.es6$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			options: {
			  presets: ['env']
			}
		}]
	},
	plugins: [
		new BrowserSyncPlugin({
			// browse to http://localhost:3000/ during development,
			// ./public directory is being served
			host: 'localhost',
			port: 3000,
			server: { baseDir: ['./'] }
		})
	]
};