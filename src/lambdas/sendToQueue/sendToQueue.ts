import { client } from '../../util/modules'
import { getStrValue } from '../../util/helpers'

export const sendToQueue = async (msg: string) => {
    const message = await getStrValue(msg, 'Body')
    const phoneNum = await getStrValue(msg, 'To').replace('%2B1', '')

    const phoneType = await client.lookups
        .phoneNumbers(phoneNum)
        .fetch({ type: ['carrier'] })

    if (phoneType.carrier.type !== 'mobile') {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Not a valid cell phone' })
        }
    }
}
