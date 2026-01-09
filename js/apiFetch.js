//import config
//import { CONFIG } from "../config/config.js";
// pexels cleant
//import dotenv from "dotenv";

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
const pexelsApiKey = 'XQZxTk3e0dqYzqVOm9XxrK2umJ0PaQnSvlnzgIIveiLM4sfvukh88fwZ'; // tenporary key, valid up to 4 months

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

        //return displayData.src.original
    }

    console.log(displayData.src.original);
}

handlePexelsApi();