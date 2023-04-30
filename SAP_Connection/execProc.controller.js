const config = require('./db_connection');
 
exports.execprocudure = async (database,spdname, dataset, callback) => {
    var conn = config.con; 
    var constring = "CALL  " + database + "." + spdname + "  ("+dataset+")"; 
    var ret= await  conn.exec(constring); 
    return ret;
};

