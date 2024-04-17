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
	const [shouldSaveAndPublish, setShouldSaveAndPublish] = useState(false)

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
		await save(true)
		navigate(`/Kanbas/Courses/${courseId}/Quizzes`)
	}

	const fetchQuiz = async () => {
		const fetchedQuiz = await client.findQuizById(quizId)

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
					<h5 className="me-3">Points {quiz.points}</h5>
					{quiz.published ? <h5>Published</h5> : <h5>Not Published</h5>}
				</div>
				
				<hr />

				<ul className="nav nav-tabs mb-3" role="tablist">
					<li className="nav-item" role="presentation">
						<button className={`nav-link ${activeTab === 'Details' ? 'active' : 'text-danger'}`} onClick={() => setActiveTab("Details")}>Details</button>
					</li>
					<li className="nav-item" role="presentation">
						<button className={`nav-link ${activeTab === 'Details' ? 'text-danger' : 'active'}`} onClick={() => setActiveTab("Question")}>Questions</button>
					</li>
				</ul>

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
