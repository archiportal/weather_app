const wrap = document.querySelector(".places");

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'f6ba221ce8mshedeeb1f704b9708p19f206jsn5a076caf4bdf',
		'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
	}
};

// let restaurants = {
//     fetchPlaces :function(lat, lon){
//     // console.log('lat:', lat, typeof(lat));
//     // console.log('lon:', lon, typeof(lon));
//     fetch(`https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary?bl_latitude=${lat-0.0527}&tr_latitude=${lat + Math.random()*5}&bl_longitude=${lon-0.0063}&tr_longitude=${lon + Math.random()*5}&restaurant_tagcategory_standalone=10591&restaurant_tagcategory=10591&limit=30&currency=USD&open_now=false&lunit=km&lang=en_US`, options)
// 	.then((response) => response.json())
// 	.then((results) => this.displayPlaces(results))
// 	.catch(err => console.error(err));
//     },
//     displayPlaces : function(results){
//         console.log(results);
//         var length = results.data.length;
//         // console.log(length);
//         let e = [];
//         let prefix = [];
//         for(var i = 0;i<3;i++){
//         const random = Math.floor(Math.random()*length);
        
//         if(!prefix.includes(random)){
//         let div = `<div class="card place"><img class="placeImage" src=${results.data[random].photo.images.medium.url}>
//         <h3>${results.data[random].name}</h3><p>${results.data[random].address}</p></div>`;
    
//         e.push(div);
//         prefix.push(random);
//         }

//         wrap.innerHTML = e;
//         }
//     },
// };

let attractions = {
    fetchAttractions :  function(lat, lon){
    fetch(`https://travel-advisor.p.rapidapi.com/attractions/list-in-boundary?tr_longitude=${lon + Math.random()*8}&tr_latitude=${lat + Math.random()*8}&bl_longitude=${lon}&bl_latitude=${lat}&currency=USD&lunit=km&lang=en_US`, options)
	.then(response => response.json())
	.then(results => this.displayAttractions(results))
	.catch(err => console.error(err));
    },
    displayAttractions : function(results){
        console.log(results);
        var length = results.data.length;
        // console.log(length);
        let e = [];
        let prefix = [];
        for(var i = 0;i<3;i++){
        const random = Math.floor(Math.random()*length);
        
        if(!prefix.includes(random)){
            let div = `<div class="card place"><img class="placeImage" src=${results.data[random].photo.images.medium.url}>
            <h3 class="placedet">${results.data[random].name}</h3><p>${results.data[random].address}</p></div>`;
    
            e.push(div);
            prefix.push(random);
        }

        wrap.innerHTML = e;
        }
    }
}

let weather = {
    apikey:"e176401756d037a04fb74da670861614",
    fetchWeather: function(city){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" 
            + city 
            + "&units=metric&appid=" 
            + this.apikey
        ).then((response)=>response.json())
        .then((data)=>this.displayWeather(data));
    },
    displayWeather: function(data){
        // try{
        const { name } = data;
        attractions.fetchAttractions(data.coord.lat, data.coord.lon);
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name,icon,description,temp,humidity,speed,data.coord.lat,data.coord.lon);
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/"+ icon +".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerHTML = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + "km/h"; 
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" +name+ "')"
        // } catch (err){
        //     document.querySelector(".error").innerHTML = "<h2>Oops! Not Found</h2>";
        // }
    },
    search: function(){
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};

document.querySelector(".search button").addEventListener("click",()=>{
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup",function(event){
    if(event.key == "Enter"){
        weather.search();
    }
});

weather.fetchWeather("Tokyo");
