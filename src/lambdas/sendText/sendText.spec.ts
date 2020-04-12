import { expect } from 'chai'
import { sendText } from './sendText'

describe('sendText', () => {
    it('check for successful response', async () => {
        const msg = {
            name: 'Test',
            phone: '5555555555',
            text: 'Failed response'
        }

        const expectedResponse = {
            statusCode: 200,
            body:
                '{"userMsg":{"name":"Test","phone":"5555555555","text":"Failed response"}}'
        }

        const response = await sendText(msg)

        expect(response).to.deep.equal(expectedResponse)
    })
})
