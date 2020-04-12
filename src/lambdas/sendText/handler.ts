import { sendText } from './sendText'

export const handler = async (event, context, callback) => {
    const { name, phone, text } = JSON.parse(event.body)
    const result = await sendText({ name, phone, text })

    callback(null, result)
}
