const moment = require('moment')
const fetch = require('node-fetch')

/*
* Test Endpoint
*/

const testEndpoint = (event, context, callback) => {

  let url = process.env.url
  let format = 'hh:mm:ss'
  let time = moment()
  let beforeTime = moment('04:50:00', format)
  let afterTime = moment('05:00:00', format)

  if (time.isBetween(beforeTime, afterTime)) {
    url += `?error=true`
  }

  // TODO: Add other query parameters to generate other function alerts.
  console.log('Testing URL: ', url)

  // API Request Function
  async function httpRequest() {
    let res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        name: 'Scheduled Request',
        email: 'scheduled@request.com'
      })
    })
    if (res.ok) {
      return res
    } else {
      console.log(res.error)
      throw new Error(res.statusText)
    }
  }

  // Generate a random number between 1 and 10
  let x = Math.floor((Math.random() * 10) + 1)
  let y = 0

  let promises = []
  while (y < x) {
    promises.push(httpRequest())
    y++
  }

  return Promise.all(promises)
  .then(function(values) {
    console.log(`Called the URL ${x} times successfully`)
    return callback(null , 'success')
  })
  .catch((error) => {
    console.log(error)
    return callback(error, null)
  })
}

module.exports = {
  testEndpoint,
}
