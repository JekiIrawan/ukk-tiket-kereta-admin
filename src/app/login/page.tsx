"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
    const router = useRouter()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault()
        setError("")

        try {
            const res = await fetch("http://localhost:3001/api/admin/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            })

            if (!res.ok) {
                throw new Error("Login gagal")
            }

            const data = await res.json()

            document.cookie = `admin_token=${data.token}; path=/`
            router.push("/admin")
        } catch (err) {
            setError("Username atau password salah")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleLogin}
                className="bg-white p-6 rounded shadow w-80"
            >
                <h1 className="text-xl font-bold mb-4">Login Admin</h1>

                {error && (
                    <p className="text-red-500 text-sm mb-3">{error}</p>
                )}

                <input
                    className="border p-2 w-full mb-3"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    className="border p-2 w-full mb-4"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />

                <button
                    className="w-full bg-gray-900 text-white py-2 rounded"
                >
                    Login
                </button>
            </form>
        </div>
    )
}
