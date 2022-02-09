const request = require('request')

/*const url='http://api.weatherstack.com/current?access_key=673159eb43e54ee2baa0f1405959bcb9&query&units=f'

request({url: url, json: true}, (error, response)=> {
    //console.log(response.body.current)
    if(error) {
    console.log('Unable to connect to weather service!')
    }else if(response.body.error) {
       console.log('unable to find location')
    }
    else{
        console.log(response.body.current.weather_descriptions[0] + ' and it is currently ' + response.body.current.temperature + ' degres out. it feels like ' + response.body.current.feelslike + " degress out.")
    }
})
*/

const forecast = (latitude, longitude , callback) => {
    const url = "http://api.weatherstack.com/current?access_key=673159eb43e54ee2baa0f1405959bcb9&query="+ latitude + ',' + longitude + "&units=f"
    request({ url, json:true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather service!', undefined)

        }else if(body.error) {
            callback('unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ' and it is currently ' + body.current.temperature + ' degrees out. it feels like ' + body.current.feelslike + ' degrees out. Sasha is this cool because there is a wind speed of ' + body.current.wind_speed + 'm/s.'
            )
        }
    })
}


module.exports = forecast