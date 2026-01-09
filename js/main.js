// import api function
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
toggleMenuBtn.addEventListener("click", showMenu)

/* attuch api to new function
async function importLondonData() {
    const londonData = await londonSummary();
    const manchesterData = await manchesterSummary()

} abandoned function
 */

// attuch api response to html body
const londonApiSummery = await londonSummary()
const manchesterApiSummary = await manchesterSummary()

document.getElementById("londonSummary").innerHTML = londonApiSummery;
document.getElementById("manchesterSummary").innerHTML = manchesterApiSummary



