import { expect } from 'chai'
import { registerUser } from './registerUser'

describe('registerUser', () => {
    it('confirm message is not from cell phone', async () => {
        const user = {
            name: 'Test',
            phone: '2025550149'
        }

        const expectedResponse = {
            statusCode: 400,
            body:
                '{"message":"Resource not accessible with Test Account Credentials"}'
        }

        const response = await registerUser(user)

        expect(response).to.deep.equal(expectedResponse)
    })
})
