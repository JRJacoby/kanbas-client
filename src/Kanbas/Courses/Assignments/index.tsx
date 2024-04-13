import { useParams, Link } from "react-router-dom";
import { useEffect } from "react"
import db from "../../Database/"
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import {
	setAssignments,
    addAssignment,
    deleteAssignment,
    updateAssignment,
    selectAssignment
} from "./assignmentsReducer";
import { KanbasState } from "../../store";
import * as client from "./client"

function Assignments() {
    const { courseId } = useParams();
    const assignmentList = useSelector((state: KanbasState) => state.assignmentsReducer.assignments.filter(assignment => assignment.course === courseId));
    const dispatch = useDispatch();
    const today = new Date().toISOString().split('T')[0]
    const initialAssignment = { _id: "NewAssignment", title: "New Assignment", course: "0", description: "", points: 0, dueDate: today, availableFromDate: today, availableUntilDate: today}

    const handleDelete = async (assignmentId: string) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this assignment?");
        if (confirmDelete) {
			await client.deleteAssignment(assignmentId)
            dispatch(deleteAssignment(assignmentId));
        }
    }

	useEffect(() => {
		client.findAssignmentsForCourse(courseId).then((assignmentList) => dispatch(setAssignments(assignmentList)))
	}, [courseId])

    return (
        <div className="jj-assignments-main-content">
            <div className="d-flex flex-row align-items-center">
                <input type="text" placeholder="Search for Assignments" className="form-control w-25 me-auto"></input>
                <div className="float-end">
                    <button className="jj-grey-btn"><i className="fa-solid fa-plus"></i> Groups</button>
                    <Link to={`/Kanbas/Courses/${courseId}/Assignments/NewAssignment`}>
                        <button onClick={() => {dispatch(selectAssignment(initialAssignment))}} className="jj-red-btn"><i className="fa-solid fa-plus"></i> Assignment</button>
                    </Link>
                    <button className="jj-grey-btn"><i className="fa-solid fa-ellipsis-vertical"></i></button>
                </div>
            </div>
            <hr></hr>
            <ul className="list-group">
                <li className="list-group-item jj-first-in-list">
                    <i className="fa-solid fa-grip-vertical"></i> <i className="fa-solid fa-caret-down"></i> Assignments
                    <span className="float-end">
                        <span className="rounded-pill border border-dark rounded-lg p-1">40% of Total</span>
                        <i className="fa-solid fa-plus"></i>
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                    </span>
                </li>
                {
                    assignmentList.map(assignment => {
                        return (
                            <li key={assignment._id} className="list-group-item jj-assignments-list-item-wrapper">
                                <div className="d-flex align-items-center justify-content-between jj-assignment-list-item">
                                    <div className="flex-shrink-0">
                                        <i className="fa-solid fa-grip-vertical"></i>
                                        <a href="/Kanbas/Courses/Assignments/Edit/screen.html"><i className="fa-solid fa-file-pen"></i></a>
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                        <b onClick={() => {dispatch(selectAssignment(assignment))}}>
                                            <Link to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}><h5>{assignment.title}</h5></Link> 
                                        </b>
                                    </div>
                                    <div className="flex-shrink-0">
                                        <button className="jj-delete-assn-btn" onClick={() => {handleDelete(assignment._id)}}>Delete</button>
                                        <i className="fa fa-check-circle text-success"></i>
                                        <i className="fa-solid fa-ellipsis-vertical"></i>
                                    </div>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
export default Assignments;
