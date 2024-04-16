import { createContext, useState, useContext } from 'react';

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
	const [quiz, setQuiz] = useState(null);

	const setQuestionMode = (questionId, mode) => {
		updateQuestion({...quiz.questions.find(question => question._id === questionId), mode})
	}

	const updateQuestion = (newQuestion) => {
		const newQuestions = quiz.questions.map(question => {
			if (question._id === newQuestion._id) {
				return newQuestion
			}
			return question
		})

		setQuiz({...quiz, questions: newQuestions})
	}

	const setQuestionType = (questionId, questionType) => {
		let currentQuestion = quiz.questions.find(question => question._id === questionId)

		// Remove the properties that are specific to the current question type
		if (currentQuestion.questionType === 'trueFalse') {
			const {answer, ...rest} = currentQuestion
			currentQuestion = rest
		} else if (currentQuestion.questionType === 'multipleChoice') {
			const {choices, answer, ...rest} = currentQuestion
			currentQuestion = rest
		} else if (currentQuestion.questionType === 'fillInTheBlanks') {
			const {answers, ...rest} = currentQuestion
			currentQuestion = rest
		}

		// Add the properties that are specific to the new question type
		if (questionType === 'trueFalse') {
			updateQuestion({...currentQuestion, questionType, answer: true})
		} else if (questionType === 'multipleChoice') {
			updateQuestion({...currentQuestion, questionType, choices: ['New Choice 1', 'New Choice 2'], answer: 'New Answer'})
		} else if (questionType === 'fillInTheBlanks') {
			updateQuestion({...currentQuestion, questionType, answers: ['New Answer']})
		}
	}
	
	return (
		<QuizContext.Provider value={{ quiz, setQuiz, setQuestionMode, setQuestionType}}>
			{children}
		</QuizContext.Provider>
	)
}

export const useQuiz = () => useContext(QuizContext);
