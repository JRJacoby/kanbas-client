import "./index.css";
import { useParams, useNavigate, Link } from "react-router-dom";
import db from "../../../Database";
import { useSelector, useDispatch } from "react-redux";
import {
    addAssignment,
    deleteAssignment,
    updateAssignment,
    selectAssignment
} from "../assignmentsReducer";
import { KanbasState } from "../../../store";
import * as client from "../client"

function AssignmentEditor() {
    const { assignmentId } = useParams();
    const assignment = useSelector((state: KanbasState) => state.assignmentsReducer.assignment);
    const assignmentList = useSelector((state: KanbasState) => state.assignmentsReducer.assignments);
    const { courseId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSave = async () => {
        if (assignmentId === "NewAssignment") {
			await client.createAssignment(courseId, assignment)
            dispatch(addAssignment(assignment));
        }
        else {
			await client.updateAssignment(assignment)
            dispatch(updateAssignment(assignment));
        }
        navigate(`/Kanbas/Courses/${courseId}/Assignments`)
    }

    return (
        <div className="w-75 jj-assignments-edit-main-content">
            <div className="header d-flex align-content-center justify-content-end">
                <i className="fa fa-check-circle text-success"></i>
                <p>Published</p>
                <button className="jj-grey-btn"><i className="fa-solid fa-ellipsis-vertical"></i></button>
            </div>
            <hr />
            <form className="container">
                <div className="mb-3">
                    <label htmlFor="assignment-name" className="form-label">Assignment Name</label>
                    <input onChange={(e) => dispatch(selectAssignment({ ...assignment, title: e.target.value }))} name="assignment-name" value={assignment?.title} id="assignment-name" className=" mb-3 form-control"></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="assignment-description" className="form-label">Assignment Description</label>
                    <textarea onChange={(e) => dispatch(selectAssignment({ ...assignment, description: e.target.value }))} name="assignment-description" value={assignment?.description} id="assignment-description" className=" mb-3 form-control"></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="points" className="form-label">Points</label>
                    <input onChange={(e) => dispatch(selectAssignment({ ...assignment, points: e.target.value }))} name="points" value={assignment?.points} id="points" className=" mb-3 form-control"></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="dueDate" className="form-label">Due Date</label>
                    <input onChange={(e) => dispatch(selectAssignment({ ...assignment, dueDate: e.target.value }))} type="date" name="dueDate" value={assignment?.dueDate} id="dueDate" className="mb-3 form-control"></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="availableFromDate" className="form-label">Available From</label>
                    <input onChange={(e) => dispatch(selectAssignment({ ...assignment, availableFromDate: e.target.value }))} type="date" name="availableFromDate" value={assignment?.dueDate} id="availableFromDate" className="mb-3 form-control"></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="availableUntilDate" className="form-label">Available Until</label>
                    <input onChange={(e) => dispatch(selectAssignment({ ...assignment, availableUntilDate: e.target.value }))} type="date" name="availableUntilDate" value={assignment?.dueDate} id="availableUntilDate" className="mb-3 form-control"></input>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                    <div className="mb-3 form-check">
                        <label htmlFor="notify-checkbox" className="form-label">Notify users that this content has
                            changed</label>
                        <input type="checkbox" className="form-check-input" id="notify-checkbox"
                            name="final-grade-checkbox"></input>
                    </div>
                    <div>
                        <button className="jj-grey-btn"><Link to={`/Kanbas/Courses/${courseId}/Assignments`}>Cancel</Link></button>
                        <button type="submit" className="jj-red-btn" onClick={(e) => {
                            e.preventDefault();
                            handleSave();
                            }}>
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default AssignmentEditor;
