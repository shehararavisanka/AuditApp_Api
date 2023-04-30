const fs = require('fs');
const locks = require('locks');
const axios = require('axios');
require('datejs');
const logger = require('../util/default.logger');
const environment = require('../config/environment');
const { data } = require('../util/default.logger');

const config = require("../SAP_Connection/db_connection");
const conn = config.con;

exports.sapLogin = async (responce) => {
  try {

    var saplogindt = [];
    var url = "CALL   " + environment.CommonLogin + ".SP_SAP_LOGIN_COMMON(0,'','" + environment.username + "','" + environment.companyDB + "')";
    var Sapreturn = await conn.exec(url);

    if (Sapreturn.length > 0) {

       if (Sapreturn[0].DIFF > 20) {
    //  if (20>Sapreturn[0].DIFF ) {
        logger.info('Old Login expired- time diff ' + Sapreturn[0].DIFF); 
        var saplout = await this.LogoutSap(Sapreturn);
         var Newlogin = await this.NewSapLogin();
        saplogindt.push({ SessionId: Newlogin });
      } else {

        saplogindt.push({ SessionId: Sapreturn[0].SESSIONID });

        logger.info('Old login return- time diff ' + Sapreturn[0].DIFF);
      }
    } else {
      var Newlogin = await this.NewSapLogin();
      saplogindt.push({ SessionId: Newlogin });
      logger.info('New login created for user');
    }
    console.log('saplogindt', saplogindt[0]);
    return saplogindt[0];

  } catch (err) {
    console.error(err);
  }

};



exports.NewSapLogin = async (ret) => {
  try {
    var SapLogin = await actualLogin();


    var url = "CALL   " + environment.CommonLogin + ".SP_SAP_LOGIN_COMMON(1,'" + SapLogin.SessionId + "','" + environment.username + "','" + environment.companyDB + "')";
    var dbsessionupdate = await conn.exec(url);

    return SapLogin.SessionId;

  } catch (error) {

  }


}


async function actualLogin(res) {

  try {
    let payload = {
      CompanyDB: environment.companyDB,
      UserName: environment.username,
      Password: environment.password,
    };

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
    if (process.env.NODE_ENV == 'development') {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
    }

    var response = await axios({
      url: environment.sapServiceLayer + '/b1s/v1/Login',
      method: 'post',
      data: payload,
    });




    logger.info(
      `Login success - Company Name : ${payload.CompanyDB} - User Name : ${payload.UserName}`
    );
    if (response && response.data) {
      response.data.expireDateTime = new Date().addMinutes(25);

      fs.writeFileSync("config.Json", JSON.stringify(response.data));
      logger.info('Login details updated successfully');


      return response.data;
    } else {
      logger.log('response not received');
      return null;
    }

  } catch (error) {
    console.log(error, "error")
  }

};

exports.LogoutSap = async (Sapreturn,ret) => {

  try {
     var response = await axios({
    url: environment.sapServiceLayer + '/b1s/v1/Logout',
    method: "POST",
    data: '',
    headers: {
      Cookie: `B1SESSION=${Sapreturn[0].SESSIONID};`,
    },
  });
  console.log('saplout',response);
 
  } catch (error) {
    console.log('error',error);
  }
  return 1;

};