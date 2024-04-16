import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {useQuiz} from '../QuizEditor/QuizContext';
import * as client from '../client';
import "../../../../index.css"
import Question from '../QuizEditor/Question'

function QuizPreview() {
	const [quiz, setQuiz] = useQuiz();
	const [questionNum, setQuestionNum] = useState(1);
	const { quizId } = useParams();
	const started = Date.now()

	const fetchQuiz = async () => {
		const fetchedQuiz = await client.findQuizById(quizId);
		setQuiz(fetchedQuiz);
	}

	useEffect(() => {
		fetchQuiz();
	}, []);

	return (
		<div>
			{quiz &&
			<div>
				<div>
					<h2>{quiz.title}</h2>
				</div>

				<div>
					<p>! This is a preview of the published version of the quiz.</p>
				</div>

				<div>
					<p>Started {started}</p>
					<h2>Quiz Instructions</h2>
				</div>

				<hr />

				<div>
					<div className="d-flex justify-content-between">
						<p>Question {questionNum}</p>
						<p>{quiz.questions[questionNum - 1].points} pts</p>
					</div>

					<div>
						<Question questionId={quiz.questions[questionNum - 1]._id} />
					</div>
				</div>

				<div className="d-flex justify-content-between">
					{questionNum > 1 && <button className="btn btn-secondary" onClick={() => setQuestionNum(questionNum - 1)}>Previous</button>}
					{questionNum < quiz.questions.length && <button className="btn btn-secondary" onClick={() => setQuestionNum(questionNum + 1)}>Next</button>}
				</div>

				<div className="d-flex justify-conent-end">
					<button className="btn btn-secondary">Submit Quiz</button>
				</div>
			</div>
			}
		</div>
	)
}

export default QuizPreview;
