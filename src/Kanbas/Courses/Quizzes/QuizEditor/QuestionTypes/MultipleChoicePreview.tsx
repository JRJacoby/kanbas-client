import {useQuiz} from '../QuizContext';
import DOMPurify from 'dompurify';

function MultipleChoicePreview({ questionNum}) {
	const {quiz} = useQuiz();
	const question = quiz.questions.find((question) => question.questionNum === questionNum)

	return (
		<div>
			<div>
				<p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(question.questionText)}}></p>
			</div>

			<hr />
			{question.choices.map((option, index) => (
				<div key={index}>
					<input type="radio" name="answer" value={option} /> {option}
					<hr />
				</div>
			))}
		</div>
	)
}

export default MultipleChoicePreview;
