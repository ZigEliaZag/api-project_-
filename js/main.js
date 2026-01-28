// import api functions
import { londonSummary, manchesterSummary, handlePexelsApi } from "./apiFetch.js";
// import time function 
import { time } from "./ui.js";

// navigation bar triger 
const toggleMenuBtn = document.querySelector("header .btn-toggle");
const menuList = document.querySelector("header .navigation-menu");

function showMenu() {
    /*
     targets menu button to dipslay menu list
    */
    toggleMenuBtn.classList.toggle("active") // activets close menu
    menuList.classList.toggle("open") // activets open menu
}

// display menu list
toggleMenuBtn.addEventListener("click", showMenu);

// fetched api content
const londonApiSummary = await londonSummary();
const manchesterApiSummary = await manchesterSummary();

// display api fetched content
document.getElementById("londonSummary").innerHTML = londonApiSummary;
document.getElementById("manchesterSummary").innerHTML = manchesterApiSummary;

// fetched api image from pexels 
const backGroundImages = await handlePexelsApi();
// html body travel section background image
document.getElementById("background-image").style.backgroundImage = `url(${backGroundImages})`;
//display current date and time in UK 
const localTime = time();
document.getElementById("current-date").innerHTML = localTime;
