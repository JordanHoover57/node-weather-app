const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');

const apiKey = '6d3e987a550667111abd5f812ccd175e';

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req,res){
    res.render('index',{weather: null, error: null});
});

app.post('/',function(req,res){
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

    request(url,function(error,response,body){
        if(error){
            res.render('index',{weather: null,weatherImg: null,location: null, error: 'Error, please try again'});
        }else{
            let weather = JSON.parse(body);
            if(weather.main == undefined){
                res.render('index', {weather: null, weatherImg:  null,location: null , error: 'Error, please try again'});
            }else{
                let weatherImage = getStatusImg(weather.weather[0].id);
                //let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                res.render('index',{weather: Math.trunc(weather.main.temp), weatherImg: weatherImage, location: city, error: null});
            }
        }
    });
    
})

app.listen(3000, function(){
    console.log('App is live on port 3000');
});

function getStatusImg(statusId){
    let url = 'http://openweathermap.org/img/wn';
    
    const weatherSwitch = (statusId) => ({
        //Thunderstorms
        "200": `${url}/11d@2x.png`,
        "201": `${url}/11d@2x.png`,
        "202": `${url}/11d@2x.png`,
        "210": `${url}/11d@2x.png`,
        "211": `${url}/11d@2x.png`,
        "212": `${url}/11d@2x.png`,
        "221": `${url}/11d@2x.png`,
        "230": `${url}/11d@2x.png`,
        "231": `${url}/11d@2x.png`,
        "232": `${url}/11d@2x.png`,
        //Drizzle
        "300": `${url}/09d@2x.png`,
        "301": `${url}/09d@2x.png`,
        "302": `${url}/09d@2x.png`,
        "310": `${url}/09d@2x.png`,
        "311": `${url}/09d@2x.png`,
        "312": `${url}/09d@2x.png`,
        "313": `${url}/09d@2x.png`,
        "314": `${url}/09d@2x.png`,
        "321": `${url}/09d@2x.png`,
        //Rain
        "500": `${url}/10d@2x.png`,
        "501": `${url}/10d@2x.png`,
        "502": `${url}/10d@2x.png`,
        "503": `${url}/10d@2x.png`,
        "504": `${url}/10d@2x.png`,
        "511": `${url}/13d@2x.png`,
        "520": `${url}/09d@2x.png`,
        "521": `${url}/09d@2x.png`,
        "522": `${url}/09d@2x.png`,
        "531": `${url}/09d@2x.png`,
        //Snow
        "600": `${url}/13d@2x.png`,
        "601": `${url}/13d@2x.png`,
        "602": `${url}/13d@2x.png`,
        "611": `${url}/13d@2x.png`,
        "612": `${url}/13d@2x.png`,
        "613": `${url}/13d@2x.png`,
        "615": `${url}/13d@2x.png`,
        "616": `${url}/13d@2x.png`,
        "620": `${url}/13d@2x.png`,
        "621": `${url}/13d@2x.png`,
        "622": `${url}/13d@2x.png`,
        //Atmosphere
        "701": `${url}/50d@2x.png`,
        "711": `${url}/50d@2x.png`,
        "721": `${url}/50d@2x.png`,
        "731": `${url}/50d@2x.png`,
        "741": `${url}/50d@2x.png`,
        "751": `${url}/50d@2x.png`,
        "761": `${url}/50d@2x.png`,
        "762": `${url}/50d@2x.png`,
        "771": `${url}/50d@2x.png`,
        "781": `${url}/50d@2x.png`,
        //Clear
        "800": `${url}/01d@2x.png`,
        //Clouds
        "801": `${url}/02d@2x.png`,
        "802": `${url}/03d@2x.png`,
        "803": `${url}/04d@2x.png`,
        "804": `${url}/04d@2x.png`,
    })[statusId]

    return weatherSwitch(statusId);
}