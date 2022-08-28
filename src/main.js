import courseData from './config/courseData.json'
import College from './services/college';
import Courses from './services/courses';
import FormHandler from './ui/form_handler';
import { getRandomCourse } from './utils/randomCourse';
const N_COURSES = 5;
function createCourses (){
    const courses = [];
    for(let i=0; i<N_COURSES; i++){
        courses.push(getRandomCourse(courseData) );
    }
    return courses
}
function getCourseItems(courses) {
    return courses.map(c => `<li>${JSON.stringify(c)}</li>`).join('');
}
// TODO rendering inside <ul>

const ulElem = document.getElementById("courses");
const courses = createCourses();
ulElem.innerHTML = `${getCourseItems(courses)}`;
const dataProvider = new Courses(courses);
const dataProcessor = new College(dataProvider, courseData);
const formHandler = new FormHandler("courses-form", "alert");
formHandler.addHandler(course=> {
    const message = dataProcessor.addCourse(course); // course -> 'data'  == created object from  a new entry in form_handler.js
    course.id=10000;
    ulElem.innerHTML += `<li>${JSON.stringify(course)}</li>`; // adding a new course to the html list <ul id="courses"></ul> 
    }
  )




