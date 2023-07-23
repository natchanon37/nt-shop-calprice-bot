const line = require('@line/bot-sdk');
const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const app = express();
const calPrice = require('./calPrice');
const isTextValidate = require('./isTextValidate');

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
  const example = 'ตัวอย่างการใช้งาน \nราคา(¥) Type Rate Size \n51981 400 0.25 100'
  const wrongInput = 'รูปแบบข้อมูลไม่ถูกต้อง กรุณากรอกข้อมูลใหม่อีกครั้งนะจ๊ะ'

  let isValidate = isTextValidate(txt);
  if (!isValidate) return client.replyMessage(replyToken, { type: 'text', text: example })

  if (isValidate) {
    const lineInput = txt.split(' ').map(Number)

    for (let i = 0; i < lineInput.length; i++) {
      if (isNaN(lineInput[i])) {
        return client.replyMessage(replyToken, { type: 'text', text: wrongInput })
      }

    }
    const lineObj = {
      price: lineInput[0],
      type: lineInput[1].toString(),
      rate: lineInput[2],
      size: lineInput[3].toString()
    }

    let result = calPrice(lineObj.price, lineObj.type, lineObj.rate, lineObj.size);
    console.log('this is reesult ---->', result);
    return client.replyMessage(replyToken, { type: 'text', text: `cost is : ${result.toString()}฿` })
  }
}

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
})