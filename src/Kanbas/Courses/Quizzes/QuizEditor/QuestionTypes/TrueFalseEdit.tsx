import {useQuiz} from '../QuizContext';
import "../../../../../index.css"
import {useState, useEffect} from 'react';
import * as client from "../../client"
import { Editor } from '@tinymce/tinymce-react';

const apikey = process.env.REACT_APP_TINYMCE_API_KEY

function TrueFalseEdit({ questionNum }) {
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
				<Editor apiKey={apikey} 
				onEditorChange={
					(content, editor) => {
						setCurrentQuestion({...currentQuestion, questionText: content})
					}
				
				}
				value={currentQuestion.questionText}/>
			</div>

			<div>
				<input type="radio" value="true" name="trueFalse" checked={currentQuestion.answer === "true"} 
					onChange={(e) => setCurrentQuestion({...currentQuestion, answer: e.target.value})}/> True

				<input type="radio" value="false" name="trueFalse" checked={currentQuestion.answer === "false"}
					onChange={(e) => setCurrentQuestion({...currentQuestion, answer: e.target.value})}/> False
			</div>

			<div className="d-flex justify-content-start">
				<button className="btn btn-secondary" onClick={cancelEdit}>Cancel</button>
				<button className="btn btn-danger" onClick={saveEdit}>Update Question</button>
			</div>
		</div>
	)
}

export default TrueFalseEdit;
