import {useQuiz} from './QuizContext';
import {useEffect} from 'react';
import {TrueFalsePreview, TrueFalseEdit, MultipleChoicePreview, MultipleChoiceEdit, FillInTheBlanksPreview, FillInTheBlanksEdit} from './QuestionTypes';

function Question({ questionId }) {
	const {quiz, setQuestionMode} = useQuiz();
	const question = quiz.questions.find((question) => question._id === questionId)

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

	useEffect(() => {
		setQuestionMode(questionId, 'Preview')
	}, [])

	const QuestionComponent = question && (
		question.mode == 'Preview' ? typeMap[question.questionType]['preview'] : typeMap[question.questionType]['edit']
	)

	return (
		<div>
			{QuestionComponent && <QuestionComponent questionId={questionId} />}
		</div>
	)
}

export default Question;
