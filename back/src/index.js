const express = require('express');
const axios = require('axios');
const app = express();


app.get('/time/:from/:to', async (req, res) => {
  try {
    const from = req.params.from;
    const to = req.params.to;

    // Request JSON data
    const response = await axios.get('https://mocki.io/v1/10404696-fd43-4481-a7ed-f9369073252f');
    const time = response.data;

    res.json({ time })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error while getting API information.' })
  }
})

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000.')
})