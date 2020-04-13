import axios from 'axios'
import { checkReqBody } from '../../helpers'
import { textMsg } from '../../types'
const client = require('twilio')(
    process.env.ACCOUNT_SID,
    process.env.AUTH_TOKEN
)

export const sendText = async ({ name, phone, text }: textMsg) => {
    const errResopnse = checkReqBody({ name, phone, text })

    if (errResopnse !== undefined) {
        return errResopnse
    }

    const message = `Hello ${name}, ${text}`

    const data = await axios.get(
        `https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_KEY}&tag=cat&rating=G`
    )

    const txtMsg = {
        body: message,
        from: `+1${process.env.PHONE_NUMBER}`,
        mediaUrl: [data.data.data.fixed_width_downsampled_url],
        to: `+1${phone}`
    }

    try {
        const response = await client.messages.create(txtMsg)

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Message sent!',
                messagesid: response.sid
            })
        }
    } catch (err) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: err.message })
        }
    }
}
