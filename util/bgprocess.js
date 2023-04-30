const axios = require('axios').default; 
const ItemMaster=require('../controllers/ItemMaster.controller')
const BusinessPartner=require('../controllers/BusinessPartner.controller')
const Bedmaster=require('../controllers/Bedmaster.controller')
const RoomMaster=require('../controllers/RoomMaster.controller')
const InpatientMaster=require('../controllers/InpatientMaster.controller')
const OutPatientMaster=require('../controllers/OutPatientMaster.controller')
const ReturnMaster=require('../controllers/ReturnMaster.controller')
const LabRequest=require('../controllers/LabRequest.controller')
const InvoiceMaster = require('../controllers/InvoiceMaster.controller')

const notificationMaster = require("../controllers/notification.controller");


exports.SyncItemMaster = (callback) => {
 
    ItemMaster.MasterSelect((response) => {
        
    });
};
exports.SyncBusinessPartnerMaster = (callback) => {
 
    BusinessPartner.MasterSelect((response) => {
      
    });
};
exports.BedMaster = (callback) => {
 
    Bedmaster.MasterSelect((response) => {
        
    });
};
exports.SyncRoomStatus = (callback) => {
 
    RoomMaster.MasterSelect((response) => {
          
    });
};

exports.SyncRoomStatusFromHis = (callback) => {
 
    RoomMaster.MasterFromHISSelect((response) => {
          
    });
};


exports.SyncInpatient = (callback) => {
 
    InpatientMaster.MasterSelect((response) => {
        
    });
};
exports.SyncOutPatient = (callback) => {
 
    OutPatientMaster.MasterSelect((response) => {
         
    });
};
exports.SyncInvoiceMaster = (callback) => {
 
    InvoiceMaster.MasterSelect((response) => {
         
    });
};
exports.SyncReturn = (callback) => {
 
    ReturnMaster.MasterSelect((response) => {
         
    });
};
exports.SyncLabRequest = (callback) => {
 
    LabRequest.MasterSelect((response) => {
        
    });
};
exports.NotificationSync = (callback) => {

    notificationMaster.MasterSelect((response) => {});
    
};