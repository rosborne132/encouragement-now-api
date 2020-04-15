export const checkReqBody = obj => {
    for (const [key, value] of Object.entries(obj)) {
        if (value == null) {
            return {
                statusCode: 400,
                error: `Missing '${key}' in request body`
            }
        }
    }
}
