import axios from "axios";
axios.defaults.withCredentials = true

export const BASE_API = process.env.REACT_APP_API_BASE_ASIX;
export const USERS_API = `${BASE_API}/api/users`

export interface User { _id: string; username: string; password: string; role: string; firstName: string; lastName: string }

export const signin = async (credentials: User) => {
	const response = await axios.post(`${USERS_API}/signin`, credentials)
	return response.data
}

export const profile = async () => {
	const response = await axios.post(`${USERS_API}/profile`, { withCredentials: true })
	let account = response.data

	// Added these extra lines myself to change the formatting of the dob string when it's being used on the client-side
	// HTML input elements of type 'date' expect the date format YYYY-MM-DD, so I can't imagine a situation where
	// we'd ever want to use another format on the client-side, so I think it's safe to add this logic here.
	if (account.dob) {
		account = { ...account, dob: new Date(account.dob).toISOString().split('T')[0]}
	}

	return account
}

export const updateUser = async (user: any) => {
	const response = await axios.put(`${USERS_API}/${user._id}`, user)
	return response.data
}

export const findAllUsers = async () => {
	const response = await axios.get(`${USERS_API}`)
	return response.data
}

export const createUser = async (user: any) => {
	const response = await axios.post(`${USERS_API}`, user)
	return response.data
}

export const deleteUser = async (user: any) => {
	const response = await axios.delete(`${USERS_API}/${user._id}`)
	return response.data
}

export const findUserById = async (id: string) => {
	const response = await axios.get(`${USERS_API}/${id}`)
	return response.data
}

export const findUsersByRole = async (role: string) => {
	const response = await axios.get(`${USERS_API}?role=${role}`)
	return response.data
}

export const signup = async (user: any) => {
	const response = await axios.post(`${USERS_API}/signup`, user, {withCredentials: true})
	return response.data
}

export const signout = async () => {
	const response = await axios.post(`${USERS_API}/signout`)
	return response.data
}
