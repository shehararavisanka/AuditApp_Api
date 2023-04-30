var sql = require('mssql'); 

var config = {
  user: "sa",
  password: "123",
  server: 'DESKTOP-8UEM723\\SQLEXPRESS',
  database: "BasilurTea_Stock",
  port: 1433,
  options: {
      trustServerCertificate: true,
      enableArithAbort: true
  } 
}; 
var con = new sql.ConnectionPool(config);

con.connect(function (error) {
   
  if (!!error) {
    console.log("Error");
  } else {
    console.log("Connected!");

  }
});
module.exports.con = con;