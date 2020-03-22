const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//Template engine setup to send styled HTML
app.set('view engine','ejs');
//Where to find css and other static files
app.use(express.static('public'));
//Setup the request body parser to log user input
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req,res){
    //Sending just text
    //res.send('Hello World');

    //Sending HTML
    res.render('index');
});

//POST to acquire user input
app.post('/',function(req,res){
    res.render('index');
    console.log(req.body.city);
})

app.listen(3000, function(){
    console.log('App is live on port 3000');
});