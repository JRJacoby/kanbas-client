import {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import DetailsTab from './DetailsTab';
import QuestionsTab from './QuestionsTab';
import { useQuiz } from './QuizContext';
import "../../../../index.css"
import * as client from "../client"

function QuizEditor() {
	const navigate = useNavigate()
	const [activeTab, setActiveTab] = useState("Details")
	const { courseId, quizId } = useParams()
	const {quiz, setQuiz, save, cancel, setQuizDetails} = useQuiz()

	const goToQuizList = async () => {
		cancel()
		navigate(`/Kanbas/Courses/${courseId}/Quizzes`)
	}

	const saveButton = async () => {
		await save()
		navigate(`/Kanbas/Courses/${courseId}/Quizzes`)
	}

	const saveAndPublish = async () => {
		console.log(`save and publish clicked. quiz: ${JSON.stringify(quiz)}`)
		setQuizDetails({...quiz, published: true})
		await save()
		navigate(`/Kanbas/Courses/${courseId}/Quizzes`)
	}

	const fetchQuiz = async () => {
		console.log(`fetchQuiz called with quizId: ${quizId}`)
		const fetchedQuiz = await client.findQuizById(quizId)
		console.log(`fetchedQuiz: ${JSON.stringify(fetchedQuiz)}`)

		fetchedQuiz.questions.forEach((question) => {
			question.mode = 'Preview'
		})

		setQuiz(fetchedQuiz)
	}

	useEffect(() => {
		fetchQuiz()
	}, [])

	return (
		<div>
			{quiz &&
			<div>
				<div className="d-flex justify-content-end">
					<h3>Points {quiz.points}</h3>
					{quiz.published ? <h3>Published</h3> : <h3>Not Published</h3>}
				</div>
				
				<hr />

				<div>
					<button onClick={() => setActiveTab("Details")}>Details</button>
					<button onClick={() => setActiveTab("Questions")}>Questions</button>
				</div>

				{activeTab === "Details" ? <DetailsTab /> : <QuestionsTab />}

				<hr />
				<div className="d-flex justify-content-end">
					<button type="button" className="btn btn-secondary" onClick={goToQuizList}>Cancel</button>
					<button type="button" className="btn btn-secondary" onClick={saveAndPublish}>Save & Publish</button>
					<button type="button" className="btn btn-danger" onClick={saveButton}>Save</button>
				</div>
				<hr />
			</div>
			}
		</div>
	)
}

export default QuizEditor;
