import {useQuiz} from '../QuizContext';

function FillInTheBlanksPreview({ questionNum }) {
	const {quiz} = useQuiz();
	const question = quiz.questions.find((question) => question.questionNum === questionNum)

	return (
		<div>
			<div>
				<p>{question.questionText}</p>
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
