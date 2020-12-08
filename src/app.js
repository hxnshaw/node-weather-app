const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define the various paths for configuring express
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Set up for handelbars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//set up for the static directories
app.use(express.static(publicDirectoryPath))

//Configurations for several pages of the application

//1. homepage configuration
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Application',
        name: 'Henshaw Osaghae'
    })
})

//2. About page configuration
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About WeatherMan',
        name: 'Henshaw Osaghae'
    })
})

//3.Help page configuration
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Get useful information and documentation here',
        title: 'Help',
        name: 'Henshaw Osaghae'
    })
})

//4. Weather page configuration
app.get('/weather', (req, res) => {
    //check if the user entered a valid search term
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

//5.other pages with the 'help' url
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Henshaw Osaghae',
        errorMessage: 'Help article not found'
    })
})

//6.All other pages that would return a 404 error
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Henshaw Osaghae',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is running at port 3000')
})