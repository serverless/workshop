/**
 * Form Submit
 */

const AWS = require('aws-sdk')
const dynamoDb = new AWS.DynamoDB.DocumentClient()

const submit = async (event, context) => {

  // If this query param is submitted, the function crashes...
  if (event && event['queryStringParameters'] && event['queryStringParameters']['error']) {
    crash()
  }

  // If this query param is submitted, the function runs for an unusually long time...
  if (event && event['queryStringParameters'] && event['queryStringParameters']['duration']) {
    await sleep(5800)
  }

  // If this query param is submitted, the function times out
  if (event && event['queryStringParameters'] && event['queryStringParameters']['timeout']) {
    await sleep(20000)
  }

  // Set default event body
  let data = event && event.body ? event.body : null
  // Parse, if necessary
  data = typeof data === 'string' ? JSON.parse(data) : data

  console.log(data)

  // If no data, throw an error
  if (!data ||
    typeof data !== 'object' ||
    !data.email ||
    !data.name) {
    console.error('Data not included in response body.')
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        message: 'Email address is required'
      }),
    }
  }

  // If no database, throw an error
  if (!process.env.database_submissions_name) {
    console.error('Database not found.')
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        message: 'Database not found'
      }),
    }
  }

  const params = {
    TableName: process.env.database_submissions_name,
    Item: {
      email: data.email,
      name: data.name,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    },
  }

  let result
  try {
    result = await dynamoDb.put(params).promise()
  } catch(error) {
    console.error('DyanmoDB PUT error' + error.message)
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        message: error.message
      })
    }
  }

  // Return the response
 return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      message: 'success',
      email: data.email,
    }),
  }
}

module.exports = { submit }

/**
 * Demo Utility Functions
 */

const crash = () => {
  let r = Math.random().toString(36).substring(7)
  throw new Error(`Self-inflicted function crash: ${r}`)
}

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}
