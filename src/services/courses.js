
// fake data provisionong module istead of BE server

import { getRandomNumber } from "../utils/random";

// data is a regular JS array
export default class Courses{
    #courses
    #minId
    #maxId
    constructor(minId, maxId, courses){
        this.#courses = courses?? []; // if courses undefined then [] else courses.
                      //(The logical nullish assignment (x ??= y) operator only assigns if x is nullish (null or undefined).)
        this.#minId = minId ?? 1;
        this.#maxId = maxId ?? 1000000;
    }
    add(course){
        course.id = this.#getId();
        this.#courses.push(course);
        return course;

    }
    #getId(){
        // return  unique value of id
        let id;
        do{
             id = getRandomNumber(this.#minId, this.#maxId);
        } while (this.exsists(id));
        return id;
    }
    exsists(id){
        // TODO check if a course with a given ID exists
        return false;
    }

}