import { v4 as uuid } from 'uuid'
import { dbClient, docClient, parseData } from '../../util/modules'
import { user } from '../../types'

export const getUser = async (phone: string) => {
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        IndexName: 'phone-index',
        ProjectionExpression: 'userId, phone',
        KeyConditionExpression: '#phone = :v_phone',
        ExpressionAttributeNames: {
            '#phone': 'phone'
        },
        ExpressionAttributeValues: {
            ':v_phone': { S: phone }
        }
    }

    const { Items } = await dbClient.query(params).promise()

    return Items.map(item => parseData.unmarshall(item))
}

export const putUser = async ({ name, phone }: user) => {
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
            channelName: 'SMS',
            name,
            phone,
            receiveText: true,
            userId: uuid()
        }
    }

    try {
        await docClient.put(params).promise()
    } catch (err) {
        console.error(err)
    } finally {
        const { name, phone } = params.Item
        return { name, phone }
    }
}

export const deleteUser = async ({ phone }: user) => {
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            channelName: 'SMS'
        },
        ConditionExpression: 'phone = :phone',
        ExpressionAttributeValues: {
            ':phone': phone
        }
    }

    try {
        await docClient.delete(params).promise()
    } catch (err) {
        console.error(err)
    }
}
