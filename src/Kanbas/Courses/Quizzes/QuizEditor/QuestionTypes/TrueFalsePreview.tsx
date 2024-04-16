import {useQuiz} from '../QuizContext';

function TrueFalsePreview({ questionId }) {
	const {quiz} = useQuiz();
	const question = quiz.questions.find((question) => question._id === questionId)

	return (
		<div>
			<div>
				<p>{question.questionText}</p>
			</div>

			<hr />
			<input type="radio" value="true" /> True
			<hr />
			<input type="radio" value="false" /> False
		</div>
	)
}

export default TrueFalsePreview;
