const express = require('express');

const Controller =  require('./controllers');


const router = express.Router();

router.get('/:metric/median', Controller.getMetric)

router.post('/:metric', Controller.postMetric);

router.delete('/:metric', Controller.deleteMetric);

router.get('/data', Controller.getData);


module.exports = router;