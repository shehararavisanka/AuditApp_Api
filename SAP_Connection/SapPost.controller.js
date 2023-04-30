const sapLogin = require("../SAP_Connection/SapLogin.controller");
const ServerUrl = require("../config/environment");
const axios = require("axios");

var { response } = require('express');
const logger = require("../util/default.logger");

exports.sapPost = async (saplocation, dataset, Sapmethod, callback) => {

  try {
    var saplogindt = await sapLogin.sapLogin(); 
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
    if (process.env.NODE_ENV == 'development') {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
    }
  
      response = await axios({
      url: ServerUrl.sapServiceLayer + '/b1s/v1/' + saplocation,
      method: Sapmethod,
      data: dataset,
      headers: {
        Cookie: `B1SESSION=${saplogindt.SessionId};`,
      },
    });
  } catch (error) {
    
    if(error.response.data.error.code==301){
      await sapLogin.NewSapLogin();
      response= await this.sapPostAgain(saplocation,dataset,Sapmethod);
    }else{
       response = error; 
    }
   
  }
  
  return response;

}; 


exports.sapPostAgain = async (saplocation, dataset, Sapmethod, callback) => {

  try {
    console.log('call sap post again');
    var saplogindt = await sapLogin.sapLogin(); 
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
    if (process.env.NODE_ENV == 'development') {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
    }
  
      response = await axios({
      url: ServerUrl.sapServiceLayer + '/b1s/v1/' + saplocation,
      method: Sapmethod,
      data: dataset,
      headers: {
        Cookie: `B1SESSION=${saplogindt.SessionId};`,
      },
    });
  } catch (error) {
    
    response = error; 
  }
  
  return response;

};