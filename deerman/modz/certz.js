var cmd = require('node-cmd')
var domainToRenew = ''

exports.certbot = function(domain) {
	const millisecsInDay = 86400000
	const days = 0.005 // 1
	domainToRenew = domain
	
	setInterval(checkCertz, millisecsInDay * days)
	console.log("Hi Manny")
}

var checkCertz = function() {
	cmd.get("certbot certificates -d " + domainToRenew +  " -d www." + domainToRenew, function(err, data, stderr) {
		if (err)
			logLetsEncrypt("Certificate retrieval error: " + err)
		else if (!data)
			logLetsEncrypt("Certificate retrieval error: No data")
		else {
			var daysLeftReported = /VALID: (\S+)/m.exec(data) || [-1, -1]
			var daysLeft = daysLeftReported[1]

			if (daysLeft < 0)
				logLetsEncrypt("Certificate wierdness")
			else if (daysLeft > 30)
				logLetsEncrypt("Days left: " + daysLeft)
			else {
				logLetsEncrypt("Time to renew: " + data)

//				cmd.get("forever stopall", function(err, data, stderr) {
//				cmd.get("forever stop manners.js", function(err, data, stderr) {
					cmd.get("certbot renew --standalone", function(err, data, stderr) {
						if (err)
							logLetsEncrypt("Certificate renewal error: " + err)
						else if (!data)
							logLetsEncrypt("Certificate renewal error: No data")
						else
							logLetsEncrypt("Certificate renewal success: " + data)
							
//						cmd.run("echo 'cleo666' | sudo ./deerman.sh")
//					})
				})					
			}
		}
	})
}

var logLetsEncrypt = function(message) {
	console.log("Let's Encrypt Status = " + message)
}

//domainToRenew = 'joesfarmersplace.net'
//
//checkCertz()
