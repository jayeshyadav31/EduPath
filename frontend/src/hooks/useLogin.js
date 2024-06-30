import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const {setAuthUser}=useAuthContext()
  const login = async ({ username, password }) => {
    console.log(username, password);
    setLoading(true);

    const success = handleInputErrors({ username, password });
    if (!success) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/users/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        throw new Error('Error during login');
      }

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("user", JSON.stringify(data));
      setAuthUser(data)
      toast.success("User logged in successfully");
    } catch (error) {
      console.error("Error in useLogin:", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;

function handleInputErrors({ username, password }) {
  if (!username || !password) {
    toast.error("Please fill in all fields");
    console.log('Error: Missing fields');
    return false;
  }
  return true;
}
