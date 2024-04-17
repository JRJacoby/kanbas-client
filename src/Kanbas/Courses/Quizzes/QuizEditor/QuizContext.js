import { createContext, useState, useContext } from 'react';
import * as client from '../client';

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
	const [quiz, setQuiz] = useState(null);
	const [newQuestions, setNewQuestions] = useState([]);
	const [deletedQuestions, setDeletedQuestions] = useState([]);

	const defaultQuestion = {
		title: "New Question Title",
		questionText: "New Question Text",
		points: 10,
	}

	const defaultMCQuestion = {
		...defaultQuestion,
		questionType: "multipleChoice",
		choices: ['New Choice 1', 'New Choice 2'],
		answer: 'New Choice 1',
	}

	const defaultTFQuestion = {
		...defaultQuestion,
		questionType: "trueFalse",
		answer: true,
	}

	const defaultFBQuestion = {
		...defaultQuestion,
		questionType: "fillInTheBlanks",
		answers: ['New Answer']
	}

	const setQuizDetails = (newQuiz) => {
		let {questions, ...details} = newQuiz;
		setQuiz({...details, questions: quiz.questions});
	}

	const addQuestion = () => {
		let newQuestionNum;
		if (quiz.questions.length === 0) {
			newQuestionNum = 0;
		} else {
			newQuestionNum = Math.max(...quiz.questions.map(q => q.questionNum)) + 1;
		}

		const newQuestion = {...defaultMCQuestion, questionNum: newQuestionNum, mode: 'Edit'};
		console.log(`newQuestion: ${JSON.stringify(newQuestion)}`)
		setNewQuestions([...newQuestions, newQuestion]);
		setQuiz({...quiz, questions: [...quiz.questions, newQuestion]});
	}

	const deleteQuestion = (question) => {
		setDeletedQuestions([...deletedQuestions, question]);
		setQuiz({...quiz, questions: quiz.questions.filter(q => q.questionNum !== question.questionNum)});
	}

	const updateQuestion = (question) => {
		setQuiz({...quiz, questions: quiz.questions.map(q => q.questionNum === question.questionNum ? question : q)});
		setNewQuestions(newQuestions.map(q => q.questionNum === question.questionNum ? question : q));
	}

	const setQuestionType = (question, questionType) => {
		if (question.questionType == 'multipleChoice') {
			delete question.choices;
		    delete question.answer;
		}
		else if (question.questionType == 'trueFalse')
			delete question.answer;
		else if (question.questionType == 'fillInTheBlanks')
			delete question.answers;

		if (questionType == 'multipleChoice') {
			question = {...question, ...defaultMCQuestion};
		} else if (questionType == 'trueFalse') {
			question = {...question, ...defaultTFQuestion};
		} else if (questionType == 'fillInTheBlanks') {
			question = {...question, ...defaultFBQuestion};
		}

		question.questionType = questionType;
		updateQuestion(question);
	}

	const save = async () => {
		let questionIds = [];

		console.log(`in save()`)
		console.log(`quizQuestions: ${JSON.stringify(quiz.questions)}`)
		for (const question of quiz.questions) {
			if (question._id) {
				console.log(`updating question: ${JSON.stringify(question)}`)
				await client.updateQuestion(quiz._id, question._id, question);
				questionIds.push(question._id);
			}
		}

		for (const question of newQuestions) {
			console.log(`adding question: ${JSON.stringify(question)}`)
			const newQuiz = await client.addQuestion(quiz._id, question);
			const questionNum = question.questionNum;
			const newQuestion = newQuiz.questions.find(q => q.questionNum === questionNum);
			console.log(`newQuestion: ${JSON.stringify(newQuestion)}`)

			questionIds.push(newQuestion._id);
		}
		setNewQuestions([]);

		await client.updateQuiz({...quiz, questions: questionIds});

	}

	const cancel = () => {
		setQuiz(null);
		setNewQuestions([]);
	}
	
	return (
		<QuizContext.Provider value={{quiz, setQuiz, setQuizDetails, addQuestion, deleteQuestion, updateQuestion, setQuestionType, save, cancel}}>
			{children}
		</QuizContext.Provider>
	)
}

export const useQuiz = () => useContext(QuizContext);
