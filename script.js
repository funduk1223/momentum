// DOM Elements
const time = document.querySelector('.time'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus'),
  data = document.querySelector('.date'),
  city = document.querySelector('.city-weather'),
  buttonRefreshImg = document.querySelector('.button-refresh-img'),
  buttonRefreshQuote = document.querySelector('.button-refresh-quote'),
  quote = document.querySelector('.quote'),
  weatherIcon = document.querySelector('.weather-icon'),
  temperature = document.querySelector('.temperature'),
  humidity = document.querySelector('.humidity'),  
  speedWind = document.querySelector('.speed-wind'),
  weatherDescription = document.querySelector('.weather-description');

// Date Elements
const _month =
  ['January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

const _day =
  ['Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

// Images
const MAX_NUMBER_OF_IMAGES = 20;

// Empty field
localStorage.setItem('void', '');

// Reboot page
if (sessionStorage.getItem("is_reloaded")) {
  console.log('Страница перезагружена');
  getQuote()
} else {
  getQuote();
  console.log('Страница загружена впервые!')
  sessionStorage.setItem("is_reloaded", true);
}
// Show Time
function showTime() {
  //let today = new Date (2012, 23, 1, 19, 22, 45),
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds(),
    date = today.getDate(),
    day = _day[today.getDay()],
    month = _month[today.getMonth()];

  //Output Time
  time.innerHTML = `${addZero(hour)}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;
  data.innerHTML = `${day}<span>, </span>${addZero(date)}<span> </span>${month}`;
  setTimeout(showTime, 1000);
}

//Add Zeroz
function addZero(element) {
  return element < 10 ? `0${element}` : element;
}

//Choose Img
function getRandom(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const arrayImg = [];
for (let i = 0; i <= 24; i++) {
  if (i < 6) {
    arrayImg.push(`/night/${addZero(getRandom(19) + 1).toString()}.jpg)`);
  } else if (i < 12) {
    arrayImg.push(`/morning/${addZero(getRandom(19) + 1).toString()}.jpg)`);
  } else if (i < 18) {
    arrayImg.push(`/day/${addZero(getRandom(19) + 1).toString()}.jpg)`);
  } else {
    arrayImg.push(`/evening/${addZero(getRandom(19) + 1).toString()}.jpg)`);
  }

}
//console.log(arrayImg);

// Set Background 
function setBackground() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes();
  //console.log(`название изображения ${img} hour = ${localStorage.getItem('hour')}`);
  document.body.style.backgroundImage = "url(/assets/images/" + arrayImg[hour];
  setTimeout(setBackground, 1000);
}

// Refresh Images
function getImages() {
  let firstElement = arrayImg.shift();
  arrayImg.push(firstElement);
}


function getQuote() {
  // API wth quotes
  const apiUrl = 'https://type.fit/api/quotes'
  fetch(apiUrl)
    // .then в коде ниже выполняется, когда удалённый сервер отвечает
    .then(function (response) {
      // response.json() возвращает новый промис,
      // который выполняется и возвращает полный ответ сервера,
      // когда он загрузится
      return response.json();
    })
    .then(function (text) {
      // ...и здесь содержимое полученного файла
      let orderQuote = getRandom(text.length + 1);
      let checkAuthor = text[orderQuote].author === null ? 'unknown' : text[orderQuote].author;
      quote.innerHTML = `<blockquote>${text[orderQuote].text}</blockquote><figcaption>${checkAuthor}</figcaption>`;
      console.log(text[orderQuote].text + " " + text[orderQuote].author); // {"text": "So smart quote is ...", "autor": true}
    });
}

//Set Greeting
function setGreeting() {
  let today = new Date(),
    hour = today.getHours();
  if (hour < 6) {
    // Night
    greeting.textContent = "Good Night";
    document.body.style.color = 'white';
  } else if (hour < 12) {
    // Morning
    greeting.textContent = "Good Morning";
  } else if (hour < 18) {
    // Afternoon
    greeting.textContent = "Good Afternoon";
  } else {
    // Evening
    greeting.textContent = "Good Evening";
  }
  setTimeout(setGreeting, 1000);
}

// Set Name
function setName(event) {
  let oldName = localStorage.getItem('name');
  if (event.type === 'keypress') {
    // обработка события печати "keypress"
    // Обработка нажатия Enter
    if (event.key === 'Enter' || event.keyCode === 13) {
      if (event.target.innerText === '')
        name.textContent = oldName;
      else
        localStorage.setItem('name', event.target.innerText);
      // Снимаем фокус с поля "name"
      name.blur();
    }

  }
  else if (event.type === 'click') {
    name.textContent = localStorage.getItem('void');
  } else {
    // обработка события при потери фокуса "blur"
    if (event.target.innerText === '')
      name.textContent = oldName;
    else
      localStorage.setItem('name', event.target.innerText);
  }
}

// Get Name
function getName() {
  if (localStorage.getItem('name') === null || localStorage.getItem('name') === undefined) {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

// Set Focus
function setFocus(event) {
  let oldFocus = localStorage.getItem('focus');
  if (event.type === 'keypress') {
    // обработка события печати "keypress"
    // Обработка нажатия Enter
    if (event.key === 'Enter' || event.keyCode === 13) {
      if (event.target.innerText === '')
        focus.textContent = oldFocus;
      else
        localStorage.setItem('focus', event.target.innerText);
      // Снимаем фокус с поля "name"
      focus.blur();
    }
  } else if (event.type === 'click') {
    focus.textContent = localStorage.getItem('void');
  } else {
    // обработка события при потери фокуса "blur"
    if (event.target.innerText === '')
      focus.textContent = oldFocus;
    else
      localStorage.setItem('focus', event.target.innerText);
  }
}

// Set city
function setCity(event) {
  let oldName = localStorage.getItem('city');
  if (event.type === 'keypress') {
    // обработка события печати "keypress"
    // Обработка нажатия Enter
    if (event.key === 'Enter' || event.keyCode === 13) {
      if (event.target.innerText === '')
        city.textContent = oldName;
      else
        localStorage.setItem('city', event.target.innerText);
      // Снимаем фокус с поля "name"
      city.blur();
    }

  }
  else if (event.type === 'click') {
    city.textContent = localStorage.getItem('void');
  } else {
    // обработка события при потери фокуса "blur"
    if (event.target.innerText === '')
      city.textContent = oldName;
    else {
      localStorage.setItem('city', event.target.innerText);
      getWeather()
    }
      
  }
}

// Get city
function getCity() {
  if (localStorage.getItem('city') === null || localStorage.getItem('city') === undefined) {
    city.textContent = '[Enter City]';
  } else {
    city.textContent = localStorage.getItem('city');
  }
}

async function getWeather() {
  if (localStorage.getItem('city') !== null) {
    const normolizeNameCity = localStorage.getItem('city')[0].toUpperCase() + localStorage.getItem('city').slice(1).toLowerCase();
    const urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${normolizeNameCity}&lang=en&appid=0097b80415b8ed1142bf91f5f5b4e694&units=metric`
    try{
      const res = await fetch(urlWeather);
      const data = await res.json();
      console.log(data.weather[0].id, data.weather[0].description, data.main.temp);
      weatherIcon.classList.add(`owf-${data.weather[0].id}`);
      temperature.textContent = ` ${Math.round(data.main.temp)}°C `;
      humidity.textContent = `${data.main.humidity}%`;
      speedWind.textContent = `${data.wind.speed}mps`;
    } catch(err) {
      alert("С названием города какая-то беда, либо такого города не существует"); // TypeError: failed to fetch
    }
    
  }
}



// Прослушиваем события и если они произошли - вызываем функции setName
name.addEventListener('click', setName);
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('click', setFocus);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
buttonRefreshImg.addEventListener('click', getImages);
buttonRefreshQuote.addEventListener('click', getQuote);
city.addEventListener('click', setCity);
city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);

// Update
showTime();
setBackground();
setGreeting();
getCity();
getName();
getFocus();
getWeather();
