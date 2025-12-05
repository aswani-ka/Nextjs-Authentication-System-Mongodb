"use client"
import Link from "next/link"
import axios from "axios"
import { useEffect, useState } from "react"


export default function VerifyEmailPage() {
    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)

    const verifyUserEmail = async () => {
        try {
            await axios.post("/api/users/verifyemail", {token})
            setVerified(true)
        } catch (error: any) {
            setError(true)
            console.log(error.response.data)
            
        }
    }

    // useEffect(() => {
    //     const urlToken = window.location.search.split("=")[1]
    //     setToken(urlToken || "")
    // }, [])

    // useEffect(() => {
    //     if(token.length > 0) {
    //         verifyUserEmail()
    //     }
    // }, [token])

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const urlToken = params.get("token")
        setToken(urlToken || "")
    }, [])

    useEffect(() => {
        if(token) verifyUserEmail()
    }, [token])

    return(
        <div className="flex flex-col justify-center items-center min-h-screen gap-10">
            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="">{token ? `${token}` : "No token"}</h2>

            {verified && (
                <div className="text-center">
                    <h2 className="text-green-400 text-xl">Email Verified Successfully 🎉</h2>
                    <Link className="mt-5" href="/login">Login</Link>
                </div>
            )}
            {error && (
                <div>
                    <h2 className="text-2xl bg-red-500 text-white p-2 rounded-md">Error!!!</h2>
                </div>
            )}

        </div>
    )
}