const request =  require('request')

const forecast = (latitude, longitude, callback) => {
	const url = 'https://api.darksky.net/forecast/a785f1137497e794a02106b08ab3a3d7/' + latitude + ',' + longitude +'?units=si'//37.8267,-122.4233' 
	request({url, json:true},(error, {body}) =>{
		if(error){
			callback('Unable to reach weather services', undefined)
		}else if(body.error){
			callback('Can\'t find the location.')
		}else{
			callback(undefined, body.currently.temperature)//daily.data[0].temperature)
		}
	})
}

module.exports = forecast  