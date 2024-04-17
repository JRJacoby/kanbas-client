import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import * as client from '../client';
import "../../../../index.css"
import Question from '../QuizEditor/Question'

function QuizPreview() {
	const [quiz, setQuiz] = useState(null);
	const [questionNum, setQuestionNum] = useState(1);
	const { quizId } = useParams();
	const started = Date.now()

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
						<Question questionNum={quiz.questions[questionNum - 1].questionNum} forcePreview={true} />
					</div>
				</div>

				<div className="d-flex justify-content-between">
					<div>{questionNum > 1 && <button className="btn btn-secondary" onClick={() => setQuestionNum(questionNum - 1)}>Previous</button>}</div>
					<div>{questionNum < quiz.questions.length && <button className="btn btn-secondary" onClick={() => setQuestionNum(questionNum + 1)}>Next</button>}</div>
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
