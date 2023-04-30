var hana = require('@sap/hana-client');
const Common = require('../config/environment');
const logger = require('./../util/default.logger');

 
var conn = hana.createConnection();

var conn_params = {
  serverNode: Common.IP + ':' + Common.Port,
  uid: Common.DBUsername,
  pwd: Common.SBPassword
};
conn.connect(conn_params, function (err) {
   
  if (!!err) {
    logger.error("Local DB connection error: "+err);
  } else {
    logger.error("Local DB connected");
  }
});
 
module.exports.con = conn;