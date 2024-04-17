import {useQuiz} from '../QuizContext';

function MultipleChoicePreview({ questionNum}) {
	const {quiz} = useQuiz();
	const question = quiz.questions.find((question) => question.questionNum === questionNum)

	return (
		<div>
			<div>
				<p>{question.questionText}</p>
			</div>

			<hr />
			{question.choices.map((option, index) => (
				<div key={index}>
					<input type="radio" value={option} /> {option}
					<hr />
				</div>
			))}
		</div>
	)
}

export default MultipleChoicePreview;
