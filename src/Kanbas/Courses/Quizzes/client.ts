import axios from "axios"

axios.interceptors.request.use(config => {
	const data = config.data
	
	if (data && data.dueDate) {
		data.dueDate = localeToUTC(data.dueDate, 'end')
		data.availableDate = localeToUTC(data.availableDate, 'start')
		data.untilDate = localeToUTC(data.untilDate, 'end')
	} 

	return config
})

axios.interceptors.response.use(response => {
	const data = response.data

	if (data && data.dueDate) {
		data.dueDate = new Date(data.dueDate).toLocaleDateString('en-CA', {
			year: 'numeric', month: '2-digit', day: '2-digit'
		}).replaceAll("/", "-")

		data.availableDate = new Date(data.availableDate).toLocaleDateString('en-CA', {
			year: 'numeric', month: '2-digit', day: '2-digit'
		}).replaceAll("/", "-")

		data.untilDate = new Date(data.untilDate).toLocaleDateString('en-CA', {
			year: 'numeric', month: '2-digit', day: '2-digit'
		}).replaceAll("/", "-")
	}

	return response
})



const API_BASE = process.env.REACT_APP_API_BASE_ASIX
const COURSES_API = `${API_BASE}/api/courses`
const QUIZZES_API = `${API_BASE}/api/quizzes`

const localeToUTC = (date, time: string) => {
	const [ year, month, day ] = date.split("-")

	if (time == 'end') {
		return new Date(parseInt(year), parseInt(month) - 1, parseInt(day), 23, 59, 59, 999)
	} else if (time == 'start') {
		return new Date(parseInt(year), parseInt(month) - 1, parseInt(day), 0, 0, 0, 0)
	}

}

export const findQuizzesForCourse = async (courseId: string) => {
	const response = await axios.get(`${COURSES_API}/${courseId}/quizzes`)
	return response.data
}

export const findQuizById = async (quizId: string) => {
	const response = await axios.get(`${QUIZZES_API}/${quizId}`)
	return response.data
}

export const findQuestionById = async (quizId: string, questionId: string) => {
	const response = await axios.get(`${QUIZZES_API}/${quizId}/${questionId}`)
	return response.data
}

export const updateQuestion = async (quizId: string, questionId: string, newQuestion) => {
	const response = await axios.put(`${QUIZZES_API}/${quizId}/${questionId}`, newQuestion)
	return response.data
}

export const addQuestion = async (quizId: string, question) => {
	const response = await axios.post(`${QUIZZES_API}/${quizId}`, question)
	return response.data
}

export const createQuiz = async (courseId) => {
	const response = await axios.post(`${COURSES_API}/${courseId}/quizzes`)
	return response.data
}

export const updateQuiz = async (quiz) => {
	const response = await axios.put(`${QUIZZES_API}/${quiz._id}`, quiz)
	return response.data
}

export const deleteQuiz = async (quizId) => {
	const response = await axios.delete(`${QUIZZES_API}/${quizId}`)
	return response.data
}

export const getQuizTypes = async () => {
	const response = await axios.get(`${API_BASE}/api/quizTypes`)
	return response.data
}

export const getAssignmentGroups = async () => {
	const response = await axios.get(`${API_BASE}/api/quizAssignmentGroups`)
	return response.data
}

export const getQuestionTypes = async () => {
	const response = await axios.get(`${API_BASE}/api/quizQuestionTypes`)
	return response.data
}

export const findQuizzesForCourseByType = async (courseId: string, type: string) => {
	const response = await axios.get(`${COURSES_API}/${courseId}/quizzes?type=${type}`)
	return response.data
}

export const findQuizzesForCourseByAssignmentGroup = async (courseId: string, group: string) => {
	const response = await axios.get(`${COURSES_API}/${courseId}/quizzes?group=${group}`)
	return response.data
}
