import { AppName} from './data.js'

// ========= Strings ========= //
export function toProperCase(str) {
    return (str[0].toUpperCase() + str.substring(1).toLowerCase())
}


// ========= Numbers ========= //
export function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}



// ========= Dates ========= //
export function getNextDay(i, length = 7) {
    
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



// ========= Get Dom Element ========= //
export function getDomElement(selection,multiple = false) {
    
    const element = document[`querySelector${multiple ? 'All' : ''}`](selection);

    if (element) {
        return element;
    }

    throw new Error('no element selected');
}



// ========= Create Element ========= //
export function createHtmlElement(htmlString) {
    const template = document.createElement('template');
    htmlString = htmlString.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = htmlString;

    return template.content.firstElementChild;
}



// ========= Local Storage ========= //
export function getObjectLs(key) {
    return JSON.parse(localStorage.getItem(key));
} 

export function setObjectLs(key, obj) {
    localStorage.setItem(key, JSON.stringify(obj));
}

export function updateItemLs(key, property, value) {
    var obj = getObjectLs(key);

    if (obj) {
     obj[property] = value;    
     setObjectLs(key, obj);
    }

    else {
        setObjectLs(key, {
         property: value
     });
    }
    
}

export function initLs() {
    setObjectLs(AppName,{})
}


// ========= Arrays ========= //
export function getUniqueValuesArr(array,value) {
    return [
        ...new Set(array.map(item => {
            return item[value];
        }))
    ]
}