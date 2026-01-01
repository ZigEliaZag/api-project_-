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


