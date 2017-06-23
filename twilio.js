'use strict';

const request = require('request-promise-lite');
const querystring = require('querystring');

const OK_BODY = `
  <?xml version="1.0" encoding="utf-8"?>
  <Response/>
`;


module.exports.handle = (event, context, callback) => {
  //console.log(process.env.SLACK_WEBHOOK_URL, event.queryStringParameters, querystring.parse(event.body));

  const response = {
    statusCode: 200,
    headers: {
      'Content-type': 'text/xml',
    },
    body: OK_BODY,
  };

  if (!event.queryStringParameters ||
      !event.queryStringParameters.key ||
      !event.queryStringParameters.key === process.env.KEY)
  {
    response.statusCode = 401;
    return callback(null, response);
  }

  // Extract the message body
  const qs = querystring.parse(event.body);
  if (!qs || !qs.Body) {
    response.statusCode = 400;
    return callback(null, response);
  }

  // Forward the text of the message to the slack webhook url
  const query = {
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ text: qs.Body }),
    maxRedirects: 1,
    verbose: true,
  };

  console.info('Forwarding SMS body to slack...');
  console.info(query);
  return request.post(process.env.SLACK_WEBHOOK_URL, query)
    .then(res => {
      console.info('Sent: ', res.toString());
      return callback(null, response);
    })
    .catch(error => {
      console.warn('Error:', error);
      response.statusCode = 500;
      return callback(null, response);
    })
};

