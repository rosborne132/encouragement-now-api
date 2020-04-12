import { expect } from 'chai'
import { checkReqBody } from './checkReqBody'

describe('checkReqBody', () => {
    it('check for empty value in request body', () => {
        const msg = {
            name: null,
            phone: '5555555555',
            text: 'Failed response'
        }

        const expectedResponse = {
            statusCode: 400,
            error: `Missing 'name' in request body`
        }

        const response = checkReqBody(msg)

        expect(response).to.deep.equal(expectedResponse)
    })

    it('check for successful response', () => {
        const msg = {
            name: 'Test',
            phone: '5555555555',
            text: 'Failed response'
        }

        const expectedResponse = undefined

        const response = checkReqBody(msg)

        expect(response).equal(expectedResponse)
    })
})
