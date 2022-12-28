// ========= Strings ========= //
export function toProperCase(str) {
    return (str[0].toUpperCase() + str.substring(1).toLowerCase())
}


// ========= Numbers ========= //
export function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}



// ========= Dates ========= //
export function getNextDay(i, length) {
    
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const nextDayNumber = new Date().getDay() + 1;
    const nextDay = days[(nextDayNumber + i) % length];

    return nextDay
}


export function formatDate(date = new Date()) {
    return [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
    ].join('-');
}



// ========= Colors ========= //
export function getColorFromCustomProps(colorName) {
    const color = getComputedStyle(document.documentElement).getPropertyValue(`--clr-${colorName}`);
    return color;
}