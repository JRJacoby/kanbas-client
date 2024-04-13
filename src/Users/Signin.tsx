import {useState} from "react"
import {useNavigate} from "react-router-dom"
import {User} from "./client"
import * as client from "./client"
import "../index.css"

export default function Signin() {
	const [credentials, setCredentials] = useState<User>({_id: "", username: "", password: "", firstName: "", lastName: "", role: "USER"})
	const [error, setError] = useState("")
	const navigate = useNavigate()
	
	const signin = async () => {
		await client.signin(credentials)
		navigate("/Kanbas/Account/Profile")
	}

	const signup = async () => {
		try {
			await client.signup(credentials)
			navigate("/Kanbas/Account/Profile")
		} catch (err) {
			setError(err.response.data.message)
		}
	}

	return (
		<div>
			<h1>Signin</h1>
			  <form onSubmit={(e) => e.preventDefault()}>
			  <div className="form-group">
				<label htmlFor="username">Username</label>
				<div className="row">
				  <div className="col-3">
					<input 
					  type="text" 
					  className="form-control" 
					  id="username" 
					  value={credentials.username} 
					  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
					/>
				  </div>
				</div>
			  </div>
			  <div className="form-group">
				<label htmlFor="password">Password</label>
				<div className="row">
				  <div className="col-3">
					<input 
					  type="password" 
					  className="form-control" 
					  id="password" 
					  value={credentials.password} 
					  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
					/>
				  </div>
				</div>
			  </div>
			  <div className="row">
				<div className="col-3">
				  <button 
					type="submit" 
					className="btn btn-danger"
					onClick={(e) => {
					  e.preventDefault();
					  signin();
					}}
				  >
					Sign in
				  </button>
				  {' '}
				  <button 
					type="button" 
					className="btn btn-secondary"
					onClick={(e) => {
					  e.preventDefault();
					  signup();
					}}
				  >
					Sign up
				  </button>
				</div>
			  </div>
			</form>
			{error && <div>{error}</div>}
		</div>
	)
}
