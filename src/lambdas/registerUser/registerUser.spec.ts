import { expect } from 'chai'
import { registerUser } from './registerUser'
import { deleteUser } from '../../services'

describe('registerUser', () => {
    it('confirm message is not from cell phone', async () => {
        const user = {
            name: 'Test',
            phone: '2025550149'
        }

        const expectedResponse = {
            statusCode: 400,
            body: '{"message":"Not a valid cell phone"}'
        }

        const response = await registerUser(user)

        expect(response).to.deep.equal(expectedResponse)
    })

    xit('confirm that user does not exist and then registers user', async () => {
        const user = {
            name: 'Test',
            phone: `${process.env.SENDER_PHONE_NUMBER}`
        }

        const expectedResponse = {
            statusCode: 200,
            body: '{"message":"Message sent!"}'
        }

        const response = await registerUser(user)

        expect(response.statusCode).to.equal(expectedResponse.statusCode)

        await deleteUser(user)
    })

    xit('confirm that user already exists and message is sent', async () => {
        const user = {
            name: 'Test',
            phone: `${process.env.SENDER_PHONE_NUMBER}`
        }

        const expectedResponse = {
            statusCode: 200,
            body: '{"message":"Message sent!"}'
        }

        const response = await registerUser(user)

        expect(response.statusCode).to.equal(expectedResponse.statusCode)
    })
})
