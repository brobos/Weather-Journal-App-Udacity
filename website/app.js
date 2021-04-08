/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '0283ed25d0f661e72b80a15d36f2f383';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// create click event to button
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {

  let newZip = document.getElementById('zip').value;
  let userText = document.getElementById('feelings').value;

  getWeather(baseURL, newZip, apiKey)
    .then(function (data) {
      // add data to POST request
      postData('/add', { date: newDate, temperature: data.main.temp, userText });
      updateUI('/all');
    })
};

// function GET data
const getWeather = async (baseURL, newZip, apiKey) => {
  // res equals to the result of fetch function
  const response = await fetch(baseURL + newZip + apiKey);
  try {
    // data equals to the result of fetch function
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

// function POST data
const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log('error', error);
  };
};

const updateUI = async () => {
  const request = await fetch('/all');
  try {
    const allData = await request.json();
    document.getElementById('date').innerHTML = allData[0].date;
    document.getElementById('temp').innerHTML = allData[0].temperature;
    document.getElementById('content').innerHTML = allData[0].userText;
  }
  catch (error) {
    console.log("error", error);
  }
};
