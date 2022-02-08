const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//define path for express condif


const publicDirectoryPath = path.join(__dirname, '../public')
//the set() function takes in a key and a value, it's an express function.
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    //render allows us to render one of our views
    res.render('index', {
        title: 'SashCorp',
        name : 'Sashottini',
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About: ",
        name: 'Sashottini'
    })
})

/*app.get('/help', (req, res) => {
    res.send([{
        name : 'sasha',
    },{
        age: 6
}])
})*/

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Sashottini'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    } 
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if(error) {
                return res.send({error: error})
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if(error) {
                    return res.send({error:error})
                }

                res.send({
                    location,
                    forecast: forecastData,
                    address: req.query.address
                })
                
            })
        })
    })

//we're ceating an endpoint that sends back products to be displayed in the browser in our e-commerce site
app.get('/products', (req, res)=> {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    } 
    console.log(req.query.search)
    res.send({
        products: []
    })
})


/*app.get('/about', (req, res) => {
    res.send('<h1>About: </h1>')
})
*/

//app.com 
//app.com/help
//app.com/about
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error',
        error : ' Article not found',
        name: 'Sashottini'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'My 404 page',
        name: 'Sashottini'
    })
})

app.listen(3000, () => {
   console.log('Server is up on port 3000')
})