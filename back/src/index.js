const express = require('express');

const { getData, getResult, getFullPath, getTotalTime, checkPositionExists } = require('./methods')
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

    if (!checkPositionExists(from, pick, to)) {
      res.json({ 'Error' : 'Please, fix the positions, there is at least 1 that is wrong.' })
      return
    } 

    const times = await getData();
    
    const { time: timeToPick, path: pathToPick} = getResult(times, from, pick);
    const { time: timeToDelivery, path: pathToDelivery } = getResult(times, pick, to);

    const totalTime = getTotalTime(timeToPick, timeToDelivery);
    const fullPath = getFullPath(pathToPick, pathToDelivery);
    
    res.json({ 'Total' : totalTime.toFixed(2), 'Path' : fullPath })
    // res.json({ 'Total' : '0'})

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error while getting API information.' })
  }
})

app.listen(3000, () => {
  console.log('Runnin on port 3000.')
})