const morgan = require('morgan')
const rotator = require('rotating-file-stream')

exports.initLogz = function(app) {
	app.use(morgan('combined', {
//		skip: function (req, res) {
//			return res.statusCode < 400
//		},
		stream: rotator('morgan.log', {
			interval: '1d',
			path: './logz'
		})
	}))	
}