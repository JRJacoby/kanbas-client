import {useQuiz} from '../QuizContext';
import "../../../../../index.css"
import "../../index.css"
import {useState, useEffect} from 'react';
import * as client from "../../client"
import { Editor } from '@tinymce/tinymce-react';

const apikey = process.env.REACT_APP_TINYMCE_API_KEY

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
			{currentQuestion &&
			<div>
			<form onSubmit={(e) => e.preventDefault()}>
			<div className="d-flex justify-content-between mb-3 pb-3 jj-thin-bottom-border">
				<div className="d-flex">
					<input className="form-control me-3" value={currentQuestion.title} onChange={(e) => setCurrentQuestion({...currentQuestion, title: e.target.value})}/>
					<select className="form-select" value={currentQuestion.questionType} onChange={(e) => changeQuestionType(e.target.value)}>
						{questionTypes.map((questionType, index) => (
							<option key={index} value={questionType}>{typeMap[questionType]}</option>
						))}
					</select>
				</div>
				<div className="d-flex align-items-center">
					<label className="form-label me-2" htmlFor="points">pts: </label>
					<input className="form-control" id="points" type="number" min="0" value={currentQuestion.points} onChange={(e) => setCurrentQuestion({...currentQuestion, points: e.target.value})}/>
				</div>
			</div>

			<div className="mb-3">
				<Editor apiKey={apikey} 
				onEditorChange={
					(content, editor) => {
						setCurrentQuestion({...currentQuestion, questionText: content})
					}
				
				}
				value={currentQuestion.questionText}/>
			</div>

			<div className="mb-4">
				{currentQuestion.answers.map((answer, index) => {
					return (
						<div className="d-flex align-items-center my-2">
							<label className="me-1" htmlFor={`answer-${index + 1}`}>Answer {index + 1}</label>
							<input id={`answer-${index + 1}`} className="form-control me-3 w-25" value={answer} onChange={(e) => {
								const newAnswers = [...currentQuestion.answers]
								newAnswers[index] = e.target.value
								setCurrentQuestion({...currentQuestion, answers: newAnswers})
							} }/>
							<button className="btn btn-secondary" onClick={() => {
								const newAnswers = [...currentQuestion.answers]
								newAnswers.splice(index, 1)
								setCurrentQuestion({...currentQuestion, answers: newAnswers})
							}}>Delete</button>
						</div>
					)
				})}
				<button className="btn btn-secondary" onClick={() => {
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
			</form>
			</div>
			}
		</div>
	)
}

export default FillInTheBlanksEdit;
