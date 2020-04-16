import { expect } from 'chai'
import { getRandomUser } from './getRandomUser'

describe('getRandomUser', () => {
    it('confirm message is not from cell phone', async () => {
        const msg = 'Hello Test'
        const expectedResponse = { statusCode: 400 }
        const response = await getRandomUser(msg)

        expect(response.statusCode).to.equal(expectedResponse.statusCode)
    })
})
