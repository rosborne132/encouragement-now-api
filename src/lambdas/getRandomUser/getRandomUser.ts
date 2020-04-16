import { checkReqBody } from '../../util/helpers'
import { getUsers } from '../../services'

export const getRandomUser = async (text: string) => {
    const errResopnse = checkReqBody({ text })

    if (errResopnse !== undefined) {
        return errResopnse
    }

    const users = await getUsers()

    console.log(users)

    return text
}
