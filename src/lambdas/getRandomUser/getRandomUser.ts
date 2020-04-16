import { checkReqBody, getRandomInt } from '../../util/helpers'
import { getUsers } from '../../services'
import { textMsg } from '../../types'
import { sendText } from '../sendText/sendText'

export const getRandomUser = async (text: string) => {
    const errResopnse = checkReqBody({ text })

    if (errResopnse !== undefined) {
        return errResopnse
    }

    try {
        const users = await getUsers()
        const userNum = getRandomInt(0, users.length - 1)
        const { name, phone } = users[userNum]
        const msg = { name, phone, text } as textMsg

        return await sendText(msg)
    } catch (err) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: err.message })
        }
    }
}
