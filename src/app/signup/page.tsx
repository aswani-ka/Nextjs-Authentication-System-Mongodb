"use client"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"



export default function SignupPage() {
    const router = useRouter()
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const onSignup = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/signup", user)
            console.log("Signup success",response.data)
            router.push("/login")
            

        } catch (error: any) {
            console.log("Signup failed", error.message)
            
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    
    }

    useEffect(() => {
        if(user.email.length > 0 && user.username.length > 0 && user.password.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user])

    return (
        <div className="flex flex-col min-h-screen justify-center items-center bg-gray-400">
            <h1 className="text-4xl text-white font-bold mb-10">{loading ? "Processing" : "Sign Up"}</h1>
            <hr />
            <label htmlFor="username" className="text-gray-800 mb-3">Username</label>
            <input 
            type="text" 
            className="bg-gray-200 rounded pr-15 px-2 py-2 outline-none border border-gray-500 focus:border-blue-400"
            value={user.username}
            onChange={(e) => setUser({...user, username: e.target.value})}
            name="" 
            id="" 
            placeholder="username"
            />
            <label htmlFor="email"
            className="text-gray-800 mt-3 mb-3"
            >Email</label>
            <input 
            type="email" 
            className="bg-gray-200 rounded pr-15 px-2 py-2 outline-none border border-gray-500 focus:border-blue-400"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            name="" 
            id="" 
            placeholder="email"
            />
            <label htmlFor="password"
            className="text-gray-800 mt-3 mb-3"
            >Password</label>
            <input 
            type="password" 
            className="bg-gray-200 rounded pr-15 px-2 py-2 outline-none border border-gray-500 focus:border-blue-400"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            name="" 
            id="" 
            placeholder="password"
            />
            <button
            className="cursor-pointer bg-teal-100 rounded-md p-2 mt-5 text-gray-800 font-bold"
            onClick={onSignup}
            >{buttonDisabled ? "No Signup" : "Signup"}</button>
            <Link href="/login" className="text-sm mt-5 text-gray-800 ">Visit Login Page</Link>
        </div>
    )
}