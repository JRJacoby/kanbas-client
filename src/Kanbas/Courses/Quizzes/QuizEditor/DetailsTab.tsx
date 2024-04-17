import * as client from "../client";
import {useState, useEffect } from "react"
import {useQuiz} from "./QuizContext"
import "../../../../index.css"
import {Editor} from '@tinymce/tinymce-react';
import 'react-datepicker/dist/react-datepicker.css'

const apikey = process.env.REACT_APP_TINYMCE_API_KEY

function DetailsTab() {
	const {quiz, setQuizDetails} = useQuiz()
	const [quizTypes, setQuizTypes] = useState([])
	const [assignmentGroups, setAssignmentGroups] = useState([])
	const [showCorrectAnswersOptions, setShowCorrectAnswersOptions] = useState([])

	const fetchQuizTypes = async () => {
		const fetchedQuizTypes = await client.getQuizTypes()
		setQuizTypes(fetchedQuizTypes)
	}

	const fetchAssignmentGroups = async () => {
		const fetchedAssignmentGroups = await client.getAssignmentGroups()
		setAssignmentGroups(fetchedAssignmentGroups)
	}

	const fetchShowCorrectAnswersOptions = async () => {
		const fetchedShowCorrectAnswersOptions = await client.getShowCorrectAnswersOptions()
		setShowCorrectAnswersOptions(fetchedShowCorrectAnswersOptions)
	}

	useEffect(() => {
		fetchQuizTypes()
		fetchAssignmentGroups()
		fetchShowCorrectAnswersOptions()
	}, [])
	
  return (
	<div>
		{quiz &&
		<form>
			<div>
				<div className="form-group">
					<input className="form-control" value={quiz.title} onChange={(e) => setQuizDetails({...quiz, title: e.target.value})}></input>
				</div>

				<div className="form-group">
					<Editor apiKey={apikey} 
					onEditorChange={
						(content, editor) => {
							setQuizDetails({...quiz, description: content})
						}
					
					}
					value={quiz.description}/>
				</div>

				<div className="form-group">
					<label className="form-label" htmlFor="quiz-type">Quiz Type</label>
					<select className="form-select" id="quiz-type" value={quiz.quizType} onChange={(e) => setQuizDetails({...quiz, quizType: e.target.value})}>
						{quizTypes.map((quizType, index) => {
							return <option key={index} value={quizType}>{quizType}</option>
						})}
					</select>
				</div>

				<div className="form-group">
					<label className="form-label" htmlFor="assignment-group">Assignment Group</label>
					<select className="form-select" id="assignment-group" value={quiz.assignmentGroup} onChange={(e) => setQuizDetails({...quiz, assignmentGroup: e.target.value})}>
						{assignmentGroups.map((assignmentGroup, index) => {
							return <option key={index} value={assignmentGroup}>{assignmentGroup}</option>
						})}
					</select>
				</div>

				<div className="form-check form-group">
					<label className="form-check-label" htmlFor="shuffle-answers">Shuffle Answers</label>
					<input id="shuffle-answers" className="form-check-input" type="checkbox" checked={quiz.shuffleAnswers} onChange={(e) => setQuizDetails({...quiz, shuffleAnswers: e.target.checked})} />
				</div>

				<div className="form-group">
					<label className="form-label" htmlFor="time-limit">Time Limit (minutes)</label>
					<input className="form-control" id="time-limit" type="number" value={quiz.timeLimit} onChange={(e) => setQuizDetails({...quiz, timeLimit: e.target.value})} />
				</div>

				<div className="form-check form-group">
					<label className="form-check-label" htmlFor="multiple-attempts">Multiple Attempts</label>
					<input id="multiple-attempts" className="form-check-input" type="checkbox" checked={quiz.multipleAttempts} onChange={(e) => setQuizDetails({...quiz, multipleAttempts: e.target.checked})} />
				</div>

				<div className="form-group">
					<label className="form-label" htmlFor="show-correct-answers">Show Correct Answers</label>
					<select className="form-select" id="show-correct-answers" value={quiz.showCorrectAnswers} onChange={(e) => setQuizDetails({...quiz, showCorrectAnswers: e.target.value})}>
						{showCorrectAnswersOptions.map((option, index) => {
							return <option key={index} value={option}>{option}</option>
						})}
					</select>
				</div>

				<div className="form-group">
					<label className="form-label" htmlFor="due-date">Due Date</label>
					<input id="due-date" type="date" value={quiz.dueDate} onChange={(e) => setQuizDetails({...quiz, dueDate: e.target.value})} />
				</div>
				<div className="form-group">
					<label className="form-label" htmlFor="available-date">Available Date </label>
					<input id="available-date" type="date" value={quiz.availableDate} onChange={(e) => setQuizDetails({...quiz, availableDate: e.target.value})} />
				</div>
				<div className="form-group">
					<label className="form-label" htmlFor="until-date">Until Date </label>
					<input id="until-date" type="date" value={quiz.untilDate} onChange={(e) => setQuizDetails({...quiz, untilDate: e.target.value})} />

				</div>

			</div>
		</form>
		}
	</div>
  );
}

export default DetailsTab;
