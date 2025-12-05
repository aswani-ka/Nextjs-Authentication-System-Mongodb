"use client"
import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"



export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)


    const onSubmit = async () => {
        if(!email) return toast.error("Email is required")
        try {
            setLoading(true)
            const res = await axios.post("/api/users/forgotpassword", {email})
            toast.success(res.data.message || "Email sent successfully")
            setEmail("")

        } catch (error: any) {
            toast.error(error.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }
    return(
        <div className="flex min-h-screen justify-center items-center bg-orange-100">
            <div className="flex flex-col gap-4 p-10 rounded-lg shadow-xl border bg-gray-200">
                <h2 className="text-xl font-semibold mb-6">Enter your email to receive reset password link</h2>
                <input
                className="bg-gray-500 p-2 rounded-md shadow-lg outline-none text-white"
                placeholder="eg@gmail.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <button
                className="p-2 rounded-md bg-blue-500 text-white disabled:bg-gray-400 cursor-pointer hover:bg-blue-600"
                onClick={onSubmit}
                disabled={loading}
                type="submit">{loading ? "Sending..." : "Send Email"}</button>
            </div>
        </div>
    )
}