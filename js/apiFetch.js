
// api summary url
const londonUrL = 'https://en.wikipedia.org/api/rest_v1/page/summary/London';
const manchesterUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/Manchester';



// export function
export async function londonSummary() {
    /*
    fetch summary london from wikipedia api
    */
    const response = await fetch(londonUrL)
    const respond = await response.json()

    return respond.extract
}

// export function
export async function manchesterSummary() {
    /*
    fetch summary manchester from wikipedia api 
     */
    const response = await fetch(manchesterUrl)
    const respond = await response.json()

    return respond.extract
}

// fetch pexels image
//let pexelsApiUrl = CONFIG.PEXELS_URL  // pexels photo url 
//const pexelsApiKey = CONFIG.PEXELS_KEY  // pexels personal key
//const imageid = CONFIG.IMAGE_ID // id of the image/photo
const pexelsUrl = 'https://api.pexels.com/v1/photos';
const imageid = 1181202;
// get api key from .env  file
//require('dotenv').config()
//dotenv.config();
const pexelsApiKey = 'XQZxTk3e0dqYzqVOm9XxrK2umJ0PaQnSvlnzgIIveiLM4sfvukh88fwZ'; // temporary key, valid up to 4 months

export async function handlePexelsApi() {
    /**
     fetch the pexels api photo and return the result
     */
    const getData = await fetch(`${pexelsUrl}/${imageid}`, {
        method: 'GET',
        id: imageid,
        headers: {
            Authorization: pexelsApiKey // pexels api 
            // personal key to access the api
        }
    })
    const displayData = await getData.json();

    // dipslay error message if image failed to load
    if (displayData !== displayData) {
        console.error('Could not load', displayData);
    } else {

        return displayData.src.original
    }

    //return displayData.src.original

}

// get api keys 
let config = {};
async function getConfigKeys() {
    try {
        const res = await fetch('/env/config');
        config = await res.json()
        //diplay message if config was successfully loaded
        console.log('Config loaded successfully')
    } catch (error) {
        // diplay message if config failed to load 
        console.error('failed to load config from server:', error);
    }
}
await getConfigKeys()
// departure station 
const departureTrainStation = 'EUS' // London Euston 

async function trainUrl() {
    /** fetch api data  */
    const trainData = await fetch(`https://transportapi.com/v3/uk/train/station_timetables/${departureTrainStation}.json?app_id=${config.transportapiId}&app_key=${config.transportapiKey}&train_status=passenger`);
    const response = await trainData.json();
    // gets all allowed data by api provider
    const departure = response.departures.all;

    // collect all the wished data and returns it in tr 
    const timeTable = departure.map(departure => {
        return `
        <tr>
           <td>${departure.aimed_departure_time}</td>
           <td>${departure.origin_name}</td>
           <td>${departure.destination_name}</td>
           <td>${departure.platform}</td>
           <td>${departure.train_uid}</td>
        </tr>
        `
    }).join('\n'); // join table 

    // Names in th table and append all the returned data from departure
    const showTable = `
      <table>
        <tr>
          <th>Departs</th>
          <th>Departure</th>
          <th>Destination</th>
          <th>Platform</th>
          <th>Train</th>
        </tr>
        ${timeTable /** appends returned tr data from departure to the table */}
      </table>
    `
    // display the table in html body 
    document.getElementById("timeTable").innerHTML = showTable;

}

trainUrl()

