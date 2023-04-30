
var sql = require("mssql");
const config = require("../db_connection");
var conn = config.con;

exports.MasterSelect = async (req, res, next) => {

    var Filterdataset=req.body;
 

    let Validate = await conn.request() 
    .execute(`selectallusers`);


    res.status(200).json({
        message: 'sucess',
        data:Validate.recordsets
    });

};
exports.Masterlogin = async (req, res, next) => {

    var Filterdataset=req.body; 
    let Validate = await conn.request() 
    .input("username", sql.NVarChar, Filterdataset.username)
    .input("password", sql.NVarChar, Filterdataset.password) 
    .execute(`selectlogin`); 
    res.status(200).json({
        message: 'sucess',
        data:Validate.recordsets
    });

};
exports.MasterInsert = async (req, res, next) => {
    var Filterdataset=req.body;

    console.log(Filterdataset);
    

    let Validate = await conn.request()
    .input("username", sql.NVarChar, Filterdataset.username)
    .input("idxx", sql.UniqueIdentifier, Filterdataset.idx) 
    .input("passowrd", sql.NVarChar, Filterdataset.password) 
    .input("role", sql.NVarChar, Filterdataset.rack) 
    .execute(`createUser`);

 

    res.status(200).json({
        message: 'sucess',
        data:Validate.recordsets
    });
}