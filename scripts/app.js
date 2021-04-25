//DOM manipulation
const cityForm = document.querySelector('form');
const card = document.querySelector('.cards');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {
    //way1
    const cityDets = data.cityDets;
    const weather = data.weather;

    //way2 - destructuring, used when object is to be stored in  variable of the same name
    //const { cityDets, weather } = data;

    //update details in template
    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    //update image and icons
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    let timeSrc = null;
    if(weather.IsDayTime){
        timeSrc = 'img/day.svg';
    } else timeSrc = 'img/night.svg';
    
    time.setAttribute('src', timeSrc);

    //to unset d-none class if it is set 
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
};

const updateCity = async(city) => {
    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    //returns object
    return {
        cityDets : cityDets,
        weather : weather
    };
};
cityForm.addEventListener('submit', e => {
    //prevent default action
    e.preventDefault();

    //get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update ui with new city
    updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

    //set locla storage
    localStorage.setItem('city', city);
});

if(localStorage.getItem('city')){
    updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}