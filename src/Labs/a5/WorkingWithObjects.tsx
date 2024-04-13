import React, { useEffect, useState } from "react";
import axios from "axios"

const API_BASE = process.env.REACT_APP_API_BASE_ASIX;

function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1, title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
  });

  const [module, setModule] = useState({ id: 0, name: "Module 0", description: "Module 0 is the 1st module", course: "Course 0" });

  const ASSIGNMENT_URL = `${API_BASE}/api/assignments`
  const MODULE_URL = `${API_BASE}/api/modules`

  const fetchAssignment = async () => {
	  const response = await axios.get(`${ASSIGNMENT_URL}`)
	  setAssignment(response.data)
  }

  const updateTitle = async () => {
	  const response = await axios.get(`${ASSIGNMENT_URL}/title/${assignment.title}`)
	  setAssignment(response.data)
  }

  useEffect(() => {
	  fetchAssignment()
  }, [])

  return (
    <div>
      <h3>Working With Objects</h3>
      <h4>Modifying Properties</h4>
      <input type="text" onChange={(e) => setAssignment({...assignment, title: e.target.value})} value={assignment.title}/>
	  <button onClick={updateTitle}>
	    Update title to: {assignment.title}
	  </button>

	  <button onClick={fetchAssignment}>
	    Fetch Assignment
	  </button>

      <a href={`${ASSIGNMENT_URL}/title/${assignment.title}`}>
        Update Title
      </a>
      <input type="text" 
        onChange={(e) => setAssignment({ ...assignment,
            title: e.target.value })}
        value={assignment.title}/>
		<br/>
      <a href={`${ASSIGNMENT_URL}/score/${assignment.score}`}>
        Update Score
      </a>
      <input type="text" 
        onChange={(e) => setAssignment({ ...assignment,
            score: Number(e.target.value) })}
        value={assignment.score}/>
		<br/>
		<a href={`${ASSIGNMENT_URL}/completed/${assignment.completed}`}>
		  Update Completed
		</a>
		<input type="checkbox" 
		  onChange={(e) => setAssignment({ ...assignment, completed: e.target.checked })}
		  checked={assignment.completed === true}/>
		<br/>
      <a href={`${MODULE_URL}/name/${module.name}`}>
        Update Name
      </a>
      <input type="text" 
        onChange={(e) => setModule({ ...module,
            name: e.target.value })}
        value={module.name}/>
		<br/>
      <a href={`${MODULE_URL}/description/${module.description}`}>
        Update Description
      </a>
      <input type="text" 
        onChange={(e) => setModule({ ...module,
            description: e.target.value })}
        value={module.description}/>
      <h4>Retrieving Objects</h4>
      <a href={`${API_BASE}/a5/assignment`}>
        Get Assignment
      </a>
	  <br/>
      <a href={`${API_BASE}/a5/module`}>
        Get Module
      </a>
      <h4>Retrieving Properties</h4>
      <a href={`${API_BASE}/a5/assignment/title`}>
        Get Title
      </a>
	  <br/>
      <a href={`${API_BASE}/a5/module/name`}>
        Get Module Name
      </a>
    </div>
  );
}
export default WorkingWithObjects;
