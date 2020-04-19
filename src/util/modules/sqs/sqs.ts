const AWS = require('aws-sdk')

const options = { apiVersion: '2012-11-05', region: 'us-west-2' }

// Set the region
AWS.config.update(options)

export const sqs = new AWS.SQS(options)
