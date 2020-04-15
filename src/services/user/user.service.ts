import uuid from 'uuid'
import { dbClient, docClient, parseData } from '../../util/modules'

export const getUser = async (phone: string) => {
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        IndexName: 'phone-index',
        ProjectionExpression: 'userId, phone, username',
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
