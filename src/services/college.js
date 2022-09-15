// Data processor
export default class College {
    #courseData
    #courses
    constructor(courses, courseData) {
        this.#courses = courses;
        this.#courseData = courseData;
    }
    addCourse(course) {
        // TODO validation of the course data
        // if course is valid then course will be added :
        // this.#courses.add(course)
        // if course invalid then  the method returns full message descriibing what's wrong.
        // converting from string to proper types,  cuz when we enter it in a form they are just strings but not numbers. 
        course.hours = +course.hours;
        course.cost = +course.cost;
        course.openingDate = new Date(course.openingDate);
        const validationMessage = this.#getValidationMessage(course);
        if (!validationMessage) {         // !'' -> true 
            return this.#courses.add(course);    // courses is an object referencing to  data provisioning (and has "add" method)
        }
        return validationMessage;
    }
    #getValidationMessage(course) {
        // TODO validate course
        const {minCost, maxCost, minHours, maxHours, minYear, maxYear, lectors, courses}  = this.#courseData; // destructuring
        const {cost, hours, openingDate, lecturer, name} = course;                                            // destructuring

        let message = '';
        message += cost < minCost || cost > maxCost ?
         `wrong input, cost has to be in the range [${minCost} - ${maxCost}] <br>` : '';
        message += hours < minHours || hours > maxHours?
         ` wrong input, hours has to be in the range [${minHours} - ${maxHours}] <br>` : '';
        const year = openingDate.getFullYear()
         message += year < minYear || year > maxYear ?
         `wrong entry, year has to be in the range [${minYear} to ${maxYear}] <br>` : '';
        message += !lectors.includes(lecturer) ? 
         `wrong entry,  lecturer has to  be one of :${lectors} <br>` : '';
        message += !courses.includes(name) ? 
         `wrong entry, course name has to  be one of: ${courses}`:'';
        return message;
    }
    getAllCourses(){
        return this.#courses.get();
    }
}