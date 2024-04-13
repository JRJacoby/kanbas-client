import React, { useEffect, useState } from "react"
import axios from "axios"

const API_BASE = process.env.REACT_APP_API_BASE_ASIX

interface Todo {
    id: number;
    title: string;
    description: string;
    due: string;
    completed: boolean;
}

function WorkingWithArrays() {
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const [todo, setTodo] = useState<Todo>({
		id: 1,
		title: "NodeJS Assignment",
		description: "Create a NodeJS server with ExpressJS",
		due: "2021-09-09",
		completed: false
	})
	const API = `${API_BASE}/a5/todos`

    const [todos, setTodos] = useState<Todo[]>([])
	const fetchTodos = async () => {
		const response = await axios.get(API)
		setTodos(response.data)
	}

    const removeTodo = async (todo: Todo) => {
		const response = await axios.get(`${API}/${todo.id}/delete`)
		setTodos(response.data)
	}

	const deleteTodo = async (todo: Todo) => {
		try {
			const response = await axios.delete(`${API}/${todo.id}`)
			setTodos(todos.filter((t) => t.id !== todo.id))
		} catch (error) {
			console.log(error)

			if (axios.isAxiosError(error)) {
				setErrorMessage(error.response?.data.message || 'An unexpected error occurred')
			} else {
				setErrorMessage('An unexpected error occurred')
			}
		}
		
	}

	const updateTodo = async () => {
		try {
		const response = await axios.put(`${API}/${todo.id}`, todo)
		setTodos(todos.map((t) => (t.id === todo.id ? todo : t)))
		} catch (error) {
			console.log(error)

			if (axios.isAxiosError(error)) {
				setErrorMessage(error.response?.data.message || 'An unexpected error occurred')
			} else {
				setErrorMessage('An unexpected error occurred')
			} 
		}
	}

    const createTodo = async (todo: Todo) => {
		const response = await axios.get(`${API}/create`)
		setTodos(response.data)
	}

	const postTodo = async () => {
		const response = await axios.post(API, todo)
		console.log(response.data)
		setTodos([...todos, response.data])
	}

    const fetchTodoByID = async (id: number) => {
		const response = await axios.get(`${API}/${id}`)
		setTodo(response.data)
	}

    const updateTitle = async () => {
		const response = await axios.get(`${API}/${todo.id}/title/${todo.title}`)
		setTodos(response.data)
	}
	useEffect(() => {
		fetchTodos()
	}, [])

	return (
		<div>
		<h3>Working With Arrays</h3>

		<h4>Retrieving Arrays</h4>
		<a href={API}>
		  Get Todos
		</a>

		<h4>Retrieving an Item from an Array by ID</h4>
		<input value={todo.id} onChange={((e) => setTodo({...todo, id: parseInt(e.target.value)}))}/>

		<a href={`${API}/${todo.id}`}>
		  Get todo by ID
		</a>

		<h3>Updating an Item in an Array</h3>
		{/* Updating title */}
		<input type="text" value={todo.title} onChange={(e) => setTodo({...todo, title: e.target.value })}/>
		<a href={`${API}/${todo.id}/title/${todo.title}`}>
		  Update Title to {todo.title}
		</a>
		<br/>

		{/* Updating description */}
		<input type="text" value={todo.description} onChange={(e) => setTodo({...todo, description: e.target.value })}/>
		<a href={`${API}/${todo.id}/description/${todo.description}`}>
		  Update Description to {todo.description}
		</a>
		<br/>

		{/* Updating completed */}
		<input type="checkbox"  onChange={(e) => setTodo({...todo, completed: e.target.checked })}/>
		<a href={`${API}/${todo.id}/completed/${todo.completed}`}>
		  Update Completed to {todo.completed}
		</a>
		<br/>

		<textarea value={todo.description} onChange={(e) => setTodo({...todo, description: e.target.value})} />
		<input type="date" value={todo.due} onChange={(e) => setTodo({...todo, due: e.target.value})} />
		<label>
		  <input type="checkbox" onChange={(e) => setTodo({...todo, completed: e.target.checked})} />
		</label>
		<button onClick={postTodo}>Post Todo</button>
		<button onClick={updateTodo}>Update Todo</button>

		<h3>Filtering Array Items</h3>
        <a href={`${API}?completed=true`}>
		  Get Completed Todos
		</a>

		<h3>Creating new Items in Array</h3>
		<a href={`${API}/create`}>
		  Create Todo
		</a>

		<h3>Deleting from an Array</h3>
		<a href={`${API}/${todo.id}/delete`}>
		  Delete Todo with ID = {todo.id}
		</a>

		<ul className="list-group">
		  <button onClick={() => createTodo(todo)}>
		    Create
		  </button>
		  <button onClick={updateTitle}>
		    Update Title
		  </button>
		  <button onClick={() => deleteTodo(todo)} className="btn btn-danger float-end ms-2">Delete</button>
		  {todos.map((todo) => (
			  <li key={todo.id} className="list-group-item">
			    <input type="checkbox" checked={todo.completed} readOnly />
				{todo.title}
				<p>{todo.description}</p>
				<p>{todo.due}</p>
			    <button onClick={() => removeTodo(todo)}>
				  Remove
				</button>
			    <button onClick={() => fetchTodoByID(todo.id)}>
				  Edit
				</button>
			    {todo.title}
			  </li>
		  ))}
		</ul>
		</div>
	);
}
export default WorkingWithArrays
