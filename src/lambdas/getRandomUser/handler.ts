import { getRandomUser } from './getRandomUser'

export const handler = async (event, context, callback) => {
    const { text } = JSON.parse(event.body)
    const result = await getRandomUser(text)

    callback(null, result)
}
