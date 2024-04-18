import { createContext, useState, useContext, useEffect } from 'react';
import * as client from '../client';

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
	const [quiz, setQuiz] = useState(null);
	const [newQuestions, setNewQuestions] = useState([]);
	const [deletedQuestions, setDeletedQuestions] = useState([]);
	const [questionsBeingEdited, setQuestionsBeingEdited] = useState([]);

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

	const openQuestionForEditing = (questionNum) => {
		const question = quiz.questions.find(q => q.questionNum === questionNum);
		
		if (questionsBeingEdited.find(q => q.questionNum === questionNum)) {
			return;
		}

		setQuestionsBeingEdited([...questionsBeingEdited, {...question}]);
	}

	const closeQuestionForEditing = (questionNum) => {
		setQuestionsBeingEdited(questionsBeingEdited.filter(q => q.questionNum !== questionNum));
	}

	const restoreOriginalQuestion = (questionNum) => {
		const question = questionsBeingEdited.find(q => q.questionNum === questionNum);
		setQuestionsBeingEdited(questionsBeingEdited.filter(q => q.questionNum !== questionNum));
		updateQuestion({...question, mode: 'Preview'});
	}

	const resetQuestionsOpenForEdit = () => {
		setQuestionsBeingEdited([]);
	}

	const save = async (publish = false) => {
		let questionIds = [];
		let totalPoints = 0;
		let localQuiz = {...quiz};

		if (publish) {
			localQuiz.published = true;
		}

		for (const question of localQuiz.questions) {
			if (question._id) {
				await client.updateQuestion(localQuiz._id, question._id, question);
				questionIds.push(question._id);
				totalPoints += question.points;
			}
		}

		for (const question of newQuestions) {
			const newQuiz = await client.addQuestion(localQuiz._id, question);
			const questionNum = question.questionNum;
			const newQuestion = newQuiz.questions.find(q => q.questionNum === questionNum);

			questionIds.push(newQuestion._id);
			totalPoints += newQuestion.points;
		}
		setNewQuestions([]);

		await client.updateQuiz({...localQuiz, questions: questionIds, points: totalPoints});
	}

	const cancel = () => {
		setQuiz(null);
		setNewQuestions([]);
	}

	const resetNewQuestions = () => {
		setNewQuestions([]);
	}
	
	return (
		<QuizContext.Provider value={{quiz, setQuiz, setQuizDetails, addQuestion, deleteQuestion, updateQuestion, setQuestionType, save, cancel, resetNewQuestions, openQuestionForEditing, restoreOriginalQuestion, closeQuestionForEditing, resetQuestionsOpenForEdit}}>
			{children}
		</QuizContext.Provider>
	)
}

export const useQuiz = () => useContext(QuizContext);
