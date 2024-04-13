import courses from "./courses.json"
import modules from "./modules.json"
import assignments from "./assignments.json"
import enrollments from "./enrollments.json"
import users from "./users.json"
import grades from "./grades.json"

let db = {
    courses,
    modules,
    assignments,
    enrollments,
    users,
    grades
}

export default db;
export { courses, modules, assignments, enrollments, users, grades }