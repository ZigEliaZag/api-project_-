// api summary url
const londonUrL = 'https://en.wikipedia.org/api/rest_v1/page/summary/London';
const manchesterUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/Manchester';

export async function londonSummary() {
    const response = await fetch(londonUrL)
    const respond = await response.json()

    return respond.extract
}

export async function manchesterSummary() {
    const response = await fetch(manchesterUrl)
    const respond = await response.json()

    return respond.extract
}


