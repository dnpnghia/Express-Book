var express = require('express');
const serverless = require('serverless-http');


var app = express();
const router = express.Router();

// basic-routing
router.get("/", (req, res) => {
    res.json({"index" : "aaaa"
    });
  });
  
app.use('/.netlify/functions/api', router); 

module.exports.handler = serverless(app);