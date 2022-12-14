import { createCourse } from "../models/course";
import { getRandomDate, getRandomNumber, getRandomElement } from "./random";
export function getRandomCourse(courseData){ /// webpack technology convert JSON 'couseData' to an object
    //TODO - random  id, date opening, name of lecturer etc ...
    //getting random aruments for the below function call
    const {minId, maxId, lectors, courses, minHours, maxHours, minCost, maxCost, minYear, maxYear} = courseData; 
    // when distructuring couseData object the name of elements matters, but not the sequence. 
    const id = getRandomNumber(minId, maxId);
    const lecturer = getRandomElement(lectors);
    const name = getRandomElement(courses);
    const hours = Math.round(getRandomNumber(minHours, maxHours)/10)*10;//to get the round amount (ex: 80 hrs instead 83)
    const cost = Math.round(getRandomNumber(minCost, maxCost)/100)*100; // the same as above
    const openingDate = getRandomDate(minYear, maxYear);
    return createCourse(id,  name, lecturer, hours, cost, openingDate)    
}
