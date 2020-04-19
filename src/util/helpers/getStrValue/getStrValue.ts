export const getStrValue = (str: string, value: string): string => {
    let result

    str.split('&').forEach(strVal => {
        if (strVal.split('=')[0] === value) {
            result = strVal.split('=')[1]
            return result
        }
    })

    return result
}
