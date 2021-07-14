const nodemailer = require("nodemailer")
const credz = require("./credentialz.js")

const createTransporter = function() {
	return nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: credz.deerman.gmailEmail,
			pass: credz.deerman.gmailPassword
		}
	})	
}

exports.sendEmailToTheDeerman = function(req, res) {
	if (req.body["g-recaptcha-response"]) {
		var message = "Message from: "
		
		if (req.body.messagersName)
			message += req.body.messagersName
		else
			message += "Did not leave their name"
				
		message += "\nEmail: "

		if (req.body.messagersEmail)
			message += req.body.messagersEmail
		else
			message += "Did not leave their email"
				
		message += "\nPhone: "

		if (req.body.messagersPhone)
			message += req.body.messagersPhone
		else
			message += "Did not leave a phone number"
				
		message += "\n\nMessage for the Deerman:\n\n" + req.body.message
		
		const transporter = createTransporter()
	
		transporter.sendMail({
			from: credz.deerman.deerMail,
			to: credz.deerman.deerMail,
			replyTo: req.body.messagersEmail,
    		subject: "A message for Joe's Farmers Place",
    		text: message
		}, (error, info) => {
			if (error) {
				console.log("Deerman Mail Error = " + error + " :::: Info = " + info)				
				res.json({result: "problem"})
				return
			}
		})
	
		res.json({result: "success"})
	} else
		res.json({result: "robot"})
}

exports.sendErrorMessage = function(message) {
	const transporter = createTransporter()
	
	transporter.sendMail({
		from: credz.deerman.gmailEmail,
		to: credz.deerman.gmailEmail,
		subject: "Deerman Error",
    	text: message
	}, (error, info) => {
		if (error)
			console.log("Deerman Mail Error = " + error + " :::: Info = " + info)				
	})
}

async function manners() {
//const oauth2Client = new OAuth2(
//     "262794184768-4jc6j4eagsva6q6kcgptkut5t5qkfeic.apps.googleusercontent.com", // ClientID
//     "AvKF2UBMtTva0aMQlJFgOOnF", // Client Secret
//     "https://localhost" // Redirect URL
//);
//
//oauth2Client.setCredentials({
//     refresh_token: "1/fIw9iJ2vjLGkY1VuFcdEqhJqJLf8ltVCsqa9E3sc-aU"
//});
//const tokens = await oauth2Client.refreshAccessToken()
//
//		const accessToken = tokens.credentials.access_token

//console.log("Miss Tikki: " + accessToken)


		
//	let transporter = nodemailer.createTransport({
//		host: 'smtp.gmail.com',
//		port: 465,
//		secure: true,
//		auth: {
//        	type: 'OAuth2',
//        	user: 'exweerdo@gmail.com',
////			scope : "https://www.googleapis.com/auth/gmail.send",
//			clientId: '262794184768-4jc6j4eagsva6q6kcgptkut5t5qkfeic.apps.googleusercontent.com',
//        	clientSecret: 'AvKF2UBMtTva0aMQlJFgOOnF',
//        	accessToken: "ya29.GlucBmh9Tmn1mEWpHD21WeGQZzCqHCgdmUIEOZFJ-MST95cyRsi3tMLwEl0GTQh0a7JMAiMv33mvwr0y0HoZwGFjyG-Y-xHJedh5pLnAi1FoXdfIg0PDe5J7ObPO",
//			refreshToken: '1/fIw9iJ2vjLGkY1VuFcdEqhJqJLf8ltVCsqa9E3sc-aU',
////        	expires: 3559
//    	}
//	})
	
	var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'exweerdo@gmail.com',
    pass: 'ceqd wyjy emvn tpen'
  }
});
	
	transporter.sendMail({
    	from: 'exweerdo@gmail.com',
    	to: 'brothergrilka@icloud.com',
    	subject: 'Hi Manny!',
    	text: 'Hi Manners',
//		auth: {
//			user: 'exweerdo@gmail.com',
//			password: 'ceqd wyjy emvn tpen',
////        	accessToken: 'ya29.GlucBhJFpOzXxvsJyZeWjM6TuSX41Tl9P3A_gyBe3XeUxNmUMqZAhCpl_jNz0Cpq6yYTlUu3uMdcXWZ0PtpibW0JwdDu2uHJOfCCtBSN751HiyrldBjeFY-yPYXT',
////        	refreshToken: '1/E5ibcuCT72OW5t4wA0VdtE8BO_4YoepkjzN4uaik7rU',
////        	expires: 3600
//		}
	}, (err, info) => {
		console.log("Manny Mail Error = " + err + " :::: " + info)
	});
}

