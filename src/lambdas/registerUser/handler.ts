import { registerUser } from './registerUser'

export const handler = async (event, context, callback) => {
    const { name, phone } = JSON.parse(event.body)
    const result = await registerUser({ name, phone })

    callback(null, result)
}
