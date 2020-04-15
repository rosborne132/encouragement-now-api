const AWS = require('aws-sdk')

// Set the region
AWS.config.update({ region: 'us-west-2' })

// let options =
//     process.env.NODE_ENV === 'development'
//         ? {
//               region: 'localhost',
//               endpoint: 'http://localhost:8000',
//               apiVersion: '2012-08-10'
//           }
//         : {}

const options = {}

// Create the DynamoDB service object
export const dbClient = new AWS.DynamoDB(options)

export const docClient = new AWS.DynamoDB.DocumentClient(options)

export const parseData = AWS.DynamoDB.Converter
