"use client"
import Link from "next/link"
import axios from "axios"
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";



export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState("Nothing")
    const logout = async() => {
        try {
            await axios.get("/api/users/logout")
            toast.success("Logout successful")
            router.push("/login")
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message)
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get("/api/users/me")
        console.log(res.data)
        setData(res.data.data._id)
        
    }


    return (
        <div className="flex flex-col min-h-screen justify-center items-center py-2 bg-gray-800">
            <h1 className="text-white text-5xl font-bold mb-15">Profile Page</h1>
            <hr />
            <p className="text-2xl text-gray-300">My Profile Page</p>
            <hr />
            <h2 className="text-gray-300 text-lg mt-5 bg-gray-900 rounded-md p-3 shadow-2xl"> {data === 'Nothing' ? 'Nothing' : <Link href={`/profile/${data}`}>{data}</Link>}</h2>

            <button
            onClick={getUserDetails}
            className="bg-purple-400 rounded-md p-2 text-gray-300 font-bold mt-15 cursor-pointer"
            >Get User Details</button>

            <button
            onClick={logout}
            className="bg-blue-400 rounded-md p-2 text-gray-300 font-bold mt-15 cursor-pointer"
            >Logout</button>

        </div>
    )
}