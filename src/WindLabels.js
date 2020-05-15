import date from 'date-and-time';
import {UOM} from "./utils";
let speedL = document.getElementById("windSpeedTxt");
let dirL = document.getElementById("windDirTxt");
let dateL = document.getElementById("dataTimestamp");
let _format = 'ddd MMM DD HH:mm:ss';
let _utc = false;

let maxSpeedL = document.getElementById("maxWindSpeedTxt");
let maxDirL = document.getElementById("maxWindDirTxt");
let maxDateL = document.getElementById("maxDataTimestamp");

export const update = (speed = 0, dir = 0, uom = UOM.kt, time = new Date(), format = _format, utc = _utc) => {

    if(speedL && speed.toFixed)
        speedL.innerHTML = speed.toFixed(2) + " " + uom.label + " / Bft " + uom.toBeaufort(speed);
    if(dirL && dir.toFixed)
        dirL.innerHTML = dir.toFixed(2) + "°";
    if(dateL && isDate(time)) dateL.innerHTML = date.format(new Date(time), format, utc);

}

export const updateMax = (speed = 0, dir = 0, uom = UOM.kt, time = new Date(), format = _format, utc = _utc) => {

    if(maxSpeedL && speed.toFixed) 
        maxSpeedL.innerHTML = speed.toFixed(2) + " " + uom.label;
    if(maxDirL && dir.toFixed)
        maxDirL.innerHTML = dir.toFixed(2) + "°";
    if(maxDateL && isDate(time)) maxDateL.innerHTML = date.format(new Date(time), format, utc);

}


export const setFormat = (f = _format) => _format= f;
export const setUtc = (u = _utc) => _utc = u;



export const isDate = (value)  => {
    switch (typeof value) {
        case 'number':
            return true;
        case 'string':
            return !isNaN(Date.parse(value));
        case 'object':
            if (value instanceof Date) {
                return !isNaN(value.getTime());
            }
        default:
            return false;
    }
}

export default {
    update,
    updateMax,
    setFormat,
    setUtc,
    isDate
};