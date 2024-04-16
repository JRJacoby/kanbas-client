import "../../../../index.css"
import {FaCaretDown} from "react-icons/fa"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import * as client from "../client"
import Quiz from "./Quiz"

function QuizGroup({assignmentGroup}) {
	const [quizzes, setQuizzes] = useState<any>([])
	const { courseId } = useParams()

	const fetchQuizzes = async () => {
		const quizzes = await client.findQuizzesForCourseByAssignmentGroup(courseId, assignmentGroup)
		setQuizzes(quizzes)
	}

	useEffect(() => {
		fetchQuizzes()
	}, [])

	const handleDelete = (quizId) => {
		setQuizzes(quizzes.filter((quiz) => quiz._id !== quizId))
	}

	return (
		<div>
		{quizzes.length > 0 && 
			<div>
				<div className="d-flex justify-content-start">
					<FaCaretDown />
					<h4>{assignmentGroup} Quizzes</h4>
				</div>
				<div>
					<ul>
						{
							quizzes.map((quiz) => {
								return (
									<li key={quiz._id}>
										<Quiz quizId={quiz._id} onDelete={handleDelete} />
									</li>
								)
							})
						}
					</ul>
				</div>
			</div>
		}
		</div>
	)
}

export default QuizGroup;
