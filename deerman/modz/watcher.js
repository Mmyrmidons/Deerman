const fs = require('fs')

exports.watchCert = function(domain) {
	console.log("Hi Anni Fanni: /etc/letsencrypt/live/www." + domain + "cert.pem")
	

//	forever.list()
	
	fs.watchFile("/Users/dunc/Documents/Sites/Deerman/deerman/deerman.js", (curr, prev) => {
  		console.log(curr)
	})
}