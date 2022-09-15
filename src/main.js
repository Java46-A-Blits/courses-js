import courseData from './config/courseData.json'
import College from './services/college';
import Courses from './services/courses';
import FormHandler from './ui/form_handler';
import TableHandler from './ui/table_handler';
import { getRandomCourse } from './utils/randomCourse';
const N_COURSES = 5;
function createCourses() {
    const courses = [];
    for (let i = 0; i < N_COURSES; i++) {
        courses.push(getRandomCourse(courseData));
    }
    return courses
}
const courses = createCourses();

const dataProvider = new Courses(courseData.minId, courseData.maxId, courses);
const dataProcessor = new College(dataProvider, courseData);
const tableHandler = new TableHandler([
    {key: 'id', displayName: 'ID'},
    {key: 'name', displayName: 'Course Name'},
    {key: 'lecturer', displayName: 'Lecturer Name'},
    {key: 'cost', displayName: "Cost (ILS)"},
    {key: 'hours', displayName: "Course Duration(hrs)"}
],"courses-table");

const formHandler = new FormHandler("courses-form", "alert");
formHandler.addHandler(course => {
    const res = dataProcessor.addCourse(course); // course -> 'data'  ==> created object from  a new entry in form_handler.js
    // dataProcessor is a College object which has method 'add Course' in it,  and it's getting dataProvider which is 
    // a 'Courses' object which has a method '.add' in it (which is adding a new course + random id of it)
    if (typeof(res) !== 'string') {
   
        return '';
    }
    return res;
})
formHandler.fillOptions("course-name-options", courseData.courses);
formHandler.fillOptions("lecturer-options", courseData.lectors);
// tableHandler.showTable(courses);   // ->  removed as we want to see the table only when we press 'show courses'
window.showForm = ()=> {
    formHandler.show();
    tableHandler.hideTable();
}
window.showCourses = ()=> {
    tableHandler.showTable(dataProcessor.getAllCourses());
    formHandler.hide();
}




