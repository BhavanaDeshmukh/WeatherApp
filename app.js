const express = require("express");
const app = express();
app.use(express.static(__dirname));
const bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

const https = require("https");
app.get("/", function(req, res) {
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  const appid="2cb65000c7edcba65515cd6387b0130f";
  const query=req.body.cityName;
  console.log(query);
  const unit="metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?appid="+appid+"&q=" +query+"&units="+unit; //url for weather API
  //https.get to send get req to url
  https.get(url, function(response) {

    console.log(response.statusCode); //accessing statusCode
    if(response.statusCode===404){
      res.send("Page not found");
    }
    else{
      response.on("data", function(data) { //capturing data
        const weatherData = JSON.parse(data);
        const temp =weatherData.main.temp;
        const weatherDes=weatherData.weather[0].description;
        const icon=weatherData.weather[0].icon;
        const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png"
        res.write("<h1>The temperature in "+query+" is "+temp+" Celcius</h1>");
        res.write("<h3>Weather is "+weatherDes+".</h3>");
        res.write("<img src="+imageURL+">")
        res.send();
    });
    }
  });
});







app.listen(3000, function() {
  console.log("Server Started");
});
