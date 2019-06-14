/**
 * Form Submit
 */

const submit = (event, context, callback) => {

  // A hack that crashes the function
  if (event['queryStringParameters'] && event['queryStringParameters']['error']) {
    let r = Math.random().toString(36).substring(7);
    throw new Error(`Self-inflicted function crash: ${r}`)
  }

  callback(null, {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      message: 'form submission received',
      data: event 
    }),
  })
}

module.exports = { submit }
