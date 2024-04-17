import "../../../../index.css"
import { useNavigate, useParams } from "react-router-dom"
import {useEffect, useState} from "react"
import * as client from "../client"
import QuizGroup from "./QuizGroup"

function QuizList() {
	const navigate = useNavigate();

	const [assignmentGroups, setAssignmentGroups] = useState([])
	const [quizzes, setQuizzes] = useState<any>([])
	const { courseId } = useParams();
	
	const fetchAssignmentGroups = async () => {
		const assignmentGroups = await client.getAssignmentGroups()
		setAssignmentGroups(assignmentGroups)
	}

	const fetchQuizzes = async () => {
		const quizzes = await client.findQuizzesForCourse(courseId)
		setQuizzes(quizzes)
	}

	useEffect(() => {
		fetchAssignmentGroups()
		fetchQuizzes()
	}, [])
	
	const goToDetails = async () => {
		const newQuiz = await client.createQuiz(courseId)
		navigate(`/Kanbas/Courses/${courseId}/Quizzes/${newQuiz._id}/Details`)
	}

	return (
		<div>
			<div className="d-flex justify-content-end">
				<button className="btn btn-danger" onClick={goToDetails}>+ Quiz</button>
			</div>

			<hr />

			{
				quizzes.length === 0 ? (<h2>Click + Quiz to add a quiz</h2>) : (
					<ul className="px-5">
					{assignmentGroups.map((assignmentGroup, index) => {return <li key={index}><QuizGroup assignmentGroup={assignmentGroup}/> </li>})}
					</ul>
				)
			}

		</div>
	)
}

export default QuizList;

