let users = []

function firstSetup() {
	if (localStorage.getItem('users') === null) {
		localStorage.setItem('users', JSON.stringify(users))
	}
}
firstSetup()

function onSignup() {
	localStorage.setItem('users', JSON.stringify(users))
}

function loadStorage() {
	let getUsers = JSON.parse(localStorage.getItem('users'))
	users = users.concat(getUsers)
}
loadStorage()

$(document).on('click', '#signupButton', function(){
	let email = document.getElementById('email').value
	let password = document.getElementById('password').value

	$('.input').trigger('blur')

	if (Boolean(users.find(checkUsers))) {
		let invalidInput = $('#email').parent().find('.description').find('.invalidInputAlert')

		invalidInput.html('Email already in use')
		$(invalidInput).fadeIn()
		$(invalidInput).addClass('open')
			
		loginPopupMenu(email)
	}
	if (!$('.invalidInputAlert').hasClass('open')) {
		users = users.concat({'email': email, 'password': password})
		onSignup()

		let loggedIn = document.createElement('div')
		loggedIn.id = 'loggedIn'
		loggedIn.innerHTML = 'You have successfully logged in'
		$('#signup').after(loggedIn)
		$('#signup').remove()
	}
})

function checkUsers(user) { 
	let email = document.getElementById('email').value
	return user.email === email
}

$('.input').on('blur', function(e){checkInput(e)})

let checkInput = function(e) {
	let invalidInput = $(e.currentTarget).parent().find('.description').find('.invalidInputAlert')

	if (!RegEx(e)) {
		$(invalidInput).fadeIn()
		$(invalidInput).addClass('open')
		$(e.currentTarget).addClass('invalid')
	
		if (e.currentTarget.id === 'password') {
			invalidInput.html('Password must be at least 6 characters long')
		}
		else if (e.currentTarget.id === 'confirmPassword') {
			invalidInput.innerHTML = 'Password do not match'
			if (e.currentTarget.value === '' && document.getElementById('password').value === '') {
				invalidInput.html('Invalid password / Passwords don\'t match')
			}
		}
	}
	else {
		$(invalidInput).fadeOut()
		$(invalidInput).removeClass('open')
		$(e.currentTarget).removeClass('invalid')
	}
}

let RegEx = function(e) {
	if (e.currentTarget.id === 'email') {
		return /^(\w+(-|\.)\w+@\w+|\w+@\w+)\.(net|com|edu|org)$/gi.test(e.currentTarget.value)
	}
	else if (e.currentTarget.id === 'password') {
		return /\w{6}/gi.test(e.currentTarget.value)
	}
	else if (e.currentTarget.id === 'confirmPassword') {
		if (e.currentTarget.value != '') {
			if (e.currentTarget.value === document.getElementById('password').value) {
				return true
			}
			else {
				return false
			}
		}
		else {
			return false
		}
	}
}

function loginPopupMenu(email) {
	let loginPopup = document.createElement('div')
	loginPopup.classList.add('loginPopup')

	let inUse = document.createElement('p')
	inUse.innerHTML = '<b>' + email + '</b>' + ' is already in use'

	let loginButton = document.createElement('button')
	loginButton.classList.add('button')
	loginButton.id = 'loginRedirect'
	loginButton.innerHTML = 'Login'

	let recoveryButton = document.createElement('button')
	recoveryButton.classList.add('button')
	recoveryButton.id = 'recoveryRedirect'
	recoveryButton.innerHTML = 'Forgot password?'

	$('.loginPopup').remove()
	$('#signup').after(loginPopup)
	$(loginPopup).fadeIn()
	$(loginPopup).addClass('loginOpen')
			
	loginPopup.append(inUse)
	loginPopup.append(loginButton)
	loginPopup.append(recoveryButton)
}

$(document).on('click', '#loginRedirect', function() {
	let loginPopup = document.getElementById('loginRedirect').parentNode
	$(loginPopup).remove()
	$('#signup').hide()
	loginMenu()
})

function loginMenu() {
	let login = document.createElement('div')
	login.id = 'login'

	let fieldDescription = ['Email', 'Password']

	for (i=0; i<fieldDescription.length; i++) {
		let field = document.createElement('div')
		field.classList.add('field')

		let description = document.createElement('div')
		description.classList.add('description')

		let inputField = document.createElement('div')
		inputField.classList.add('text')
		inputField.innerHTML = fieldDescription[i]

		login.append(field)
		field.append(description)
		description.append(inputField)
	}

	let loginEmail = document.createElement('input')
	loginEmail.id = 'email'
	loginEmail.type = 'text'
	loginEmail.placeholder = 'Enter your email'
	loginEmail.classList.add('input')

	let loginPassword = document.createElement('input')
	loginPassword.id = 'password'
	loginPassword.type = 'password'
	loginPassword.placeholder = 'Enter your password'
	loginPassword.classList.add('input')

	let loginButton = document.createElement('button')
	loginButton.id = 'loginButton'
	loginButton.classList.add('logSigButton')
	loginButton.innerHTML = 'Login'

	$('body').prepend(login)
	$('.field:nth-child(1)').append(loginEmail)
	$('.field:nth-child(2)').append(loginPassword)
	login.append(loginButton)
}

$(document).on('click', '#loginButton', function(){
	let wrongUsername = document.createElement('div')
	wrongUsername.classList.add('wrongUsername')
	$('.wrongUsername').remove()
	$('#login').prepend(wrongUsername)

	if (Boolean(users.find(checkUsers))) {
		let password = document.getElementById('password').value
		let checkPassword = users.find(checkUsers)
		
		if (password === checkPassword.password) {
			let loggedIn = document.createElement('div')
			loggedIn.id = 'loggedIn'
			loggedIn.innerHTML = 'You have successfully logged in'
			$('#signup').after(loggedIn)
			$('#login').remove()
		}
		else {
			wrongUsername.innerHTML = 'Wrong Password'
			$('.wrongUsername').fadeIn()
		}
	}
	else {
		wrongUsername.innerHTML = 'Wrong Email'
		$('.wrongUsername').fadeIn()
	}
})