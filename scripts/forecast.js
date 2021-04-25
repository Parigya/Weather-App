//TO INTERACT WITH THE WEATHER API

const key = '4DPCJq5HA1lQe3w0Gj6x9VnUVAYSWEKr';

//get weather info 
const getWeather = async(id) => {
    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apikey=${key}`;

    const response = await fetch(base + query);
    const data = await response.json();
    return data[0];
};

//get city info
const getCity = async(city) => {
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
};

/*getCity('kolkata').then(data =>{
    return getWeather(data.Key);
}) .then(data => {console.log(data);})
.catch(err => console.log(err));*/