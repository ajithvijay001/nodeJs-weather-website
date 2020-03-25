const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast =  require('./utils/forecast')

const app = express()

//Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewPaths = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views locations
app.set('view engine', 'hbs')
app.set('views', viewPaths)
hbs.registerPartials(partialsPath)

//Setup static directory for server
app.use(express.static(publicDirPath))

app.get('', (req, res) =>{
	res.render('index', {
		title: 'Hi there..',
		name: 'Ajith'
	})
})

app.get('/about', (req, res) =>{
	res.render('about', {
		title: 'About',
		name: 'Ajith'
	})
})

app.get('/help', (req, res) =>{
	res.render('help', {
		title: 'Help',
		name: 'Ajith'
	})
})
 
app.get('/weather', (req, res) =>{
	if(!req.query.address){
		return res.send({
			error: 'You must provide an address'
		})
	}else{
		geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
			//default object when we try to destructure the object throws error

			if(error){
				return res.send({ error	})
			}
		
			forecast(latitude, longitude, (error, forecastdata) =>{
				if(error){
					return res.send({ error	})
				}else{				
					res.send({
						Forecast: forecastdata,
						location,
						Address: req.query.address
					})
				}
				
			})
		})
	}
})

app.get('/product', (req, res) =>{
	if(!req.query.search){
		return res.send({
			error: 'You must provide a search term'
		})
	}
	res.send({
		product:[]
	})
})

app.get('/help/*', (req, res) =>{
	res.render('404', {
		title: '404',
		name: 'Ajith',
		errorMessage: 'Help article not found'
	})
})

app.get('*', (req, res) =>{
	res.render('404', {
		title: '404',
		name: 'Ajith',
		errorMessage: 'Page not found'
	})
})

app.listen(3000, () =>{
	console.log("Server is running in port 3000")
})
