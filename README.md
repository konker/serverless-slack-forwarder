serverless-slack-forwarder
==============================================================================

A HTTP service to receive various incoming data webhooks and forward them to slack.

Author: Konrad Markus <konker@iki.fi>
Licence: ISC


## Incoming Services
The following incoming services are supported:
  - Twilio SMS POST Webhooks


## Deploying
1) copy `secrets.example.yml` to `secrets.yml`
2) Edit `secrets.yml` to fill in:
    - SLACK_WEBHOOK_URL: The Slack incoming webhook URL that you want to forward to
    - KEY: Some secret key of your choosing
4) Intialize and deploy the serverless project

## Configuration
### Twilio
1) Check the AWS API Gateway console to find the URL of your deployed twilio/POST function
2) In the Twilio console:
  i) Find the number you want to configure and go to its _"Configure"_ page
  ii) Scroll down the page to find the _"Messaging"_ section
  iii) Enter the following configuration:
    - _CONFIGURE WITH_: Webhooks or TwiML Bins or Functions
    - _A MESSAGE COMES IN_:
        - url: `<AWS API Gateway URL>?key=<KEY from secrets.yml>`
        - method: HTTP POST
    - _PRIMARY HANDLER FAILS_:
        - leave blank
