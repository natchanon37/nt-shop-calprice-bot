const line = require('@line/bot-sdk');
const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const app = express();
const calPrice = require('./calPrice');

const env = dotenv.config().parsed;
const PORT = process.env.PORT || 4000;


const lineConfig = {
  channelAccessToken: env.ACCESS_TOKEN,
  channelSecret: env.SECRET_TOKEN
}

const client = new line.Client(lineConfig);

app.post('/webhook', line.middleware(lineConfig), async (req, res) => {
  try {
    const events = req.body.events;
    console.log('this is event---->', events);
    return events.length > 0 ? await events.map(it => handleEvent(it)) : res.status(200).send('OK');

  } catch (error) {
    res.status(500).end()
  }
})

const handleEvent = async (event) => {
  if (event.type !== 'message' || event.message.type !== 'text') return Promise.resolve(null)
  let txt = event.message.text;
  let replyToken = event.replyToken;

  let result = calPrice(txt);

  return client.replyMessage(replyToken, { type: 'text', text: result.toString() })
}

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
})