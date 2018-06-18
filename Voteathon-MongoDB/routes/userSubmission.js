var express = require('express');
var router = express.Router();

var apiCtrlr = require('../controllers/apiController')

router.post('/newVoter', apiCtrlr.addVoter/* some function name*/);
router.post('/submitEntry', apiCtrlr.addEntry/*some function*/);
router.get('/checkoutblock', apiCtrlr.test/*somefunction*/);
router.post('/rankedBlock', apiCtrlr.test/*some function*/);

module.exports = router;