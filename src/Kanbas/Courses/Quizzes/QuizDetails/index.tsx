import {useParams, useNavigate} from "react-router"
import {useState, useEffect} from "react"
import "../../../../index.css"
import "../index.css"
import * as client from "../client"
import {useQuiz} from "../QuizEditor/QuizContext"

function QuizDetails() {
	const { quizId, courseId } = useParams()
	const navigate = useNavigate()
	const {quiz, setQuiz} = useQuiz()
	const [valuesToDisplay, setValuesToDisplay] = useState<any>([])
	
	const propertiesToDisplay = [
	  "Quiz Type",
	  "Points",
	  "Assignment Group",
	  "Shuffle Answers",
	  "Time Limit",
	  "Multiple Attempts",
	  "View Responses",
	  "Show Correct Answers",
	  "One Question at a Time",
	  "Require Respondus LockDown Browser",
	  "Required to View Quiz Results",
	  "Webcam Required",
	  "Lock Questions After Answering"
	];

	const togglePublish = async () => {
		let newQuiz
		if (quiz.published) {
			newQuiz = await client.updateQuiz({...quiz, published: false})
		} else {
			newQuiz = await client.updateQuiz({...quiz, published: true})
		}

		setQuiz(newQuiz)
	}

	const goToPreview = () => {
		navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Preview`)
	}

	const goToEditor = () => {
		navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Editor`)
	}

	const fetchQuiz = async () => {
		const fetchedQuiz = await client.findQuizById(quizId)
		setValuesToDisplay([
		  fetchedQuiz.quizType,
		  fetchedQuiz.points,
		  fetchedQuiz.assignmentGroup,
		  fetchedQuiz.shuffleAnswers,
		  fetchedQuiz.timeLimit,
		  fetchedQuiz.multipleAttempts,
		  fetchedQuiz.viewResponses,
		  fetchedQuiz.showCorrectAnswers,
		  fetchedQuiz.oneQuestionAtATime,
		  fetchedQuiz.lockdownBrowserRequired,
		  fetchedQuiz.requiredToViewResults,
		  fetchedQuiz.webcamRequired,
		  fetchedQuiz.lockQuestionsAfterAnswering
		])
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
				{quiz.published ? 
					<button className="btn btn-success" onClick={togglePublish}>Published</button> :
					<button className="btn btn-danger" onClick={togglePublish}>Unpublished</button>
				}
				<button className="btn btn-secondary" onClick={goToPreview}>Preview</button>
				<button className="btn btn-secondary" onClick={goToEditor}>Edit</button>
			</div>

			<hr />

			<div className="d-flex justify-content-start">
				<h1>{quiz.title}</h1>
			</div>

			<div className="d-flex justify-content-start">
				<div>
					<ul className="jj-right-justified-list">
						{propertiesToDisplay.map((property) => {
							return (
								<li key={property}><b >{property}</b></li>
							)
						})}
					</ul>
				</div>

				<div className="d-flex justify-content-start">
					<ul className="text-left">
						{valuesToDisplay.map((value, index) => {
							return (
								<li key={index}>{value.toString()}</li>
							)
						})}
					</ul>
				</div>
			</div>

			<div>
				<table className="table">
					<thead>
						<tr>
							<th>Due</th>
							<th>Available from</th>
							<th>Until</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>{quiz.dueDate}</td>
							<td>{quiz.availableDate}</td>
							<td>{quiz.untilDate}</td>
						</tr>
					</tbody>
				</table>
			</div>
			</div>
		}
		</div>
	)
}

export default QuizDetails;
