
// fake data provisioning module istead of BE server

import { getRandomNumber } from "../utils/random";
// data is a regular JS array

function getPromise(timeout, value) {
    return new Promise((resolve, reject)=> {
        setTimeout(()=> resolve(value), timeout);
    })
}

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
        return getPromise(1000, course);
    }
    #getId(){
        // return  unique value of id
        let id;
        do{
             id = getRandomNumber(this.#minId, this.#maxId);
        } while (this.exists(id));
        return id;
    }
    exists(id){
        return !!this.#courses.find(c => c.id === id); // !! -> exists, ( returns true if expression has a value )
        // return getPromise(100, !!this.#courses.find(c => c.id === id))  // GENERATE BUTTON  - NOT WORKING,  PAGE STUCK
    }
    get(){
        return getPromise(2000,this.#courses);
    }
    remove(id) {
        const index = this.#courses.findIndex(c => c.id === id);
        const res = this.#courses[index];
        this.#courses.splice(index, 1);
        return getPromise(1000, res);
    }

}