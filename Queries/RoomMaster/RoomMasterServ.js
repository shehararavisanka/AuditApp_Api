const environment = require('../../config/environment');
const config = require('../../SAP_Connection/db_connection');
const sap = require('../../SAP_Connection/SapPost.controller');
var conn = config.con;
const logger = require('../../util/default.logger');
const proc = require('../../SAP_Connection/execProc.controller')

exports.Load_Avail_Rooms = async (req, responce) => {
    try {
        logger.info("Room Master : SYnc Started(From  HIS to SAP)")
        var url = "SELECT  \"DocEntry\",\"U_RMNO\" from  " + environment.companyDB + ".ORDR where U_ROOM_SYNC=0";
        return await conn.exec(url);
    } catch (error) {
        console.log(error)
    }
};
exports.Push_Rooms_ToHIS = async (req, responce) => {
    try { 
        var Code = 1;
       return await  proc.execprocudure(environment.companyDB,'SP_SYNC_ROOM_STAT_TOHIS',req.U_RMNO);

    } catch (error) {
        console.log(error)
    }
};

exports.Push_Rooms_ToSap = async (req, responce) => {
    try { 
        var Code = 1;
       return await  proc.execprocudure(environment.IntermediateDB,'SP_SYNC_ROOM_STAT_TOSAP',"0");

    } catch (error) {
        console.log(error)
    }
};


exports.Update_SAP_Table = async ( responce) => {
    try { 
        var url = "Update   " + environment.companyDB + ".ORDR  set U_ROOM_SYNC=1  where U_ROOM_SYNC=0";
        return await conn.exec(url);
    } catch (error) {
        console.log(error)
    }
};