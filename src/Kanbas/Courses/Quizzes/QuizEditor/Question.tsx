import {useQuiz} from './QuizContext';
import {TrueFalsePreview, TrueFalseEdit, MultipleChoicePreview, MultipleChoiceEdit, FillInTheBlanksPreview, FillInTheBlanksEdit} from './QuestionTypes';

function Question({ questionNum, forcePreview = false }) {
	const {quiz} = useQuiz();
	console.log("quiz being used", quiz)
	const question = quiz.questions.find((question) => question.questionNum === questionNum)

	const typeMap = {
		'trueFalse': {
			'preview': TrueFalsePreview,
			'edit': TrueFalseEdit
		},
		'multipleChoice': {
			'preview': MultipleChoicePreview,
			'edit': MultipleChoiceEdit
		},
		'fillInTheBlanks': {
			'preview': FillInTheBlanksPreview,
			'edit': FillInTheBlanksEdit
		}
	}

	if (forcePreview) {
		question.mode = 'Preview'
	}

	const QuestionComponent = question && (
		question.mode == 'Preview' ? typeMap[question.questionType]['preview'] : typeMap[question.questionType]['edit']
	)

	return (
		<div>
			{QuestionComponent && <QuestionComponent questionNum={questionNum} />}
		</div>
	)
}

export default Question;
