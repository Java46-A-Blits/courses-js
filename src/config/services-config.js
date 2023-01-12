import courseData from './courseData.json'
// import Courses from '../services/courses'
import CoursesRest from '../services/courses_rest'
// export const dataProvider = new Courses(courseData.minId, courseData.maxId )
export const URL = 'http://localhost:3500/courses';
export const dataProvider = new CoursesRest(URL);