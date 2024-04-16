import {useQuiz} from '../QuizContext';
import "../../../../../index.css"
import {useState, useEffect} from 'react';
import * as client from "../../client"

function MultipleChoiceEdit({ questionId }) {
	const {quiz, updateQuestion, setQuestionMode, setQuestionType} = useQuiz();
	const question = quiz.questions.find((question) => question._id === questionId)
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
		setQuestionType(questionId, questionType)
	}

	const cancelEdit = () => {
		setQuestionMode(questionId, 'Preview')
	}

	const saveEdit = async () => {
		await client.updateQuestion(quiz._id, questionId, currentQuestion)
		updateQuestion({currentQuestion, mode: 'Preview'})
	}

	const typeMap = {
		'trueFalse': 'True/False',
		'multipleChoice': 'Multiple Choice',
		'fillInTheBlanks': 'Fill in the Blanks'
	}

	return (
		<div>
			{currentQuestion &&
			<div>
				<div className="d-flex justify-content-between">
					<div>
					<input value={currentQuestion.title} onChange={(e) => changeQuestionType(e.target.value)}/>
					<select value={currentQuestion.questionType} onChange={(e) => setCurrentQuestion({...currentQuestion, questionType: e.target.value})}>
						{questionTypes.map((questionType, index) => (
							<option key={index} value={questionType}>{typeMap[questionType]}</option>
						))}
					</select>
					</div>
					pts: <input type="number" min="0" value={currentQuestion.points} onChange={(e) => setCurrentQuestion({...currentQuestion, points: e.target.value})}/>
				</div>

				<div>
					<textarea value={currentQuestion.questionText} onChange={(e) => setCurrentQuestion({...currentQuestion, description: e.target.value})}/>
				</div>

				<div>
					{currentQuestion.choices.map((choice, index) => {
						return (
							<div key={index}>
								<input type="radio" value={choice} name="multipleChoice" checked={currentQuestion.answer === choice} 
									onChange={(e) => setCurrentQuestion({...currentQuestion, answer: e.target.value})}/> 
								<input value={choice} onChange={(e) => {
									let newChoices = [...currentQuestion.choices]
									newChoices[index] = e.target.value
									setCurrentQuestion({...currentQuestion, choices: newChoices})
								}}/>
								<button onClick={() => {
									let newChoices = [...currentQuestion.choices]
									newChoices.splice(index, 1)
									setCurrentQuestion({...currentQuestion, choices: newChoices})
								}}>Delete</button>
							</div>
						)
					})}
				</div>
				<div>
					<button onClick={() => {
						let newChoices = [...currentQuestion.choices]
						newChoices.push("")
						setCurrentQuestion({...currentQuestion, choices: newChoices})
					}}>Add Choice</button>
				</div>

				<div className="d-flex justify-content-start">
					<button className="btn btn-secondary" onClick={cancelEdit}>Cancel</button>
					<button className="btn btn-danger" onClick={saveEdit}>Update Question</button>
				</div>
			</div>
			}
		</div>
	)
}

export default MultipleChoiceEdit;