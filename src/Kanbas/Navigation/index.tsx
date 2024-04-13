import { Link, useLocation } from "react-router-dom";
import "./index.css";
import { FaUser, FaTachometerAlt, FaBook, FaCalendar, FaInbox, FaPeopleArrows, FaQuestion, FaClock, } from "react-icons/fa";
import { FaComputer } from "react-icons/fa6";
function KanbasNavigation() {
  const { pathname } = useLocation();
  const links = [
    { label: "Account", icon: <FaUser className="jj-kanbas-nav-icon jj-account-icon" />},
    { label: "Dashboard", icon: <FaTachometerAlt className="jj-kanbas-nav-icon" /> },
    { label: "Courses", icon: <FaBook className="jj-kanbas-nav-icon" /> },
    { label: "Calendar", icon: <FaCalendar className="jj-kanbas-nav-icon" /> },
    { label: "Inbox", icon: <FaInbox className="jj-kanbas-nav-icon" /> },
    { label: "History", icon: <FaClock className="jj-kanbas-nav-icon" /> },
    { label: "Studio", icon: <FaComputer className="jj-kanbas-nav-icon" /> },
    { label: "Commons", icon: <FaPeopleArrows className="jj-kanbas-nav-icon" /> },
    { label: "Help", icon: <FaQuestion className="jj-kanbas-nav-icon" /> }
  ]

  return (
    <ul className="wd-kanbas-navigation">

      <li>
        <a href="https://www.northeastern.edu"><img src="/images/neulogo.png"
          alt="The Northestern University Logo"></img></a>
      </li>

      {links.map((link, index) => (
        <li key={index} className={pathname.includes(link.label) ? "wd-active" : ""}>
          <Link className="jj-kanbas-nav-link d-flex flex-column align-items-center" to={`/Kanbas/${link.label}`}> {link.icon} {link.label} </Link>
        </li>
      ))}

    </ul>
  )
}
export default KanbasNavigation;