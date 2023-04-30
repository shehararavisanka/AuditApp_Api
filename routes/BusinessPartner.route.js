const express = require('express');
const router = express.Router(); 
const businesspartnerController = require('../controllers/BusinessPartner.controller');

router.post('/create', businesspartnerController.MasterCreate);  
router.post('/createsecond', businesspartnerController.createsecond);  


module.exports = router;
