import "../../../../index.css"
import Question from "./Question"
import {useQuiz} from "./QuizContext"
import * as client from "../client"

function QuestionsTab() {
	const defaultQuestion = {
		title: "New Question Title",
		questionText: "New Question Text",
		points: 10,
		questionType: "multipleChoice",
		choices: ['New Choice 1', 'New Choice 2'],
		answer: 'New Choice 1',
	}

	const {quiz, setQuiz} = useQuiz();
	
	const newQuestion = async () => {
		setQuiz({...quiz, questions: [...quiz.questions, defaultQuestion]})
	}

  return (
	<div>
	{quiz &&
	<div>
		<div>
			{quiz.questions.map((question: any) => <Question key={question._id} questionId={question._id} />)}
		</div>

		<div className="d-flex justify-content-end">
			<button className="btn btn-secondary" onClick={newQuestion}>+ New Question</button>
		</div>
	</div>
	}
	</div>
  );
}

export default QuestionsTab;
