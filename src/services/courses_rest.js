import Courses from "./courses";

export default class CoursesRest{
    #url
    constructor (url){
        this.#url = url;
    }
    async add(course) {
        const response = await fetch(this.#url, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            }, 
            body: JSON.stringify(course)
        });
        return await response.json();
    }
    async get() {
        const response = await fetch(this.#url);
        const courses =  await response.json();
        return courses.map(c => {
            c.openingDate = c.openingDate.substring(0, 10);
            return c;
        })
    }
    async remove(id){
        const res = this.getCourse(id);
        await fetch (this.#getUrlById(id), {
            method: 'DELETE'
        });
        return res;
    }
    async exists(id) {
        let res;
        try{
            await fetch(this.#getUrlById(id));
            res = true;
        } catch(err) {
            console.log(err); 
            res = false;   
        }
        return res;
    }
    async getCourse(id) {
        const response = await fetch(this.#getUrlById(id));
        return await response.json();
    }
    #getUrlById(id) {
        return `${this.#url}/${id}`;
    }
}