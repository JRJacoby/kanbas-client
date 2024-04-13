import { Link } from "react-router-dom";
import "./index.css"

function Dashboard(
    {
        courses, course, setCourse, addNewCourse, deleteCourse, updateCourse
    }: {
        courses: any[]; course: any; setCourse: (course: any) => void; addNewCourse: () => void; deleteCourse: (course: any) => void; updateCourse: () => void;
    }
) {
    return (
        <div className="p-4">
            <h1>Dashboard</h1>
            <h5>Course</h5>
            <form className="jj-new-course-form">
                <div className="form-group">
                    <label htmlFor="course-name">Course Name</label>
                    <input value={course.name} id="course-name" className="form-control"
                        onChange={(e) => setCourse({ ...course, name: e.target.value })} />
                </div>
                <div className="form-group">
                    <label htmlFor="course-number">Course Number</label>
                    <input value={course.number} id="course-number" className="form-control"
                        onChange={(e) => setCourse({ ...course, number: e.target.value })} />
                </div>
                <div className="form-group">
                    <label htmlFor="course-startDate">Start Date</label>
                    <input value={course.startDate} id="course-startDate" className="form-control" type="date"
                        onChange={(e) => setCourse({ ...course, startDate: e.target.value })} />
                </div>
                <div className="form-group">
                    <label htmlFor="course-endDate">End Date</label>
                    <input value={course.endDate} id="course-endDate" className="form-control" type="date"
                        onChange={(e) => setCourse({ ...course, endDate: e.target.value })} />
                </div>
                <div className="form-group">
                    <label htmlFor="course-thumbnail">Course Thumbnail</label>
                    <input value={course.image} id="course-thumbnail" className="form-control"
                        onChange={(e) => setCourse({ ...course, image: e.target.value })} />
                </div>
                <button onClick={(e) => {e.preventDefault(); addNewCourse() }} className='jj-grey-btn'>
                    Add
                </button>
                <button onClick={(e) => {e.preventDefault(); updateCourse() }} className='jj-grey-btn'>
                    Update
                </button>
            </form>
            <hr />
            <h2>Published Courses ({courses.length})</h2>
            <hr />
            <div className="row">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    {courses.map(course => (
                        <div key={course._id} className="col jj-card-col">
                            <div className="card">
                                <img src={course.image} className="card-img-top" />
                                <div className="card-body">
                                    <Link className="card-title" to={`/Kanbas/Courses/${course._id}/Home`}>{course.number}</Link>
                                    <p className="card-text">{course.name}</p>
                                    <Link className="btn btn-primary" to={`/Kanbas/Courses/${course._id}/Home`}> Go </Link>
                                    <button onClick={
                                        (e) => {
                                            e.preventDefault();
                                            setCourse(course);
                                        }
                                    }
                                        className="btn btn-primary">
                                        Edit
                                    </button>
                                    <button className="btn btn-primary jj-delete-btn" onClick={
                                        (e) => {
                                            e.preventDefault();
                                            deleteCourse(course._id);
                                        }
                                    }>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Dashboard;
