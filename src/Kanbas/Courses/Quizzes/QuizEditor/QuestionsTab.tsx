import "../../../../index.css"
import Question from "./Question"
import {useQuiz} from "./QuizContext"

function QuestionsTab() {
	const {quiz, addQuestion, updateQuestion} = useQuiz();

  return (
	<div>
	{quiz &&
	<div>
		<div>
			{quiz.questions.map((question: any) => {return question.mode == 'Preview' ?
				(<div className="mb-5"><Question key={question.questionNum} questionNum={question.questionNum} />
				<button className="btn btn-secondary" onClick={() => updateQuestion({...question, mode: 'Edit'})}>Edit</button></div>) :
				(<div className="mb-5"><Question key={question.questionNum} questionNum={question.questionNum} /></div>)
			})}
		</div>

		<div className="d-flex justify-content-end">
			<button className="btn btn-secondary" onClick={addQuestion}>+ New Question</button>
		</div>
	</div>
	}
	</div>
  );
}

export default QuestionsTab;
