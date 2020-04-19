import { expect } from 'chai'
import { sendToQueue } from './sendToQueue'

describe('sendToQueue', () => {
    it('confirm message is rejected if it contains profanity', async () => {
        const textBody = {
            body: `Body=xrated&To=%2B1${process.env.SENDER_PHONE_NUMBER}`
        }

        const expectedResponse = {
            statusCode: 400,
            body: '{"message":"Message contains profanity"}'
        }

        const response = await sendToQueue(textBody.body)

        expect(response?.statusCode).to.equal(expectedResponse.statusCode)
    })
})
