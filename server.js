// server.js
const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 4001;
// const request = require("request");

// const data = {
//   url : "https://api.pexels.com/v1/curated?page=2&per_page=40",
//   headers: {
//     'Authorization': '563492ad6f91700001000001278c6ab6fb3f44f39ff96f5f7aaa879b'
//   } 
// }



// Set up pug as view engine
app.set('view engine', 'pug');

// Add the bodyParser middelware to the express application
app.use(bodyParser.urlencoded({ extended: false }));

// Specify the url prefix and import routes
app.use('/', require('./routes'))

 app.listen(port, () => {
  console.log(`Success! Your application is running on port ${port}.`);
});

// request(data, function(error, response, body){
//   if(!error && response.statusCode === 200){
//        console.log(body);
//    }
//  });
// app.listen(8080)