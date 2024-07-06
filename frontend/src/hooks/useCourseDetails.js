import { useEffect } from "react"

const useCourseDetails=({id,setCourse})=>{
    // console.log(id);
        useEffect(()=>{
            const getCourse=async()=>{
                const res=await fetch(`/api/courses/${id}`)
                const data=await res.json();
                setCourse(data);
            }
            getCourse()
        },[])
}
export default useCourseDetails