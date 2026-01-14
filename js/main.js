// import api functions
import { londonSummary, manchesterSummary } from "./apiFetch.js";

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

const londonApiSummary = await londonSummary();
const manchesterApiSummary = await manchesterSummary();


// display api fetched content
document.getElementById("londonSummary").innerHTML = londonApiSummary;
document.getElementById("manchesterSummary").innerHTML = manchesterApiSummary;

