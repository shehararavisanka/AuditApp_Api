
const jsonToTable = require('json-to-table');

var sql = require("mssql");

const config = require("../db_connection");
var conn = config.con;
exports.MasterCreate = async (req, res, next) => {

    
    console.log('starting');
    var ItemList= req.body;  
 
    try {
        var count = 0;
        for await (const value of ItemList) {
console.log( value.QTYOnhand)

            let Validate = await conn.request()
                .input("Catogory", sql.NVarChar, value.Catogory)
                .input("Item", sql.NVarChar, value.Item)
                .input("Description", sql.NVarChar, value.Description)
                .input("Location", sql.NVarChar, value.Location)
                .input("QTYOnhand", sql.NVarChar, value.QTYOnhand)
                .input("UOM", sql.NVarChar, value.UOM)
                .input("isnew", sql.NVarChar, 0)
                .input("QtyVal", sql.Decimal,value.QtyValue)
                .input("lot", sql.NVarChar, value.lot)
                .input("GardenMark", sql.NVarChar, value.GardenMark)
                .input("INVNo", sql.NVarChar,value.INVNo)
                .input("SaleDate", sql.NVarChar, value.SaleDate)
               .execute(`InsertMaindataset`) 
            count = count + 1;

        }
        console.log('count', count);

        res.status(200).json({
            message: 'sucess',
            data:'Inserted row Count '+count 
        });
    } catch (error) {
        console.log('error', error)
    }



};


exports.createsecond = async (req, res, next) => {
 
    var ItemList= req.body;  
  
    try {
        var count = 0;
        for await (const value of ItemList) {
          
            let Validate = await conn.request()
                .input("Catogory", sql.NVarChar, value.Catogory)
                .input("TeaCatogory", sql.NVarChar, value.TeaCatogery)
                .input("TeaSTD", sql.NVarChar, value.TeaSTD)
                .input("Item", sql.NVarChar, value.Location)
                .input("Blend", sql.NVarChar, value.Blend)
                .input("Location", sql.NVarChar, value.Location)
                .input("CreateDate", sql.NVarChar, value.CreateDate)
                .input("QtyKg", sql.NVarChar,value.QtyKg)
                .input("RateperKg", sql.NVarChar, value.RatePerKg)
               .execute(`InsertMaindatasetSecond`) ;
 
            count = count + 1;

        } 

        res.status(200).json({
            message: 'sucess',
            data:'Inserted Sheet1 row  Count '+count 
        });
    } catch (error) {
        console.log('error', error)
    }



};

