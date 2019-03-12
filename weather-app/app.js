const yargs = require('yargs')
const axios = require('axios')

const argv = yargs.option({
    a: {
        alias: 'address',
        demandOption: true,
        describe: 'Use to get latitude and longitude',
        type: 'string'
    }
})
.argv

const address = encodeURIComponent(argv.a)
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyD1pOtdNx2EUpliE17rF1P4vy7ArPvuNn0`
let currentAddress

axios
.get(geocodeUrl)
.then(response => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('We cannot find this address')
    } else if (response.data.status === 'REQUEST_DENIED') {
        throw new Error('Please check if your API Key is correct or still valid')
    }
    // console.log(JSON.stringify(response.data.results, undefined, 2))
    currentAddress = response.data.results[0].formatted_address
    const latitude = response.data.results[0].geometry.location.lat
    const longitude = response.data.results[0].geometry.location.lng
    const weatherUrl = `https://api.darksky.net/forecast/0e1090aca6c48204224ccef6b6fc423a/${latitude},${longitude}`
    return axios.get(weatherUrl)
})
.then(response => {
    const temp = response.data.currently.temperature
    const tempToCelcius = ((temp - 32) / 1.8).toFixed(0)
    const apparentTemp = response.data.currently.apparentTemperature
    const apparentTempToCelcius = ((apparentTemp - 32) / 1.8).toFixed(0)
    console.log(`It is ${tempToCelcius} Degrees Celcius. But it feels like ${apparentTempToCelcius} Degrees Celcius here in ${currentAddress}`)
})
.catch(errorMessage => {
    if (errorMessage.response) {
        if (errorMessage.response.status === 404) {
            console.log('Unable to connect to weather servers')
        }
    } else {
        console.log(errorMessage.message)
    }
}) 
