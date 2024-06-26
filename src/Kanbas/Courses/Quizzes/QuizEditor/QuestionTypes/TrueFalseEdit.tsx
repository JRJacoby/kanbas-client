import {useQuiz} from '../QuizContext';
import "../../../../../index.css"
import "../../index.css"
import {useState, useEffect} from 'react';
import * as client from "../../client"
import { Editor } from '@tinymce/tinymce-react';

const apikey = process.env.REACT_APP_TINYMCE_API_KEY

function TrueFalseEdit({ questionNum }) {
	const {quiz, updateQuestion, setQuestionType, openQuestionForEditing, restoreOriginalQuestion, closeQuestionForEditing} = useQuiz();
	const question = quiz.questions.find((question) => question.questionNum === questionNum)
	const [currentQuestion, setCurrentQuestion] = useState({...question});
	const [questionTypes, setQuestionTypes] = useState([])

	const fetchQuestionTypes = async () => {
		const questionTypes = await client.getQuestionTypes()
		setQuestionTypes(questionTypes)
	}

	useEffect(() => {
		fetchQuestionTypes()
		openQuestionForEditing(questionNum)
	}, [])

	const changeQuestionType = async (questionType) => {
		setQuestionType(question, questionType)
	}

	const cancelEdit = () => {
		restoreOriginalQuestion(questionNum)
	}

	const saveEdit = async () => {
		closeQuestionForEditing(questionNum)
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

			<div className="form-check">
				<label className="form-label">True</label>
				<input className="form-check-input" type="radio" value="true" name="trueFalse" checked={currentQuestion.answer} 
					onChange={(e) => setCurrentQuestion({...currentQuestion, answer: e.target.value})}/> 
			</div>

			<div className="form-check">
				<label className="form-label">False</label>
				<input className="form-check-input" type="radio" value="false" name="trueFalse" checked={currentQuestion.answer} 
					onChange={(e) => setCurrentQuestion({...currentQuestion, answer: e.target.value})}/> 
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

export default TrueFalseEdit;
