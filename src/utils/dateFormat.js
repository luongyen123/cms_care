export function Age(bithday) {
    let d = new Date(bithday)
    let year = d.getFullYear();
    return (new Date()).getFullYear() - year
}
export function formatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    return [day, month, year].join('-');

}