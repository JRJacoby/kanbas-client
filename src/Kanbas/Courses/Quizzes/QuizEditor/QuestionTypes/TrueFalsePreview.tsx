import {useQuiz} from '../QuizContext';
import DOMPurify from 'dompurify';

function TrueFalsePreview({ questionNum }) {
	const {quiz} = useQuiz();
	const question = quiz.questions.find((question) => question.questionNum === questionNum)

	return (
		<div>
			<div>
				<p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(question.questionText)}}></p>
			</div>

			<hr />
			<input name="answer" type="radio" value="true" /> True
			<hr />
			<input name="answer" type="radio" value="false" /> False
		</div>
	)
}

export default TrueFalsePreview;
