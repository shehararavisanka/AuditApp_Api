const express = require('express');
const router = express.Router(); 
const MainDataset = require('../controllers/userhanle.controller');

router.post('/select', MainDataset.MasterSelect);   
router.post('/insert', MainDataset.MasterInsert);   
router.post('/login', MainDataset.Masterlogin);   



module.exports = router;