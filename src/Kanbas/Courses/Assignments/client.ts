import axios from "axios"

const API_BASE = process.env.REACT_APP_API_BASE_ASIX

const COURSES_API = `${API_BASE}/api/courses`
const ASSIGNMENTS_API = `${API_BASE}/api/assignments`

export interface Assignment {
	_id: String;
	title: String;
	course: String;
}

export const updateAssignment = async (assignment) => {
	const response = await axios.put(`${ASSIGNMENTS_API}/${assignment._id}`, assignment)
	return response.data
}

export const deleteAssignment = async (assignmentId) => {
	console.log(assignmentId)
	const response = await axios.delete(`${ASSIGNMENTS_API}/${assignmentId}`)
	console.log(JSON.stringify(response))
	return response.data
}

export const createAssignment = async (courseId, assignment) => {
	const response = await axios.post(`${COURSES_API}/${courseId}/assignments`, assignment)
	return response.data
}

export const findAssignmentsForCourse = async (courseId: string) => {
	const response = await axios.get(`${COURSES_API}/${courseId}/assignments`)
	return response.data
}
