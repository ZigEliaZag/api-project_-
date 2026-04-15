let config = {};
async function getEnvKeys() {
    try {
        const res = await fetch('/env/config');
        config = await res.json()
        //diplay message if config was successfully loaded
        console.log('Config loaded successfully');
    } catch (error) {
        // diplay message if config failed to load 
        console.error('failed to load config from server:', error);
    }
}
await getEnvKeys();


// pexels image url
const pexelsUrl = 'https://api.pexels.com/v1/photos';
const pexelsKey = config.pexelsapiKey; // pexels api key
const pexelsImgId = 1181202;// pexels image id 

// fetch pexels image
async function handlePexelsApi() {
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
    });
    const displayData = await getData.json();
    // return the origin size of image
    return displayData.src.original;
    //console.log(displayData.src.original)

}
// set hero background on travel time table  
const backGroundImages = await handlePexelsApi()
document.getElementById("background-image").style.backgroundImage = `url(${backGroundImages})`;


// departure location 
const departureTrainStation = 'EUS'; // London Euston 
// handles transportapi request and response
async function trainUrl() {
    /**
     fetch api data.  
     when status === 403 it will result in many errors in this fucntion, so this does not mean other lines of codes 
     are wrong. error will desappear when after 24h
     */
    const trainData = await fetch(`https://transportapi.com/v3/uk/train/station_timetables/${departureTrainStation}.json?app_id=${config.transportapiId}&app_key=${config.transportapiKey}&train_status=passenger`);
    // show error message when usage limit of the allowed data is above 100% 
    // limit utilization hits per day is 30. every laod equal 1 hit
    if (trainData.status === 403) {
        errorMessage(`${trainData.status}: Limit usage is above 100%. Limit utilization of hits per day: 30/30. You have to wait 24H`);
        console.error("forbidden request")
    }
    function errorMessage(apiErrorMessage) {
        /** display error message to the user */
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
    `;
    // display the table in html file
    document.getElementById("timeTable").innerHTML = showTable;

}
trainUrl();



