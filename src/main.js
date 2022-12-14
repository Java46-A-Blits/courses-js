import courseData from './config/courseData.json'
import College from './services/college';
import Courses from './services/courses';
import FormHandler from './ui/form_handler';
import TableHandler from './ui/table_handler';
import { getRandomCourse } from './utils/randomCourse';
import _ from 'lodash' 
const N_COURSES = 5;
const statisticsColumnDefinition = [
    {key: 'minInterval', displayName: 'From'},
    {key: 'maxInterval', displayName: 'To'},
    {key: 'amount', displayName: 'Amount'}
]
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
],"courses-table","sortCourses", "removeCourse");
const tableHoursStatistics = new TableHandler(statisticsColumnDefinition, 'courses-table');
const tableCostStatistics = new TableHandler(statisticsColumnDefinition, 'courses-table');
const formHandler = new FormHandler("courses-form", "alert");
formHandler.addHandler(course => {
    const res = dataProcessor.addCourse(course); // course -> 'data'  ==> created object from  a new entry in form_handler.js
    // dataProcessor is a College object which has method 'addCourse' in it,  and it's getting dataProvider which is 
    // a 'Courses' object which has a method '.add' in it (which is adding a new course + random id of it)
    if (typeof(res) !== 'string') { /// in the case the object 'course' returned (i.e - no  error and addhandler added course )
   
        return '';
    }
    return res; // otherwise will return a string message 
})
formHandler.fillOptions("course-name-options", courseData.courses);
formHandler.fillOptions("lecturer-options", courseData.lectors);
function hide(){
    tableHandler.hideTable();
    formHandler.hide();
    tableHoursStatistics.hideTable();
    tableCostStatistics.hideTable();
}
window.showForm = ()=> {
    hide();
    formHandler.show();
}
window.showCourses = ()=> {
    hide();
    tableHandler.showTable(dataProcessor.getAllCourses()); // getAllCourses() instead of dataProcessor.getAllCourses() 
                                                           //still works??? _.sortBy will  sort courses by 'name' 
                                                           //in groups and by 'id' inside the groups
 } 
window.showHoursStatistics = ()=> {
    hide();
    tableHoursStatistics.showTable(dataProcessor.getHoursStatistics(courseData.hoursInterval));
}
window.showCostStatistics = ()=> {
    hide();
    tableCostStatistics.showTable(dataProcessor.getCostStatistics(courseData.costInterval));
}
window.sortCourses = (key)=> {
    tableHandler.showTable(dataProcessor.sortCourses(key));
}
window.removeCourse = (id)=> {
    if (window.confirm(`you are going to delete a course id: ${id}`)){
        dataProcessor.removeCourse(+id);
        tableHandler.showTable(dataProcessor.getAllCourses());
    }
}
 