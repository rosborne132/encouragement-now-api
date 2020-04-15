import { checkReqBody } from '../../util/helpers'
import { client } from '../../util/modules'
import { getUser } from '../../services'
import { user } from '../../types'

import { sendText } from '../sendText/sendText'

export const registerUser = async ({ name, phone }: user) => {
    const errResopnse = checkReqBody({ name, phone })

    if (errResopnse !== undefined) {
        return errResopnse
    }

    try {
        let results
        const phoneType = await client.lookups
            .phoneNumbers(phone)
            .fetch({ type: ['carrier'] })

        if (phoneType.carrier.type !== 'mobile') {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Not a valid cell phone' })
            }
        }

        // Check if user already exists
        const user = await getUser(phone)

        if (user.length) {
            // User already exist
            const msg = { name, phone, text: 'You are already in our system!' }
            results = await sendText(msg)
        } else {
            // User doesn't exist
            // If user doesn't exist. Create user and send text -> "Thanks for signing up!"
            console.log('User is not in our system')
        }

        return results
    } catch (err) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: err.message })
        }
    }
}
