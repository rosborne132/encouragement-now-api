# About

I built a serverless application that allows users to text kind words to those that are recovering from COVID-19.

One of the main problems for those recovering from COVID-19 is the isolation from loved ones. You can communicated
through other means but this application is for those that don't already have a support network.

# Local Environment Setup

If you would like to test the application without setting it up try visiting the live site [Encouragement Now](https://encouragementnow.net/)

### Setup front end site

Follow and complete all the steps in the front end repo first.
[Front End Repo](https://github.com/rosborne132/encouragement-now-site)

### Clone this repository and `cd` into it

```bash
git clone https://github.com/rosborne132/encouragement-now-api.git
cd encouragement-now-api
```

### Setup env file

-   [Install and setup the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
-   [TwilioSid, TwilioAuthToken, TwilioPhoneNumber](https://www.twilio.com/docs/usage/tutorials/how-to-use-your-free-trial-account)
-   [GiphyAPI](https://developers.giphy.com/docs/api)

Sample env file

```
ACCOUNT_SID=
AUTH_TOKEN=
GIPHY_KEY=
PHONE_NUMBER= (Your Twilio number)
SENDER_PHONE_NUMBER= (Your phone number, really only used for tests)
DYNAMODB_TABLE=
```

### Install dependenices

Ensure that you have serverless install globally

```
npm install -g serverless
```

After that install the project dependenices

```
npm install
```

# How to run the application locally

First deploy the dev environment

```
sls deploy
```

Once this is complete you can update the `DYNAMODB_TABLE` value in your env file.

Start the application by running `sls offline`
The output should look like this.

```
Serverless: Compiling with Typescript...
Serverless: Using local tsconfig.json
Serverless: Typescript compiled.
Serverless: Watching typescript files...
offline: Starting Offline: dev/us-west-2.
offline: Offline [http for lambda] listening on http://localhost:3002

   ┌────────────────────────────────────────────────────────────────────────────────┐
   │                                                                                │
   │   POST | http://localhost:3000/dev/registeruser                                │
   │   POST | http://localhost:3000/2015-03-31/functions/registerUser/invocations   │
   │   POST | http://localhost:3000/dev/sendtoqueue                                 │
   │   POST | http://localhost:3000/2015-03-31/functions/sendToQueue/invocations    │
   │                                                                                │
   └────────────────────────────────────────────────────────────────────────────────┘

offline: [HTTP] server ready: http://localhost:3000 🚀
offline:
offline: Enter "rp" to replay the last request
```

Update your twilio #'s webhook with url `http://localhost:3000/dev/sendtoqueue`
For more information: [Link](https://www.twilio.com/docs/sms/tutorials/how-to-receive-and-reply-python-amazon-lambda)

If you have completed the registeration in the front-end site you should be able to directly text the number
![text](https://res.cloudinary.com/rosborne/image/upload/v1588207636/encouragement-now/text2.png)

Congrats! That's it!

### Tests

You can run the tests locally by typing:

```bash
npm test
```

### Cloud deployment

All deployment is handle through serverless.
