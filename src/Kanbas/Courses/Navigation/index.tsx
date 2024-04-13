import { Link, useLocation } from 'react-router-dom';
import "./index.css";
function CourseNavigation() {
    const links = [
        "Home",
        "Modules",
        "Piazza",
        "Zoommeetings",
        "Assignments",
        "Quizzes",
        "Grades",
        "People",
        "Panoptovideo",
        "Discussions",
        "Announcements",
        "Pages",
        "Files",
        "Rubrics",
        "Outcomes",
        "Collaborations",
        "Syllabus",
        "Settings/CourseDetails"
    ]
    const { pathname } = useLocation();
    return (
        <ul className="wd-navigation d-none d-sm-block">
            {
                links.map(link => (
                    <li key={link} className={pathname.includes(link) ? "wd-active" : ""}>
                        <Link to={link}>{link}</Link>
                    </li>
                ))
            }
        </ul>
    )
}
export default CourseNavigation;