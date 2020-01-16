export const CONVERT_DATE = 24 * 60 * 60 * 1000;

export function Age(bithday) {
    let d = new Date(bithday * CONVERT_DATE)
    let year = d.getFullYear();
    return (new Date()).getFullYear() - year
}

export function formatDate(date) {
    let d = new Date(date * CONVERT_DATE),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    return [day, month, year].join('-');
}
export function formatSearch(dateString) {
    let d = new Date(dateString);
    return d.getTime()/CONVERT_DATE
}
export function formatTime(time) {
    return parseInt(time/60) + ':' + time % 60
}
export function formatTimeLog(time) {
    let d = new Date(time*1000),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    return [day, month, year].join('-');
}