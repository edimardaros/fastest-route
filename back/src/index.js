const express = require('express');

const { getData, getResult } = require('./methods')
const app = express();

app.use(express.json());

app.use((error, request, response, next) => {
  console.error(error);
  response.sendStatus(500);
})

app.get('/time/:from/:pick/:to', async (req, res) => {
  try {
    const from = req.params.from.toUpperCase();
    const pick = req.params.pick.toUpperCase();
    const to = req.params.to.toUpperCase();

    const times = await getData();
    const timeToPick = getResult(times, from, pick);
    const timeToDelivery = getResult(times, pick, to);
    const totalTime = await timeToPick + await timeToDelivery
    console.log(totalTime);
    
    res.json({ 'Total:' : totalTime })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error while getting API information.' })
  }
})

app.listen(3000, () => {
  console.log('Runnin on port 3000.')
})