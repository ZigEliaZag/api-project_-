// show current time in uk
export function time() {
    const date = new Date();
    return date.toLocaleString('en-GB', { timeZone: 'Europe/London' })
}




