import courseData from './config/courseData.json'
import College from './services/college';
import { dataProvider } from './config/services-config';
import FormHandler from './ui/form_handler';
import TableHandler from './ui/table_handler';
import { getRandomCourse } from './utils/randomCourse';
import _ from 'lodash' 
import NavigatorButtons from './ui/navigator_buttons';
import Spinner from './ui/spinner';
const statisticsColumnDefinition = [
    {key: 'minInterval', displayName: 'From'},
    {key: 'maxInterval', displayName: 'To'},
    {key: 'amount', displayName: 'Amount'}
]

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
const spinner = new Spinner("spinner");

async function asynchRequestWithSpinner(asyncFn) {
    spinner.start();
    const res = await asyncFn();
    spinner.stop();
    return res;
}

formHandler.addHandler(async course => {
    const res = await asynchRequestWithSpinner(dataProcessor.addCourse.bind(dataProcessor, course));
     // course -> 'data'  ==> created object from  a new entry in form_handler.js
    // dataProcessor is a College object which has method 'addCourse' in it,  and it's getting dataProvider which is 
    // a 'Courses' object which has a method '.add' in it (which is adding a new course + random id of it)
    if (typeof(res) !== 'string') { /// in the case the object 'course' returned (i.e - no  error and addhandler added course )
   
        return '';
    }
    return res; // otherwise will return a string message 
});

generationHandler.addHandler(async generation=> {
    for(let i=0; i<generation.nCourses; i++){
      await asynchRequestWithSpinner(dataProcessor.addCourse.bind(dataProcessor, getRandomCourse(courseData) ));
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
window.showCourses = async ()=> {
    hide();
    navigator.setActive(1);
    tableHandler.showTable
    (await asynchRequestWithSpinner(dataProcessor.getAllCourses.bind(dataProcessor)))
                                                                 // getAllCourses
                                                                 //still works??? _.sortBy will  sort courses by 'name' 
                                                                 //in groups and by 'id' inside the groups
 } 
window.showHoursStatistics = async ()=> {
    hide();
    navigator.setActive(2)
    tableHoursStatistics.showTable(await asynchRequestWithSpinner
        (dataProcessor.getHoursStatistics.bind(dataProcessor,courseData.hoursInterval)) );
}
window.showCostStatistics = async ()=> {
    hide();
    navigator.setActive(3);
    tableCostStatistics.showTable(await asynchRequestWithSpinner
        (dataProcessor.getCostStatistics.bind(dataProcessor, courseData.costInterval)) );
}
window.sortCourses = async (key)=> {
    tableHandler.showTable( await asynchRequestWithSpinner
        (dataProcessor.sortCourses.bind(dataProcessor, key)) )
}
window.removeCourse = async (id)=> {
    if (window.confirm(`you are going to delete a course id: ${id}`)){
        await dataProcessor.removeCourse(+id);
        tableHandler.showTable(await asynchRequestWithSpinner(dataProcessor.getAllCourses.bind(dataProcessor))) 
    }
}
window.showGeneration = ()=>{
    hide();
    navigator.setActive(4);
    generationHandler.show();
}
 