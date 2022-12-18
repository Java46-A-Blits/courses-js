import courseData from './config/courseData.json'
import College from './services/college';
import Courses from './services/courses';
import FormHandler from './ui/form_handler';
import TableHandler from './ui/table_handler';
import { getRandomCourse } from './utils/randomCourse';
import _ from 'lodash' 
import NavigatorButtons from './ui/navigator_buttons';
const statisticsColumnDefinition = [
    {key: 'minInterval', displayName: 'From'},
    {key: 'maxInterval', displayName: 'To'},
    {key: 'amount', displayName: 'Amount'}
]
const dataProvider = new Courses(courseData.minId, courseData.maxId);
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
const generationHandler = new FormHandler("generation-form", "alert");
const navigator = new NavigatorButtons(["0","1","2","3","4"]);

formHandler.addHandler(course => {
    const res = dataProcessor.addCourse(course); // course -> 'data'  ==> created object from  a new entry in form_handler.js
    // dataProcessor is a College object which has method 'addCourse' in it,  and it's getting dataProvider which is 
    // a 'Courses' object which has a method '.add' in it (which is adding a new course + random id of it)
    if (typeof(res) !== 'string') { /// in the case the object 'course' returned (i.e - no  error and addhandler added course )
   
        return '';
    }
    return res; // otherwise will return a string message 
});
generationHandler.addHandler(generation=> {
    for(let i=0; i<generation.nCourses; i++){
        dataProcessor.addCourse(getRandomCourse(courseData));
    }
    return '';
})

formHandler.fillOptions("course-name-options", courseData.courses);
formHandler.fillOptions("lecturer-options", courseData.lectors);
function hide(){
    tableHandler.hideTable();
    formHandler.hide();
    generationHandler.hide();
    tableHoursStatistics.hideTable();
    tableCostStatistics.hideTable();
}
window.showForm = ()=> {
    hide();
    navigator.setActive(0);
    formHandler.show();
}
window.showCourses = ()=> {
    hide();
    navigator.setActive(1);
    tableHandler.showTable(dataProcessor.getAllCourses()); // getAllCourses() instead of dataProcessor.getAllCourses() 
                                                           //still works??? _.sortBy will  sort courses by 'name' 
                                                           //in groups and by 'id' inside the groups
 } 
window.showHoursStatistics = ()=> {
    hide();
    navigator.setActive(2)
    tableHoursStatistics.showTable(dataProcessor.getHoursStatistics(courseData.hoursInterval));
}
window.showCostStatistics = ()=> {
    hide();
    navigator.setActive(3);
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
window.showGeneration = ()=>{
    hide();
    navigator.setActive(4);
    generationHandler.show();
}
 