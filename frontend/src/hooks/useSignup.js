import { useState } from "react";
import toast from "react-hot-toast";
// import { useAuthContext } from "../context/AuthContext";
const useSignup = () => {
	const [loading, setLoading] = useState(false);
	// const { setAuthUser } = useAuthContext();

	const signup = async ({ username,email, password, confirmPassword}) => {
        console.log(username,email,password,confirmPassword);
		const success = handleInputErrors({ username,email, password, confirmPassword});
		if (!success) return;

		setLoading(true);
		try {
            console.log("at hook signup");
			const res = await fetch("/api/users/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, email,password}),
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
			localStorage.setItem("user", JSON.stringify(data));
            toast.success("Account Created successfully");
			// setAuthUser(data);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, signup };
};
export default useSignup;

function handleInputErrors({ username,email, password, confirmPassword}) {
	
	if (!email || !username || !password || !confirmPassword) {
		toast.error("Please fill in all fields");
		console.log('error');
		return false;
	}

	if (password !== confirmPassword) {
		toast.error("Passwords do not match");
		return false;
	}

	if (password.length < 6) {
		toast.error("Password must be at least 6 characters");
		return false;
	}

	return true;
}