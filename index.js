const request = require('request');
const args = require('yargs').argv;

/*
Simple API Get Request
*/

let apiKey = '6d3e987a550667111abd5f812ccd175e';

/*
Commandline Interactivity
*/
let city = args.city || 'Pittsburgh';


let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

request.get(url,function(err,response,body){
    if(err){
        console.log(err);
    }else{
        if(response.statusCode === 200){
            let weather = JSON.parse(body);
            console.log(`The current weather in ${weather.name} is ${weather.weather[0].main} and it is ${weather.main.temp} degrees outside`);
        }
    }
})

// /*
// Example of how a callback function works.
// console.log will log all user requests and then return them in 5 seconds
// */

// console.log("user 1 made a request");
// setTimeout(callback,5000);

// console.log("user 2 made a request");
// setTimeout(callback,5000);

// console.log("user 3 made a request");
// setTimeout(callback,5000);

// function callback(){
//     console.log(`Queried the databae and delivered data to in 5 seconds`);
// }
