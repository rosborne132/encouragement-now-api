import { getRandomUser } from './getRandomUser'

export const handler = async (event, context, callback) => {
    const { body } = event.Records[0]
    const result = await getRandomUser(body)

    callback(null, result)
}
