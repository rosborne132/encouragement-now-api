import { expect } from 'chai'
import { getRandomInt } from './getRandomInt'

describe('getRandomInt', () => {
    it('confirm that it generates 1', () => {
        const response = getRandomInt(1, 1)
        const expectedResponse = 1

        expect(response).to.equal(expectedResponse)
    })

    it('confirm that random int does not go outside range', () => {
        const max = 100
        const min = 0

        for (let i = 0; i < 100; i++) {
            const response = getRandomInt(min, max)

            expect(response).to.not.gt(max)
            expect(response).to.not.lt(min)
        }
    })
})
