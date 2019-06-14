/**
 * Form Submit
 */

const AWS = require('aws-sdk')
const dynamoDb = new AWS.DynamoDB.DocumentClient()

const submit = async (event, context) => {

  // A hack that crashes the function
  if (event && event['queryStringParameters'] && event['queryStringParameters']['error']) {
    let r = Math.random().toString(36).substring(7);
    throw new Error(`Self-inflicted function crash: ${r}`)
  }

  // Set default event body
  let data = event && event.body ? event.body : null
  // Parse, if necessary
  data = typeof data === 'string' ? JSON.parse(data) : data

  // If no data, throw an error
  if (!data) {
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
      message: 'Email submission received',
      email: data.email,
    }),
  }
}

module.exports = { submit }
