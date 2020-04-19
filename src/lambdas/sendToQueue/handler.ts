import { sendToQueue } from './sendToQueue'

export const handler = async (event, context, callback) => {
    // const { name, phone, text } = JSON.parse(event.body)

    const result = await sendToQueue(event.body)
    console.log(result)
    // const result = await sendToQueue({ name, phone, text })

    callback(null, event)
}
