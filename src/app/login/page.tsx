"use client"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"

export default function LoginPage() {
    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const onLogin = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/login", user)
            console.log(response)
            
            toast.success("Login success")
            router.push("/profile")
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
            if(user.email.length > 0 && user.password.length > 0) {
                setButtonDisabled(false)
            } else {
                setButtonDisabled(true)
            }
        }, [user])

    return (
        <div className="flex flex-col min-h-screen justify-center items-center bg-red-200">
            <h1 className="text-4xl font-bold text-gray-700 mb-10">{loading ? "Processing" : "Login"}</h1>

            <hr />
            <label htmlFor="email"
            className="text-gray-800 mt-3 mb-3"
            >Email</label>
            <input 
            type="email" 
            className="bg-gray-200 rounded pr-15 px-2 py-2 outline-none border border-gray-400 focus:border-blue-400"
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
            className="bg-gray-200 rounded pr-15 px-2 py-2 outline-none border border-gray-400 focus:border-blue-400"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            name="" 
            id="" 
            placeholder="password"
            />
            <button
            className="cursor-pointer bg-teal-100 rounded-md p-2 mt-5 text-gray-700 font-bold"
            onClick={onLogin}
            >{buttonDisabled ? "No login" : "Login"}</button>
            <Link href="/signup" className="text-sm mt-5 text-gray-800 ">Visit Signup Page</Link>
        </div>
    )
}
