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
			<form>
				{question.answers.map((answer, index) => (
					<div className="form-group" key={index}>
						<label htmlFor={`answer-${index}`}>Answer {index + 1}</label>
						<input id={`answer-${index}`} className="form-control w-25" type="text" />
						<hr />
					</div>
				))}
			</form>
		</div>
	)
}

export default FillInTheBlanksPreview;
