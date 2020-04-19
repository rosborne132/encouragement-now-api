import { expect } from 'chai'
import { sendText } from './sendText'

describe('sendText', () => {
    it('check for failed response', async () => {
        const msg = {
            name: 'Test',
            phone: `5555555555`,
            text: 'Failed response'
        }

        const expectedResponse = {
            statusCode: 400,
            body: `{"message":"The 'To' number +15555555555 is not a valid phone number."}`
        }

        const response = await sendText(msg)

        expect(response).to.deep.equal(expectedResponse)
    })
})
