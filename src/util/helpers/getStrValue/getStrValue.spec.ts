import { expect } from 'chai'
import { getStrValue } from './getStrValue'

describe('getStrValue', () => {
    const textBody = {
        body:
            'ToCountry=US&ToState=CA&SmsMessageSid=xcvbl;jk2lkjsdfoi2&NumMedia=0&ToCity=&FromZip=97321&SmsSid=asdfklhqweoriyuasdf&FromState=OR&SmsStatus=received&FromCity=ALBANY&Body=Hey&FromCountry=US&To=%2B14444444444&ToZip=&NumSegments=1&MessageSid=asdfkljhqwerpoiu&AccountSid=aasdfkljhasdfkjlhasdf&From=%2B15555555555&ApiVersion=2010-04-01'
    }

    it('confirm that function returns text', () => {
        const response = getStrValue(textBody.body, 'Body')
        const expectedResponse = 'Hey'

        expect(response).to.equal(expectedResponse)
    })

    it('confirm that function returns phone number', () => {
        const response = getStrValue(textBody.body, 'To').replace('%2B1', '')
        const expectedResponse = '4444444444'

        expect(response).to.equal(expectedResponse)
    })
})
