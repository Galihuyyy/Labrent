import axios from "axios";
import { useState } from "react";
import { config } from "../config";
import { getToken } from "../utils/getToken";

const useUser = () => {
	const [fixRole, setFixRole] = useState(null);
	const [loading, setLoading] = useState(false);
	const apiUrl = config.API_URL
	const token = getToken()

	async function getUser() {
		setLoading(true)
		try {
			const res = await axios.get(`${apiUrl}/user`, {
				headers : {Authorization : `Bearer ${token}` },
			});
			setFixRole(res.data.data.role);
			return true;
		} catch(err) {
			console.log(err.response);
			return false;
		} finally {
			setLoading(false)
		}
	}

	return {fixRole, getUser, loading };
};

export default useUser