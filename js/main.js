
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
