const {Router} = require('express');
const { getData } = require('./index')

const router = Router();

router.get('/time/:from/:to', async (req, res) => {
  try {
    console.log('TESTE')
    const from = req.params.from;
    const to = req.params.to;

    const time = await getData();
    
    res.json({ time })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error while getting API information.' })
  }
})

module.exports = router;