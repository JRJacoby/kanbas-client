import {Routes, Route} from "react-router-dom";
import QuizList from "./QuizList";
import QuizDetails from "./QuizDetails";
import QuizEditor from "./QuizEditor";
import QuizPreview from "./QuizPreview";
import { QuizProvider } from "./QuizEditor/QuizContext";

const now = new Date()
const nowDateString = now.toLocaleDateString('en-CA', {
	year: 'numeric', month: '2-digit', day: '2-digit'
}).replaceAll("/", "-")

export const defaultQuiz = {
	title: "New Quiz Title",
	description: "New Quiz Description",
	course: "dummyCourseId",
	quizType: "Graded Quiz",
	points: 100,
	assignmentGroup: "Quizzes",
	shuffleAnswers: true,
	timeLimit: 20,
	multipleAttempts: false,
	showCorrectAnswers: "Never",
	oneQuestionAtATime: true,
	webcamRequired: false,
	lockdownBrowserRequired: false,
	lockQuestionsAfterAnswering: false,
	requiredToViewResults: false,
	viewResponses: "Always",
	dueDate: nowDateString,
	availableDate: nowDateString,
	untilDate: nowDateString,
	questions: []
}

function Quizzes() {
	return (
		<QuizProvider>
		<div>
			<Routes>
				<Route path="/" element={<QuizList />} />
				<Route path="/:quizId/Details" element={<QuizDetails />} />
				<Route path="/:quizId/Editor" element={<QuizEditor />} />
				<Route path="/:quizId/Preview" element={<QuizPreview />} />
			</Routes>
		</div>
		</QuizProvider>
	)
}

export default Quizzes;
