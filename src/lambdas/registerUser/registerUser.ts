import { checkReqBody } from '../../util/helpers'
import { client } from '../../util/modules'
import { getUser, putUser } from '../../services'
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

        const user = await getUser(phone)

        if (user.length) {
            const msg = { name, phone, text: 'You are already in our system!' }

            results = await sendText(msg)
        } else {
            const newUser = await putUser({ name, phone })
            const msg = {
                ...newUser,
                text:
                    'Welcome to Encouragement Now! Enjoy the kind words of others!'
            }

            results = await sendText(msg)
        }

        return results
    } catch (err) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: err.message })
        }
    }
}
