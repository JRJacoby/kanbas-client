import axios from "axios";
axios.defaults.withCredentials = true

export const BASE_API = process.env.REACT_APP_API_BASE_ASIX;
export const COURSES_API = `${BASE_API}/api/courses`

export interface Course {
	_id: String;
	name: String;
	number: String;
	startDate: String;
	endDate: String;
	image: String;
}

export interface Enrollment {
	_id: String;
	user: String;
	course: String;
}

export const getCourseById = async (courseId: String) => {
	const response = await axios.get(`${COURSES_API}/${courseId}`)
	return response.data
}

export const findEnrollmentsForCourse = async (courseId: String) => {
	const response = await axios.get(`${COURSES_API}/enrollments/${courseId}`)
	return response.data
}
