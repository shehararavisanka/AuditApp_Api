var sql = require("mssql");
const config = require("../db_connection");
var conn = config.con;



// Initiate Asynchronouse connection using socket.io


exports.MasterSelectdt = async () => {
    return new Promise(function (resolve, reject) {
        resolve("refreshed");

    });

}

exports.MasterSelect = async (req, res, next) => {

    var Filterdataset = req.body;

    
    if (Filterdataset.ItmCode.length > 0) {
        Filterdataset.ItemCode = Filterdataset.ItmCode;
    }
    if( Filterdataset.lot.length > 0){
        Filterdataset.Lot=Filterdataset.lot;
    }
console.log(Filterdataset);
    let Validate = await conn.request()
        .input("Item", sql.NVarChar, Filterdataset.ItemCode)
        .input("category", sql.NVarChar, Filterdataset.category)
        .input("Location", sql.NVarChar, Filterdataset.Location)
        .input("lot", sql.NVarChar, Filterdataset.Lot)
        .input("isverified", sql.NVarChar, Filterdataset.IsCheckedC)
        .input("Exception", sql.NVarChar, Filterdataset.Exception)
        .execute(`selectMainDataset`);
    this.MasterSelectdt();

    res.status(200).json({
        message: 'sucess',
        data: Validate.recordsets
    });

};

exports.MasterSelectDropDown = async (req, res, next) => {

    var Filterdataset = req.body;

    console.log(Filterdataset);
    if (Filterdataset.ItmCode.lenght > 0) {
        Filterdataset.ItemCode = Filterdataset.ItmCode;
    }

    let Validate = await conn.request()
        .input("Item", sql.NVarChar, Filterdataset.ItemCode)
        .input("category", sql.NVarChar, Filterdataset.category)
        .input("Location", sql.NVarChar, Filterdataset.Location)
        .execute(`selectMainDatasetDropDown`);


    res.status(200).json({
        message: 'sucess',
        data: Validate.recordsets
    });

};
exports.MasterInsert = async (req, res, next) => {
    var Filterdataset = req.body;

    console.log(Filterdataset);


    let Validate = await conn.request()
        .input("mainidx", sql.UniqueIdentifier, Filterdataset.Idx)
        .input("useridx", sql.UniqueIdentifier, Filterdataset.userIdx)
        .input("orderqty", sql.Decimal(18, 3), Filterdataset.orderqty)

        .execute(`InsertMaindatasetQty`);

    Filterdataset.rackno = Filterdataset.rackno.replace('Group', 'Rack')

    var qry = "update  [dbo].[tbl_Main] set   " + Filterdataset.rackno + "=isnull(" + Filterdataset.rackno + ",0)+" + Filterdataset.orderqty + " where [Idx]='" + Filterdataset.Idx + "';"
    console.log(qry)
    let Validate1 = await conn.request()
        .query(
            qry
        );

    res.status(200).json({
        message: 'sucess',
        data: Validate.recordsets
    });
}

exports.MasterselectOrder = async (req, res, next) => {
    var Filterdataset = req.body;

    console.log(Filterdataset);

    // Filterdataset.userType =Filterdataset.userType.replace('Group', 'Rack') 

    let Validate = await conn.request()
        .input("mainidx", sql.UniqueIdentifier, Filterdataset.Idx)
        .input("userType", sql.VarChar, Filterdataset.userType)
        .execute(`selectOrderHistory`);


    res.status(200).json({
        message: 'sucess',
        data: Validate.recordsets
    });
}
exports.LoaduserId = async (req, res, next) => {
    var Filterdataset = req.body;

    console.log(Filterdataset.Rackno)
    var qry = " SELECT   [Idx]  ,[UserName] FROM  [dbo].[tbl_authUsers] where [Userdetails1]='" + Filterdataset.Rackno + "';";
    console.log(qry)
    let Validate1 = await conn.request()
        .query(
            qry
        );

    res.status(200).json({
        message: 'sucess',
        data: Validate1.recordsets
    });
}
exports.updatestock = async (req, res, next) => {
    var Filterdataset = req.body;

    let Validate = await conn.request()
        .input("idx", sql.UniqueIdentifier, Filterdataset.Idx)
        .input("status", sql.Int, Filterdataset.IsChecked)
        .execute(`updatestock`);


    res.status(200).json({
        message: 'sucess',
        data: Validate.recordsets
    });
}

exports.updateuserHistory = async (req, res, next) => {
    var Filterdataset = req.body;



    var qry = "update  [dbo].[tbl_userHistory] set [orderQty]=" + Filterdataset.orderQtyNew + " , Comment='"+Filterdataset.Comment+"'   where [Idx]='" + Filterdataset.Idx + "';"

    let Validate = await conn.request().query(qry);
 
    Filterdataset.rackno = Filterdataset.rackno.replace('Group', 'Rack')
    console.log(Filterdataset)
    var qry = "update  [dbo].[tbl_Main] set   " + Filterdataset.rackno + "=isnull(" + Filterdataset.rackno + ",0)+" + Filterdataset.orderQty + ",[varience]=[varience]+" + Filterdataset.orderQty + " where [Idx]='" + Filterdataset.mainIdx + "';"
    console.log(qry)
    let Validate1 = await conn.request()
        .query(
            qry
        );

    res.status(200).json({
        message: 'sucess',
        data: Validate.recordsets
    });
} 

exports.getDatafromSecond = async (req, res, next) => {
    var Filterdataset = req.body;
 

    console.log(Filterdataset);
   

    let Validate = await conn.request()
        .input("Item", sql.NVarChar, Filterdataset.Item)
        .input("category", sql.NVarChar, Filterdataset.Category) 
        .execute(`selectDatafromSecond`);
    
    res.status(200).json({
        message: 'sucess',
        data: Validate.recordsets
    });


 
} 