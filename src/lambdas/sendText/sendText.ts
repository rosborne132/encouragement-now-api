import { checkReqBody } from '../../helpers'
import { textMsg } from '../../types'

export const sendText = async (userMsg: textMsg) => {
    const errResopnse = checkReqBody(userMsg)

    if (errResopnse !== undefined) {
        return errResopnse
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ userMsg })
    }
}
