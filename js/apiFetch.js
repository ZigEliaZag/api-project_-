import { getJson } from "serpapi";
// fetch api keys from server.js
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

// api summary url
const londonUrL = 'https://en.wikipedia.org/api/rest_v1/page/summary/London';
const manchesterUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/Manchester';

// export function
async function londonSummary() {
    /*
    fetch summary london from wikipedia api
    */
    const response = await fetch(londonUrL);
    const respond = await response.json();

    return respond.extract;
}

// handles wikipedia function
async function manchesterSummary() {
    /*
    fetch about manchester from wikipedia api 
     */
    const response = await fetch(manchesterUrl)
    const respond = await response.json()

    return respond.extract
};

const londonApiSummary = await londonSummary();
const manchesterApiSummary = await manchesterSummary();

// display api fetched content
document.getElementById("londonSummary").innerHTML = londonApiSummary;
document.getElementById("manchesterSummary").innerHTML = manchesterApiSummary;

//personal ticketmaster api key
const ticketsApiKey = config.ticketmasterapiKey;
// handle ticketmaster api 
const handleTicketMasterApi = async () => {
    // ticket master url
    const ticketMasterUrl = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${ticketsApiKey}&CountryCode=GB&city=Manchester`, {
        method: "GET",
        //mode: 'no-cors',
        //credentials: 'include'
        //headers: {
        //    Authorization: ticketMasterApiKey
        //}
    }
    );
    // get data in json
    const getData = await ticketMasterUrl.json();
    //console.log(getData._embedded)
    // return all arrays
    const eventsData = getData._embedded.events;

    let atraction = ` `;
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
    `;
        // this will check if there is any underfined pleaseNote, else it will return defined pleaseNote
        if (eventsData[events]['pleaseNote'] === undefined) {
            atraction += `
                        <span class="hide-please-note">No please note</span>
                            `;
        } else {
            atraction += `
                           <span class="please-note">Please note: ${eventsData[events]['pleaseNote']}</span>
                              
                               `;
        }
    }
    // atraction section  
    // join atraction to events container  
    const places = `
                    <div class="events-container">${atraction}</div>
                        `;
    // display returned api data into atractions section 
    document.getElementById("atractions").innerHTML = places;

}

handleTicketMasterApi();

