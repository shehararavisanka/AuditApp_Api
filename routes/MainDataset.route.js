const express = require('express');
const router = express.Router(); 
const MainDataset = require('../controllers/MainDataset.controller');

router.post('/select', MainDataset.MasterSelect);   
router.post('/selectdropdown', MainDataset.MasterSelectDropDown);  
router.post('/insertqty', MainDataset.MasterInsert);  
router.post('/selectOrderHistory', MainDataset.MasterselectOrder);  
router.post('/LoaduserId', MainDataset.LoaduserId);  
router.post('/updatestock', MainDataset.updatestock);  
router.post('/updateuserHistory', MainDataset.updateuserHistory);  
router.post('/getDatafromSecond', MainDataset.getDatafromSecond);  

 
 
module.exports = router;