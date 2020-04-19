const badwordsArray = require('badwords/array')
const queryString = require('query-string')

import { client, sqs } from '../../util/modules'

export const sendToQueue = async (msg: string) => {
    const messageJson = queryString.parse(msg)

    const phoneType = await client.lookups
        .phoneNumbers(messageJson.From)
        .fetch({ type: ['carrier'] })

    if (phoneType.carrier.type !== 'mobile') {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Not a valid cell phone' })
        }
    }

    const wordCheck = messageJson.Body.split(' ').filter(word =>
        badwordsArray.includes(word.toLowerCase())
    )

    if (wordCheck.length) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Message contains profanity' })
        }
    }

    try {
        const params = {
            MessageBody: messageJson.Body,
            MessageDeduplicationId: messageJson.From,
            MessageGroupId: 'UserMessage',
            QueueUrl:
                'https://sqs.us-west-2.amazonaws.com/280138148799/user_queue.fifo'
        }

        return await sqs.sendMessage(params).promise()
    } catch (err) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: err.message })
        }
    }
}
