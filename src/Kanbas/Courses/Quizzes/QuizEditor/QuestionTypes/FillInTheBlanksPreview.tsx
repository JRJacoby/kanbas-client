import {useQuiz} from '../QuizContext';
import DOMPurify from 'dompurify';

function FillInTheBlanksPreview({ questionNum }) {
	const {quiz} = useQuiz();
	const question = quiz.questions.find((question) => question.questionNum === questionNum)

	return (
		<div>
			<div>
				<p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(question.questionText)}}></p>
			</div>
			<hr />
			{question.answers.map((answer, index) => (
				<div key={index}>
					<input type="text" />
					<hr />
				</div>
			))}
		</div>
	)
}

export default FillInTheBlanksPreview;
