import * as client from "./client"
import {useState, useEffect} from "react"
import {useNavigate, Link} from "react-router-dom"
import "../index.css"

export default function Profile() {
	const [profile, setProfile] = useState({username: "", password: "", firstName: "", lastName: "", dob: "", email: "", role: "USER"})
	const navigate = useNavigate()

	const fetchProfile = async () => {
		const account = await client.profile()
		setProfile(account)
	}

	const signout = async () => {
		await client.signout()
		navigate("/Kanbas/Account/Signin")
	}

	const save = async () => {
		setProfile(await client.updateUser(profile))
	}

	useEffect(() => {
		fetchProfile()
	}, [])

	return (
		<div>
			<h1>Profile</h1>
			{profile && (
			<div className="col-3">
			  <form onSubmit={(e) => e.preventDefault()}>
			  <div className="form-group">
				<label htmlFor="username">Username</label>
				<input 
				  type="text" 
				  className="form-control" 
				  id="username" 
				  value={profile.username} 
				  onChange={(e) => setProfile({ ...profile, username: e.target.value })}
				/>
			  </div>
			  <div className="form-group">
				<label htmlFor="password">Password</label>
				<input 
				  type="password" 
				  className="form-control" 
				  id="password" 
				  value={profile.password} 
				  onChange={(e) => setProfile({ ...profile, password: e.target.value })}
				/>
			  </div>
			  <div className="form-group">
				<label htmlFor="firstName">First Name</label>
				<input 
				  type="text" 
				  className="form-control" 
				  id="firstName" 
				  value={profile.firstName} 
				  onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
				/>
			  </div>
			  <div className="form-group">
				<label htmlFor="lastName">Last Name</label>
				<input 
				  type="text" 
				  className="form-control" 
				  id="lastName" 
				  value={profile.lastName} 
				  onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
				/>
			  </div>
			  <div className="form-group">
				<label htmlFor="dob">Date of Birth</label>
				<input 
				  type="date" 
				  className="form-control" 
				  id="dob" 
				  value={profile.dob} 
				  onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
				/>
			  </div>
			  <div className="form-group">
				<label htmlFor="email">Email</label>
				<input 
				  type="email" 
				  className="form-control" 
				  id="email" 
				  value={profile.email} 
				  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
				/>
			  </div>
			  <div className="form-group">
				<label htmlFor="role">Role</label>
				<select 
				  className="form-control" 
				  id="role" 
				  onChange={(e) => setProfile({...profile, role: e.target.value})}
				>
				  <option value="USER">User</option>
				  <option value="ADMIN">Admin</option>
				  <option value="FACULTY">Faculty</option>
				  <option value="STUDENT">Student</option>
				</select>
			  </div>
			  <div className="form-group">
				<button 
				  type="button" 
				  className="btn btn-danger" 
				  onClick={(e) => {
					e.preventDefault();
					save();
				  }}
				>
				  Save
				</button>
				{' '}
				<button 
				  type="button" 
				  className="btn btn-secondary" 
				  onClick={(e) => {
					e.preventDefault();
					signout();
				  }}
				>
				  Sign out
				</button>
			  </div>
			</form>
			</div>
			)}
			<div className="col-3">
			<Link to="/Kanbas/Account/Admin/Users" className="btn btn-warning w-100"> Users </Link>
			</div>
		</div>
	)
}
