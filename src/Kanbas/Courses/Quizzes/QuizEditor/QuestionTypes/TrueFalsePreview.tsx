import {useQuiz} from '../QuizContext';

function TrueFalsePreview({ questionNum }) {
	const {quiz} = useQuiz();
	const question = quiz.questions.find((question) => question.questionNum === questionNum)

	return (
		<div>
			<div>
				<p>{question.questionText}</p>
			</div>

			<hr />
			<input name="ansewr" type="radio" value="true" /> True
			<hr />
			<input name="ansewr" type="radio" value="false" /> False
		</div>
	)
}

export default TrueFalsePreview;
