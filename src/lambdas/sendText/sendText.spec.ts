import { expect } from 'chai'
import { sendText } from './sendText'

describe('sendText', () => {
    it('check for failed response', async () => {
        const msg = {
            name: 'Test',
            phone: `+1${process.env.SENDER_PHONE_NUMBER}`,
            text: 'Failed response'
        }

        const expectedResponse = {
            statusCode: 400,
            body:
                '{"message":"The From phone number +16692732451 is not a valid, SMS-capable inbound phone number or short code for your account."}'
        }

        const response = await sendText(msg)

        expect(response).to.deep.equal(expectedResponse)
    })
})
