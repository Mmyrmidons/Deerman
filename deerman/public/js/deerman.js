var deerman = (function() {
    var onReady = function() {
		initEvents()
		feedAnimals()
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
		
	var feedAnimals = function() {
		var animals = ["cow", "cow", "cow", "steer", "goat", "goat", "pig", "pig", "sheep", "rooster", "chicken", "chicken", "duck"]
		var animalFarms = $('.animalFarm')

		animalFarms.each(function( index ) {
			var left = Math.floor(parseInt(animalFarms.first().css("width")) / 2)
	
			for (var i = 0; i < 5; i++) {
				var animal = Math.floor((Math.random() * 13) + 1)
					
				$(this).prepend("<div></div>")
					$(this).find('div:first').addClass("animal").addClass(animals[animal]).css("left", left + "px")
					
					if (i > 0)
						left = Math.floor(left / 2)
//						else if (i == 1)
//							left += Math.floor(left / 2)
			}
		})
	}
	
    return {
		onReady: onReady
    }
})()

$(document).ready(function() {
	deerman.onReady()
})