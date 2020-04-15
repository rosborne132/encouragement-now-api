const AWS = require('aws-sdk')

const options = { region: 'us-west-2' }

// Set the region
AWS.config.update(options)

// Create the DynamoDB service object
export const dbClient = new AWS.DynamoDB(options)

export const docClient = new AWS.DynamoDB.DocumentClient(options)

export const parseData = AWS.DynamoDB.Converter
