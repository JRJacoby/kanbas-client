import {useQuiz} from '../QuizContext';

function FillInTheBlankPreview({ questionId }) {
	const {quiz} = useQuiz();
	const question = quiz.questions.find((question) => question._id === questionId)

	return (
		<div>
			<div>
				<p>{question.questionText}</p>
			</div>
			<hr />
			{question.blanks.map((blank, index) => (
				<div key={index}>
					<input type="text" placeholder={blank} />
					<hr />
				</div>
			))}
		</div>
	)
}

export default FillInTheBlankPreview;
