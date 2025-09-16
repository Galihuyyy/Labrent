import axios from "axios";
import { useState } from "react";
import { config } from "../config";
import { getToken } from "../utils/getToken";

const useUser = () => {
	const [fixRole, setFixRole] = useState('')
	const apiUrl = config.API_URL
	const token = getToken()
	function getUser() {
		axios.get(`${apiUrl}/user`, {headers : {Authorization : `Bearer ${token}`}})
			  .then(res => {
				setFixRole(res.data.data.role)
			  })
			  .catch(err => {
				console.log(err.response);
			  })
	}

	return {fixRole, getUser}
}

export default useUser