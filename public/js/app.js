/*not working for me...
fetch('http://puzzle.nead.io/puzzle').then((response) =>{
	response.json().then((data) => {
		console.log(data)
	})
})*/




const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg-1')
const msg2 = document.querySelector('#msg-2')


weatherForm.addEventListener('submit', (event) =>{
	event.preventDefault()
	msg1.textContent = 'Loading data..'
	msg2.textContent = ''
	fetch('http://localhost:3000/weather?address='+search.value).then((response) =>{
	response.json().then((data) =>{
		if(data.error){
			msg1.textContent = data.error
		}else{
			msg2.textContent = data.Forecast
			msg1.textContent = data.location
			console.log(data)
		}
		
	})
})
})