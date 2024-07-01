import { useState } from "react";

const useGetDetails=()=>{
    const [loading,setLoading]=useState(false)
    const getDetails=async({userId})=>{
        setLoading(true)
        console.log(userId);
        try {
            const id=userId
            const res=await fetch(`/api/users/getUser/${id}`,
                {
                    method:"GET",
                    headers:{
                        "Content-Type":"application/json"
                    }
                }
            )
            const data=await res.json()
            return data
        } catch (error) {
            console.log("Error in fetching user detail");
        }
        finally{
            setLoading(false)
        }
    }
    return {loading,getDetails}
}
export default useGetDetails