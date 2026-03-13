
// fetch api keys from .env 
let config = {};
async function getEnvKeys() {
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
await getEnvKeys()

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

// pexels image url
const pexelsUrl = 'https://api.pexels.com/v1/photos';
const pexelsKey = config.pexelsapiKey // pexels api key
const pexelsImgId = 1181202// pexels image id 

// fetch pexels image
export async function handlePexelsApi() {
    /**
     fetch the pexels api photo and return the result
     */
    const getData = await fetch(`${pexelsUrl}/${pexelsImgId}`, {
        method: 'GET',
        id: pexelsImgId,
        headers: {
            Authorization: pexelsKey// pexels api key
            // personal key to access the api
        }
    })
    const displayData = await getData.json();

    return displayData.src.original;
    //console.log(displayData.src.original)

}

// departure station 
const departureTrainStation = 'EUS'; // London Euston 

async function trainUrl() {
    /** fetch api data  */
    const trainData = await fetch(`https://transportapi.com/v3/uk/train/station_timetables/${departureTrainStation}.json?app_id=${config.transportapiId}&app_key=${config.transportapiKey}&train_status=passenger`);
    // show error message when usage limit of the allowed data is above 100% 
    // limit utilization hits per day is 30. every laod equal 1 hit
    if (trainData.status === 403) {
        errorMessage(`${trainData.status}: Limit usage is above 100%. Limit utilization of hits per day: 30/30. You have to wait 24H`);
    }
    // display error message to the user 
    function errorMessage(apiErrorMessage) {
        const diplayError = document.getElementById("transportApiErrorMessage");
        diplayError.textContent = apiErrorMessage;
    }

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
    // display the table in html file
    document.getElementById("timeTable").innerHTML = showTable;

}
trainUrl()

//personal ticketmaster api key
const ticketMasterApiKey = config.ticketmasterapiKey
// handle ticketmaster api 
const handleTicketMasterApi = async () => {
    // ticket master url
    const ticketMasterUrl = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${ticketMasterApiKey}&CountryCode=GB&city=Manchester`, {
        method: "GET"
    }
    );
    // get data in json
    const getData = await ticketMasterUrl.json()
    //console.log(getData._embedded)
    // return all arrays
    const eventsData = getData._embedded.events

    let atraction = ` `
    //// lop through fetched api data and return each wished data in new div  
    for (let events in eventsData) {
        atraction += ` 
        <div>
            <img src="${eventsData[events]['images'][0]['url']}" class="events-images"><br>
            <p class="names">${eventsData[events]['name']}<p/><br>
            <span>Date <strong>${eventsData[events]['dates']['start']['localDate']}</strong></span><br>
            <span>Start <strong>${eventsData[events]['dates']['start']['localTime']}</strong></span> <br>
            <a href="${eventsData[events]['url']}" target="_blank"><p>Get a ticket now</p></a>
        </div>  
    `
        // this will check if there is any underfined pleaseNote, else it will return defined pleaseNote
        if (eventsData[events]['pleaseNote'] === undefined) {
            atraction += `
                           <span>No please note</span>
                               `
        } else {
            atraction += `
                           <span>Please note: ${eventsData[events]['pleaseNote']}</span>
                              
                               `

        }
    }
    // atraction section  
    // join atraction to events container  
    const places = `
                    <div class="events-container">${atraction}</div>
                        `
    // display returned api data into atractions section 
    document.getElementById("atractions").innerHTML = places;
}

handleTicketMasterApi()

