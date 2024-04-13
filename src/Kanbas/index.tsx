import { Routes, Route, Navigate } from 'react-router-dom';
import KanbasNavigation from './Navigation';
import Dashboard from './Dashboard';
import Courses from './Courses';
import Account from './Account';
import { useState, useEffect } from 'react';
import axios from "axios"
import store from './store';
import { Provider } from 'react-redux';

const API_BASE = process.env.REACT_APP_API_BASE_ASIX;

function Kanbas() {
  const [courses, setCourses] = useState<any[]>([])
  const COURSES_API = `${API_BASE}/api/courses`

  const [course, setCourse] = useState({
    _id: "0", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    image: "/images/reactjs.svg"
  });

  const addNewCourse = async () => {
    const response = await axios.post(COURSES_API, course);
	const newCourse = response.data
    setCourses([...courses, newCourse]);
  };
  
  const deleteCourse = async (courseId: string) => {
	await axios.delete(`${COURSES_API}/${courseId}`)
    setCourses(courses.filter(course => course._id !== courseId));
  }

  const updateCourse = async () => {
	const response = await axios.put(`${COURSES_API}/${course._id}`, course)
    setCourses(courses.map(c => c._id === course._id ? course : c));
  }

  const findAllCourses = async () => {
	  const response = await axios.get(COURSES_API)
	  setCourses(response.data)
  }
  
  useEffect(() => {
	  findAllCourses()
  }, [])

  return (
    <Provider store={store}>
      <div className="d-flex">
        <div>
          <KanbasNavigation />
        </div>
        <div style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Navigate to="Dashboard" />} />
            <Route path="Account/*" element={<Account />} />
            <Route path="Dashboard" element={<Dashboard
              courses={courses}
              course={course}
              setCourse={setCourse}
              addNewCourse={addNewCourse}
              deleteCourse={deleteCourse}
              updateCourse={updateCourse} />
            } />
            <Route path="Courses/:courseId/*" element={<Courses/>} />
          </Routes>
        </div>
      </div>
    </Provider>
  );
}
export default Kanbas;
