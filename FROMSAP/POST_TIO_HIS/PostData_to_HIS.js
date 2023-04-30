const axios = require('axios');

module.exports = { PostMethod : function (HISUrl,Dataset,Auth) { 
    return new Promise(async (resolve, reject) => {
        try {
            const setDataResult = await axios({
                url: HISUrl, 
                method: 'post',
                data: Dataset ,
                headers:Auth,
            });        
            resolve(setDataResult);                                                   
        } catch(err) {
            reject(err);                                                                 
        }
    });
 } }
