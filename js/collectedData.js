import { time } from "./ui.js";
import { handlePexelsApi } from "./apiFetch.js";
// display fetched image as background image 
const backGroundImages = await handlePexelsApi();
console.log(backGroundImages)
//document.getElementById("background-image").style.backgroundImage = `url(${backGroundImages})`;
// show currnet time in uk
const localTime = time();
document.getElementById("current-date").innerHTML = localTime;

