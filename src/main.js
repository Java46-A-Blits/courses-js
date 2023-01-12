import courseData from './config/courseData.json'
import College from './services/college';
import { dataProvider, URL } from './config/services-config';
import FormHandler from './ui/form_handler';
import TableHandler from './ui/table_handler';
import { getRandomCourse } from './utils/randomCourse';
import _ from 'lodash' 
import NavigatorButtons from './ui/navigator_buttons';
import Spinner from './ui/spinner';
import Alert from './ui/alert';
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
    {key: 'hours', displayName: "Course Duration(hrs)"},
    {key: 'openingDate', displayName: 'Date Available'}
],"courses-table","sortCourses", "removeCourse"); 
const tableHoursStatistics = new TableHandler(statisticsColumnDefinition, 'courses-table');
const tableCostStatistics = new TableHandler(statisticsColumnDefinition, 'courses-table');
const formHandler = new FormHandler("courses-form", "alert");
const generationHandler = new FormHandler("generation-form", "alert");
const navigator = new NavigatorButtons(["0","1","2","3","4"]);
const spinner = new Spinner("spinner");
const alertServerUnavailable = new Alert("server-unavailable")

async function asyncRequestWithSpinner(asyncFn) {
    spinner.start();
    alertServerUnavailable.hideAlert();
    let res;
    try {
         res = await asyncFn();
    } catch (err) {
         hide();
         alertServerUnavailable.showAlert(`${err} server ${URL} is unavailable`, 'danger')
    }
    spinner.stop();
    return res;
}

formHandler.addHandler(async course => {
    const res = await asyncRequestWithSpinner(dataProcessor.addCourse.bind(dataProcessor, course));
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
      await asyncRequestWithSpinner(dataProcessor.addCourse.bind(dataProcessor, getRandomCourse(courseData) ));
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
    (await asyncRequestWithSpinner(dataProcessor.getAllCourses.bind(dataProcessor)))
                                                                 // getAllCourses
                                                                 //still works??? _.sortBy will  sort courses by 'name' 
                                                                 //in groups and by 'id' inside the groups
 } 
window.showHoursStatistics = async ()=> {
    hide();
    navigator.setActive(2)
    tableHoursStatistics.showTable(await asyncRequestWithSpinner
        (dataProcessor.getHoursStatistics.bind(dataProcessor,courseData.hoursInterval)) );
}
window.showCostStatistics = async ()=> {
    hide();
    navigator.setActive(3);
    tableCostStatistics.showTable(await asyncRequestWithSpinner
        (dataProcessor.getCostStatistics.bind(dataProcessor, courseData.costInterval)) );
}
window.sortCourses = async (key)=> {
    tableHandler.showTable( await asyncRequestWithSpinner
        (dataProcessor.sortCourses.bind(dataProcessor, key)) )
}
window.removeCourse = async (id)=> {
    if (window.confirm(`you are going to delete a course id: ${id}`)){
        await asyncRequestWithSpinner (dataProcessor.removeCourse.bind(dataProcessor, +id));
        tableHandler.showTable(await asyncRequestWithSpinner
            (dataProcessor.getAllCourses.bind(dataProcessor))) 
    }
}
window.showGeneration = ()=>{
    hide();
    navigator.setActive(4);
    generationHandler.show();
}
 