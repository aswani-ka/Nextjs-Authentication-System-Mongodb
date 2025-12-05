"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useRouter, useSearchParams } from "next/navigation"


export default function ResetPasswordPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const token = searchParams.get("token")

    // const [token, setToken] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const onResetPassword = async () => {
        if(!newPassword || newPassword.length < 6){
            return toast.error("Password must be atleast 6 characters")
        }
        try {
            setLoading(true)
            await axios.post("/api/users/resetpassword", {token, newPassword})
            toast.success("Password updated successfully")
            router.push("/login")

        } catch (error: any) {
            toast.error(error.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    // useEffect(() => {
    //     const urlToken = window.location.search.split("=")[1]
    //     setToken(urlToken || "")
    // }, [])

    // useEffect(() => {
    //     if(token.length > 0) {
    //         onResetPassword()
    //     }
    // }, [token])

    return (
        <div className="flex min-h-screen justify-center items-center bg-green-200">
            <div className="flex flex-col gap-4 border p-10 rounded-xl shadow-lg bg-gray-300">
                <p className="text-2xl font-semibold mb-8">Reset Your Password</p>
                <input
                type="password"
                placeholder="Enter new password"
                className="bg-gray-700 p-2 rounded-md text-white outline-none"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                onClick={onResetPassword}
                disabled={loading}
                className="p-2 rounded-md bg-green-500 text-white disabled:bg-gray-400 cursor-pointer"
                >{loading ? "Updating..." : "Reset Password"}</button>
            </div>
        </div>
    )
}