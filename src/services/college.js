// Data processor
 export default class College{
    #courseData
    #courses
    constructor(courses, courseData){
        this.#courses  = courses;
        this.#courseData = courseData;
    }
    addCourse(course){
        // TODO validation of the course data
        // if course is valid then course will be added :
        // this.#courses.add(course)
        // if course invalid then  the method returns full message descriibing what's wrong.
        // if course is valid:
        const validationMessage = this.#getValidationMessage(course) ;
        if(!validationMessage){
            this.#courses.add(course);    // courses referencing to  data provisioning which has method 'add'
        }
        return validationMessage;
    }
    #getValidationMessage(course){
    // TODO validate 
    }
 }