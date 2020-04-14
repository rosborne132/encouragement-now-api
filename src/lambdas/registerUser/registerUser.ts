import { checkReqBody } from '../../helpers'
import { user } from '../../types'
// import { config } from '../../config'

// const client = require('twilio')(config.ACCOUNT_SID, config.AUTH_TOKEN)

const client = require('twilio')(
    process.env.ACCOUNT_SID,
    process.env.AUTH_TOKEN
)

export const registerUser = async ({ name, phone }: user) => {
    const errResopnse = checkReqBody({ name, phone })

    if (errResopnse !== undefined) {
        return errResopnse
    }

    try {
        const phoneType = await client.lookups
            .phoneNumbers(phone)
            .fetch({ type: ['carrier'] })

        if (phoneType.carrier.type !== 'mobile') {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Not a valid cell phone' })
            }
        }

        // const response = await client.messages.create(txtMsg)
        // return {
        //     statusCode: 200,
        //     body: JSON.stringify({
        //         message: 'Message sent!',
        //         messagesid: response.sid
        //     })
        // }
    } catch (err) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: err.message })
        }
    }
}
