"use strict";

var crypto = require('crypto'),algorithm = 'aes-256-ctr',
password = process.env.ENCRYPTION_KEY;

function SecureConfigurationId() {
  
  this.encrypt = function (text) {

    var cipher = crypto.createCipher(algorithm,password)
    var crypted = cipher.update(text,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;  
  }  
  
  this.decrypt = function (text) {

    var decipher = crypto.createDecipher(algorithm,password)
    var dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    return dec; 
  }    
  
}


/**
* Expose `EnvironmentHelper`.
*/
module.exports = SecureConfigurationId;  