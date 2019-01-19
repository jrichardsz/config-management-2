/*
http://localhost:8080/companies
*/

var express = require('express');
var app = express();
var bodyParser = require('body-parser'); 
var cors = require('cors');
var fs = require('fs');
var yaml = require('js-yaml');
var SecureConfigurationId = require('./SecureConfigurationId.js');
auth = require('http-auth');

// Configure basic auth
var basic = auth.basic({
    realm: Math.random().toString(26).slice(2)
}, function(username, password, callback) {
    callback(username == process.env.AUTH_USER && password == process.env.AUTH_PASS);
});

// Create middleware that can be used to protect routes with basic auth
var authMiddleware = auth.connect(basic);

var generatorEndpoint = process.env.GENERATOR_ENDPOINT;

var secureConfigurationId = new SecureConfigurationId();

var bodyParser = require('body-parser'); 
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(cors());

app.get('/v1/properties', authMiddleware,function(req, res) {
  
  var uuid = Math.random().toString(26).slice(2);
  
  const query = req.query;
  
  var decryptId = secureConfigurationId.decrypt(query.id);
  
  var idFileJson = './properties/'+decryptId+'/application.json';
  var idFileYml = './properties/'+decryptId+'/application.yml';
  
  if (fs.existsSync(idFileJson)) {
      console.log("Searching file :"+idFileJson );
      var response = {uuid:uuid, status:"200", message:"success", 
        content:{
          properties : JSON.parse(fs.readFileSync(idFileJson, 'utf8'))
        }
      }; 
      console.log(response);
      res.status(200);
      res.json(response);
  }else if (fs.existsSync(idFileYml)) {
    console.log("Searching file :"+idFileYml );
    
    var response = {uuid:uuid, status:"200", message:"success", 
      content:{
        properties : yaml.safeLoad(fs.readFileSync(idFileYml, 'utf8'))
      }
    }; 

    console.log(response);
    res.status(200);
    res.json(response);    
  }  
  else  {
      console.error("configuration file does not exist for this application :"+decryptId);
      var response = {uuid:uuid, status:"500", message:"Configuration file does not exist"};
      res.status(500);
      res.json(response);
  }
});

app.get('/v1/'+generatorEndpoint, authMiddleware, function(req, res) {
  
  var uuid = Math.random().toString(26).slice(2);
  const query = req.query;
  var id = secureConfigurationId.encrypt(query.id);
  
  var response = {uuid:uuid, status:"200", message:"success",
    content:{
      secureId : id
    }
  };
  res.json(response);
});  
  

app.listen(process.env.PORT || 8080);