export function getRandomNumber(min, max){
    //TODO - returs a random number in the range min to max
    if(min > max){
     [min, max] = [max, min];
    }
    return min + Math.round(Math.random()*(max - min))
}
export function getRandomElement(array){
    // TODO  - returns a random element of an array
    const index = getRandomNumber(0, array.length-1);
    return array[index];
}
export function getRandomDate (minYear, maxYear){
    // TODO  - returns random date object ( see constructor of the standard cass Date)
    const year = getRandomNumber(minYear, maxYear);
    const month = getRandomNumber(0,11); //  monthsin Date are from 0 to 11 (not a mistake )
    const day = getRandomNumber (1,31);
    const date  = new Date(year, month, day);
    return date
}
