import "../../../../index.css";
import {FaRocket, FaCheckCircle, FaEllipsisV} from "react-icons/fa";
import {RiProhibitedLine} from "react-icons/ri";
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router";
import {useState, useEffect} from "react"
import * as client from "../client";

function Quiz({quizId, onDelete}) {
	const navigate = useNavigate();
	const { courseId } = useParams();
	const [quiz, setQuiz] = useState<any>();
	const [menuOpen, setMenuOpen] = useState(false);
	const [menuPosition, setMenuPosition] = useState({x: 0, y: 0});

	const getAvailability = () => {
		let availability = 'Available'
		const now = new Date()

		const [availableYear, availableMonth, availableDay] = quiz.availableDate.split('-')
		const availableDate = new Date(parseInt(availableYear), parseInt(availableMonth) - 1, parseInt(availableDay), 0, 0, 0, 0)

		const [untilYear, untilMonth, untilDay] = quiz.untilDate.split('-')
		const untilDate = new Date(parseInt(untilYear), parseInt(untilMonth) - 1, parseInt(untilDay), 23, 59, 59, 999)

		if (now > untilDate) {
			availability = 'Closed'
		} else if (now < availableDate) {
			availability = `Not available until ${availableDate.toLocaleDateString()}`
		}

		return availability
	}

	const fetchQuiz = async () => {
		const fetchedQuiz = await client.findQuizById(quizId)
		setQuiz(fetchedQuiz)
	}

	const goToDetails = () => {
		navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}/Details`)
	}

	const deleteQuiz = async () => {
		await client.deleteQuiz(quiz._id)
		closeMenu()
		onDelete(quiz._id)
	}

	const togglePublish = async () => {
		let newQuiz;
		if (quiz.published) {
			newQuiz = await client.updateQuiz({...quiz, published: false})
		} else {
			newQuiz = await client.updateQuiz({...quiz, published: true})
		}

		setQuiz(newQuiz)
		closeMenu()
	}

	const openMenu = (e) => {
		e.stopPropagation()
		setMenuPosition({x: e.clientX, y: e.clientY})
		setMenuOpen(true)
	}

	const closeMenu = () => {
		setMenuOpen(false)
	}

	useEffect(() => {
		fetchQuiz()
	}, [])

	return (
		<div>
			{quiz &&
			<div onClick={goToDetails} className="d-flex justify-content-between">
				<div className="d-flex justify-content-start">
					<FaRocket />
					<div>
						<h3>{quiz.title}</h3>
						<p>{getAvailability()} | Due {quiz.dueDate} | {quiz.points} pts | {quiz.questions.length} Questions</p>
					</div>
				</div>
				<div className="d-flex justify-content-end">
					{quiz.published ? <FaCheckCircle onClick={(e) => {e.stopPropagation(); togglePublish()}}/> : <RiProhibitedLine onClick={(e) => {e.stopPropagation(); togglePublish()}}/>}
					<FaEllipsisV onClick={(e) => {e.stopPropagation(); openMenu(e)}}/>
				</div>
				{
					menuOpen &&
					<div style={{position: "absolute", top: menuPosition.y, left: menuPosition.x - 85, backgroundColor: "white", border: "1px solid black"}}>
						<ul>
							<li onClick={(e) => {e.stopPropagation(); closeMenu(); goToDetails()}}>Edit</li>
							<li onClick={(e) => {e.stopPropagation(); deleteQuiz()}}>Delete</li>
							<li onClick={(e) => {e.stopPropagation(); togglePublish()}}>{quiz.published ? "Unpublish" : "Publish"}</li>
						</ul>
					</div>
				}
			</div>
			}
		</div>
  	);
}

export default Quiz;
