const express = require('express')
const app = express()
const https = require('https')
const bodyParser = require('body-parser')
const fs = require('fs')
const args = require('yargs').argv
const handlebars = require('express-handlebars').create({
	defaultLayout: 'misstikki',
	helpers: {
		section: function(name, options) {
			if (!this._sections)
				this._sections = {}
				
			this._sections[name] = options.fn(this)
			return null
		}
	}	
})
const deermail = require('./modz/deermail')
const pjson = require('./package.json')
require('./modz/errorz').initErrorEmailz()

const port = args.port || 80
const securePort = args.securePort || 443

app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))

app.use(function(req, res, next) {
	if (req.headers.host == "localhost" || req.secure)
		next()
	else
		res.redirect("https://" + req.headers.host.replace(/\d+$/, securePort) + req.hostname)
})

app.get('/', function(req, res) {
    res.render('home')
})

app.get('/services', function(req, res) {
   res.render('services')
})

app.get('/world-cup', function(req, res) {
   res.render('world-cup')
})

app.get('/contact-us', function(req, res) {
   res.render('contact-us')
})

app.get('/analytics', function(req, res) {
   res.render('contact')
})

app.post('/sendusamessage', function(req, res) {
	deermail.sendEmailToTheDeerman(req, res)
})

app.use(function(req, res, next) {
	res.status(404)
	res.render('404')
})

app.use(function(err, req, res, next) {
	console.error("Deerman's 500 Error = " + err.stack)
	
	res.status(500)
	res.render('500')
})

try {
	const privateKey = fs.readFileSync('/etc/letsencrypt/live/' + pjson.domain + '/privkey.pem', 'utf8');
	const certificate = fs.readFileSync('/etc/letsencrypt/live/' + pjson.domain + '/cert.pem', 'utf8');
	const ca = fs.readFileSync('/etc/letsencrypt/live/' + pjson.domain + '/chain.pem', 'utf8');

	const credentials = {
		key: privateKey,
		cert: certificate,
		ca: ca
	}

	const httpsServer = https.createServer(credentials, app);

	httpsServer.listen(securePort, () => {
		console.log('Listening for secure Deerman requests from port ' + securePort)
	})
} catch(error) {
	console.log("Secure Deerman error = " + error)
} finally {
	app.listen(port, function() {
   		console.log("Listening for Deerman requests from port " + port)
	})
}
