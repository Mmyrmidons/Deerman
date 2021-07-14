const EventEmitter = require('events')
const deermail = require('./deermail')

exports.initErrorEmailz = function() {
	class Emitter extends EventEmitter {}
	const emitter = new Emitter();

	emitter.on('error', (error) => {
    	deermail.sendErrorMessage("Deerman Error = " + error)
	})
}