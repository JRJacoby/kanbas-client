import {useQuiz} from '../QuizContext';
import "../../../../../index.css"
import {useState, useEffect} from 'react';
import * as client from "../../client"

function FillInTheBlanksEdit({ questionNum }) {
	const {quiz, updateQuestion, setQuestionType} = useQuiz();
	const question = quiz.questions.find((question) => question.questionNum === questionNum)
	const [currentQuestion, setCurrentQuestion] = useState({...question});
	const [questionTypes, setQuestionTypes] = useState([])

	const fetchQuestionTypes = async () => {
		const questionTypes = await client.getQuestionTypes()
		setQuestionTypes(questionTypes)
	}

	useEffect(() => {
		fetchQuestionTypes()
	}, [])

	const changeQuestionType = async (questionType) => {
		setQuestionType(question, questionType)
	}

	const cancelEdit = () => {
		updateQuestion({...question, mode: 'Preview'})
	}

	const saveEdit = async () => {
		updateQuestion({...currentQuestion, mode: 'Preview'})
	}

	const typeMap = {
		'trueFalse': 'True/False',
		'multipleChoice': 'Multiple Choice',
		'fillInTheBlanks': 'Fill in the Blanks'
	}

	return (
		<div>
			<div className="d-flex justify-content-between">
				<div>
				<input value={currentQuestion.title} onChange={(e) => setCurrentQuestion({...currentQuestion, title: e.target.value})}/>
				<select value={currentQuestion.questionType} onChange={(e) => changeQuestionType(e.target.value)}>
					{questionTypes.map((questionType, index) => (
						<option key={index} value={questionType}>{typeMap[questionType]}</option>
					))}
				</select>
				</div>
				pts: <input type="number" min="0" value={currentQuestion.points} onChange={(e) => setCurrentQuestion({...currentQuestion, points: e.target.value})}/>
			</div>

			<div>
				<textarea value={currentQuestion.questionText} onChange={(e) => setCurrentQuestion({...currentQuestion, questionText: e.target.value})}/>
			</div>

			<div>
				{currentQuestion.answers.map((answer, index) => {
					return (
						<div>
							Possible Answer: <input value={answer} onChange={(e) => {
								const newAnswers = [...currentQuestion.answers]
								newAnswers[index] = e.target.value
								setCurrentQuestion({...currentQuestion, answers: newAnswers})
							} }/>
							<button onClick={() => {
								const newAnswers = [...currentQuestion.answers]
								newAnswers.splice(index, 1)
								setCurrentQuestion({...currentQuestion, answers: newAnswers})
							}}>Delete</button>
						</div>
					)
				})}
				<button onClick={() => {
					const newAnswers = [...currentQuestion.answers]
					newAnswers.push("")
					setCurrentQuestion({...currentQuestion, answers: newAnswers})
					}}>Add Answer
				</button>
			</div>

			<div className="d-flex justify-content-start">
				<button className="btn btn-secondary" onClick={cancelEdit}>Cancel</button>
				<button className="btn btn-danger" onClick={saveEdit}>Update Question</button>
			</div>
		</div>
	)
}

export default FillInTheBlanksEdit;
