import * as client from "../client";
import {useState, useEffect } from "react"
import {useQuiz} from "./QuizContext"
import "../../../../index.css"

function DetailsTab() {
	const {quiz, setQuiz} = useQuiz()
	const [quizTypes, setQuizTypes] = useState([])
	const [assignmentGroups, setAssignmentGroups] = useState([])

	const fetchQuizTypes = async () => {
		const fetchedQuizTypes = await client.getQuizTypes()
		setQuizTypes(fetchedQuizTypes)
	}

	const fetchAssignmentGroups = async () => {
		const fetchedAssignmentGroups = await client.getAssignmentGroups()
		setAssignmentGroups(fetchedAssignmentGroups)
	}

	useEffect(() => {
		fetchQuizTypes()
		fetchAssignmentGroups()
	}, [])
	
  return (
	<div>
		{quiz &&
		<form>
			<div>
				<div>
					<input className="form-control" value={quiz.title} onChange={(e) => setQuiz({...quiz, title: e.target.value})}></input>
				</div>

				<div>
					{/*TODO: Replace with full WYSIWYG editor*/}
					<textarea className="form-control" value={quiz.description} onChange={(e) => setQuiz({...quiz, description: e.target.value})}></textarea>
				</div>

				<div>
					<div className="form-group">
						<label className="form-label" htmlFor="quiz-type">Quiz Type</label>
						<select className="form-select" id="quiz-type" value={quiz.quizType} onChange={(e) => setQuiz({...quiz, quizType: e.target.value})}>
							{quizTypes.map((quizType, index) => {
								return <option key={index} value={quizType}>{quizType}</option>
							})}
						</select>
					</div>

					<div className="form-group">
						<label className="form-label" htmlFor="assignment-group">Assignment Group</label>
						<select className="form-select" id="assignment-group" value={quiz.assignmentGroup} onChange={(e) => setQuiz({...quiz, assignmentGroup: e.target.value})}>
							{assignmentGroups.map((assignmentGroup, index) => {
								return <option key={index} value={assignmentGroup}>{assignmentGroup}</option>
							})}
						</select>
					</div>

					<div className="form-group">
						<label className="form-label" htmlFor="options">Options</label>
						<div id="options">
							<div className="form-group">
								<label className="form-check-label" htmlFor="shuffle-answers">Shuffle Answers</label>
								<input id="shuffle-answers" className="form-check" type="checkbox" checked={quiz.shuffleAnswers} onChange={(e) => setQuiz({...quiz, shuffleAnswers: e.target.checked})} />
							</div>

							<div className="form-group">
								<label className="form-label" htmlFor="time-limit">Time Limit</label>
								<input id="time-limit" type="number" value={quiz.timeLimit} onChange={(e) => setQuiz({...quiz, timeLimit: e.target.value})} /> Minutes
							</div>

							<div className="form-group">
								<label className="form-check-label" htmlFor="multiple-attempts">Multiple Attempts</label>
								<input id="multiple-attempts" className="form-check" type="checkbox" checked={quiz.multipleAttempts} onChange={(e) => setQuiz({...quiz, multipleAttempts: e.target.checked})} />
							</div>
						</div>
					</div>
				</div>

				<div className="form-group">
					<label className="form-label" htmlFor="assign">Assign</label>
					<div id="assign">
						<div className="form-group">
							<label className="form-label" htmlFor="due-date">Due Date</label>
							<input id="due-date" type="date" value={quiz.dueDate} onChange={(e) => setQuiz({...quiz, dueDate: e.target.value})} />
						</div>
						<div className="form-group">
							<label className="form-label" htmlFor="available-date">Available Date</label>
							<input id="available-date" type="date" value={quiz.availableDate} onChange={(e) => setQuiz({...quiz, availableDate: e.target.value})} />
						</div>
						<div className="form-group">
							<label className="form-label" htmlFor="until-date">Until Date</label>
							<input id="until-date" type="date" value={quiz.untilDate} onChange={(e) => setQuiz({...quiz, untilDate: e.target.value})} />
						</div>
					</div>
				</div>

			</div>
		</form>
		}
	</div>
  );
}

export default DetailsTab;
