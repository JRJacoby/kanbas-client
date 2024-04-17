import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import * as client from '../client';
import "../../../../index.css"
import "../index.css"
import Question from '../QuizEditor/Question'
import { FaExclamationCircle } from 'react-icons/fa';

function QuizPreview() {
	const [quiz, setQuiz] = useState(null);
	const [questionNum, setQuestionNum] = useState(1);
	const { quizId } = useParams();
	const started = new Date().toLocaleString();

	const fetchQuiz = async () => {
		console.log(`fetchQuiz called with quizId: ${quizId}`);
		const fetchedQuiz = await client.findQuizById(quizId);
		console.log(`fetchedQuiz: ${JSON.stringify(fetchedQuiz)}`);
		setQuiz(fetchedQuiz);
	}

	useEffect(() => {
		fetchQuiz();
	}, []);

	return (
		<div>
			{quiz && quiz.questions.length > 0 &&
			<div>
				<div>
					<h2>{quiz.title}</h2>
				</div>

				<div className="d-flex align-items-center my-2 py-2 jj-red-div">
					<FaExclamationCircle className="text-danger mx-1" />
					<p className="my-0">This is a preview of the published version of the quiz.</p>
				</div>

				<div>
					<p>Started {started}</p>
					<h2>Quiz Instructions</h2>
				</div>

				<hr />

				<div className="px-5">
					<div className="d-flex align-items-center justify-content-between jj-grey-div px-3 py-2">
						<p className="py-0 my-0"><b>Question {questionNum}</b></p>
						<p className="py-0 my-0">{quiz.questions[questionNum - 1].points} pts</p>
					</div>

					<div className="jj-lightgrey-border py-3 px-3">
						<Question questionNum={quiz.questions[questionNum - 1].questionNum} forcePreview={true} />
					</div>
				</div>

				<div className="d-flex justify-content-between">
					<div>{questionNum > 1 && <button className="btn btn-secondary my-2" onClick={() => setQuestionNum(questionNum - 1)}>Previous</button>}</div>
					<div>{questionNum < quiz.questions.length && <button className="btn btn-secondary my-2" onClick={() => setQuestionNum(questionNum + 1)}>Next</button>}</div>
				</div>

				<div className="d-flex justify-content-end">
					<button className="btn btn-secondary">Submit Quiz</button>
				</div>
			</div>
			}
		</div>
	)
}

export default QuizPreview;
