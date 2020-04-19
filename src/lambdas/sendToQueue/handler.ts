import { sendToQueue } from './sendToQueue'

export const handler = async (event, context, callback) => {
    const result = await sendToQueue(event.body)

    callback(null, result)
}
