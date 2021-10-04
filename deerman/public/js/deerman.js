var deerman = (function() {
    var onReady = function() {
		initEvents()		
		animalFarms.openBarnDoor()
	}
	
	var initEvents = function() {
		var updateFormMessage = function(message) {
			$('.formMessage').show().text(message)		
		}
		
		$('a[href="#contactUs"]').click(function(e) {
			$('html, body').animate({scrollTop: $('a[name=contactUs]').offset().top}, 998)
			e.preventDefault()
		})

		$('.contactUsForm').submit(function(e) {
			var deermansForm = $(e.target)
			var deermansEmailInput = deermansForm.find('input[type=email]')
			var deermansTextarea = deermansForm.find('textarea')
			var deermansErrorMessage = ""

			$('.formError').text('')	

			if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,20})+$/.test(deermansEmailInput.val())) {
				deermansErrorMessage = "Please provide a valid email address<br/>";
				deermansEmailInput.focus()
				deermansEmailInput.addClass('formError')
			}
					
			if (deermansTextarea.val().trim().length < 1) {
				deermansErrorMessage += "Please include your message in the text box"
				deermansTextarea.focus()
				deermansTextarea.addClass('formError')
			}
					
			if (deermansErrorMessage.length > 0)
				$('.formStatusMessage').show().html(deermansErrorMessage)	
			else
				$.post('/sendusamessage', deermansForm.serialize(), function(data) {
					var messageSent = data["result"]

					if (messageSent)
						if (messageSent == "success") {
							$('.formsSubmitButton').attr('disabled', 'disabled')
							$('.formStatusMessage').show().html("Thanks, your message has been sent")
						} else if (messageSent == "robot")
							$('.formStatusMessage').show().html("Robotic activity detected")
						else if (messageSent == "problem")
							$('.formStatusMessage').show().html("There was a problem sending your message, sorry about that")
					else
						$('.formStatusMessage').show().html("There was a problem sending your message, sorry about that")
				}, 'json')
					
			e.preventDefault();
		})
		
		$('.contactUsForm').find('input, textarea').focus(function(event) {
			var thisElement = $(this)

			$('.formsSubmitButton').removeAttr('disabled')

			if (thisElement.hasClass('formError')) {
				thisElement.val('')
				thisElement.removeClass('formError')
			}
		})
	}
	
	var randomAgriculturalNumber = function(ofHowMany) {
		return Math.floor((Math.random() * ofHowMany))
	}
	
	var animalFarms = {
		openBarnDoor: function() {
			this.feedAnimals()
			this.animalsFidget()
		},
		
		animalsFidget: function() {
			setInterval(function () {
				const animal = $(".animal:eq(" + randomAgriculturalNumber($(".animal").length) + ")")
				const left = parseInt(animal.css("left"))
				const chickenSpeed = 10 * randomAgriculturalNumber(9)
				
				if (randomAgriculturalNumber(4) == 0) {
					if (animal.hasClass("facingBackwards")) {
						animal.css("left", left - chickenSpeed)
					} else {					
						animal.css("left", left + chickenSpeed)
					}
				} else {
					if (animal.hasClass("facingBackwards"))
						animal.removeClass("facingBackwards")
					else
						animal.addClass("facingBackwards")
				}
			}, 1000)
		},
		
		releaseTheChickens: function(pasture) {
			const chickensInPasture = 28
			const acreage = Math.floor(parseInt(pasture.css("width")))
			const middleOfPasture = acreage / 2
			const chickenTerritory = acreage / chickensInPasture / 1.9

			for (var i = 0; i < chickensInPasture; i++) {
				var grazingSpot = middleOfPasture + i * chickenTerritory * ((i % 2) ? -1 : 1) + randomAgriculturalNumber(110)
				var jungleFowl = randomAgriculturalNumber(12) == 0 ? "rooster" : "chicken"
				var thisBird = $("<div class='animal " + jungleFowl + "'></div>").prependTo(pasture)
		
				thisBird.css("left", grazingSpot + "px")
			
				if (randomAgriculturalNumber(6) == 0)
					thisBird.addClass("facingBackwards")
			}			
		},

		feedAnimals: function() {
			var animals = ["cow", "cow", "cow", "steer", "goat", "goat", "pig", "pig", "sheep", "rooster", "chicken", "chicken", "duck"]
			var pastures = $('.animalFarm')

			pastures.each(function() {				
				animalFarms.releaseTheChickens($(this))
				
				
			// var todaysChickenOrientation = randomAgriculturalNumber == 0
			
				// var inMyChickenFace = function(grazingSpot) {
				// 	for (var j = 0; j < grazingSpots.length; j++) {
				//
				//
				//
				//
				//
				// 	console.log("Happy Birthday Ozzi: " + Math.abs(grazingSpots[j]) + " :::: " + grazingSpot)
				//
				// 	// if ((Math.abs( grazingSpots[j]) - grazingSpot) < 100)
				// 	// 	return true
				//
				// 	return false
				// 	}
				// }



			// for (var i = 0; i < 5; i++) {
			// 	var animal = Math.floor((Math.random() * animals.length) + 1)
			//
			// 	$(this).prepend("<div></div>")
			// 		$(this).find('div:first').addClass("animal").addClass(animals[animal]).css("left", grazingSpot + "px")
			//
			// 	grazingSpot = grazingSpot / 2 * -1
			//
			// 	console.log("Happy Birthday Ozzi: " + (Math.random() < 0.5) ? 1:-1)
			// }
			})
		}
	}
	
    return {
		onReady: onReady
    }
})()

$(document).ready(function() {
	deerman.onReady()
})