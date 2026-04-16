// show current time in uk
function time() {
    const date = new Date();
    return date.toLocaleString('en-GB', { timeZone: 'Europe/London' })
}

document.getElementById("current-date").innerHTML = time();





