import { Routes, useParams, Navigate, Route } from "react-router-dom";
import {useState, useEffect} from "react"
import axios from "axios"
import CourseNavigation from "./Navigation";
import "./index.css";
import Breadcrumbs from "./Breadcrumbs";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import Grades from "./Grades";
import Quizzes from "./Quizzes";

const API_BASE = process.env.REACT_APP_API_BASE_ASIX

// TODO: Should I be replacing these example 'anys' with something more specific?
function Courses() {
    const { courseId } = useParams();
	const COURSES_API = `${API_BASE}/api/courses`
    const [course, setCourse] = useState<any>({_id: ""})
	
	const findCourseById = async (courseId?: string) => {
		const response = await axios.get(`${COURSES_API}/${courseId}`)
		setCourse(response.data)
	}

	useEffect(() => {
		findCourseById(courseId)
	}, [courseId])

    return (
        <div>
            <Breadcrumbs />
            <hr />
            <div className="d-flex flex-row">
                <CourseNavigation />
                <div className="flex-grow-1">
                    <div>
                        <Routes>
                            <Route path="/" element={<Navigate to="Home" />} />
                            <Route path="/Home" element={<Home />} />
                            <Route path="/Modules" element={<Modules/>} />
                            <Route path="/Piazza" element={<h1>Piazza</h1>} />
                            <Route path="/Zoommeetings" element={<h1>Zoom Meetings</h1>} />
                            <Route path="/Assignments" element={<Assignments />} />
                            <Route path="/Assignments/:assignmentId" element={<AssignmentEditor />} />
                            <Route path="/Quizzes/*" element={<Quizzes />} />
                            <Route path="/Grades" element={<Grades />} />
                            <Route path="/People" element={<h1>People</h1>} />
                            <Route path="/Panoptovideo" element={<h1>Panopto Video</h1>} />
                            <Route path="/Discussions" element={<h1>Discussions</h1>} />
                            <Route path="/Announcements" element={<h1>Announcements</h1>} />
                            <Route path="/Pages" element={<h1>Pages</h1>} />
                            <Route path="/Files" element={<h1>Files</h1>} />
                            <Route path="/Rubrics" element={<h1>Rubrics</h1>} />
                            <Route path="/Outcomes" element={<h1>Outcomes</h1>} />
                            <Route path="/Collaborations" element={<h1>Collaborations</h1>} />
                            <Route path="/Syllabus" element={<h1>Syllabus</h1>} />
                            <Route path="/Settings/CourseDetails" element={<h1>Settings</h1>} />
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Courses;
