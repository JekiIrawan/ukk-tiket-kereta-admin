"use client"

import { useEffect, useState } from "react"
import { Gerbong, Kereta } from "@/app/lib/types"

export default function GerbongPage() {
    const [gerbong, setGerbong] = useState<Gerbong[]>([])
    const [kereta, setKereta] = useState<Kereta[]>([])
    const [nama, setNama] = useState("")
    const [keretaId, setKeretaId] = useState<number | "">("")
    const [editId, setEditId] = useState<number | null>(null)

    async function fetchData() {
        const g = await fetch("http://localhost:3001/api/gerbong").then(r => r.json())
        const k = await fetch("http://localhost:3001/api/kereta").then(r => r.json())

        setGerbong(g)
        setKereta(k)
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        const payload = {
            nama,
            kereta_id: keretaId,
        }

        const url = editId
            ? `http://localhost:3001/api/gerbong/${editId}`
            : "http://localhost:3001/api/gerbong"

        const method = editId ? "PUT" : "POST"

        await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        })

        setNama("")
        setKeretaId("")
        setEditId(null)
        fetchData()
    }

    async function handleDelete(id: number) {
        if (!confirm("Hapus gerbong?")) return

        await fetch(`http://localhost:3001/api/gerbong/${id}`, {
            method: "DELETE",
        })

        fetchData()
    }

    function handleEdit(g: Gerbong) {
        setNama(g.nama)
        setKeretaId(g.kereta_id)
        setEditId(g.id)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Data Gerbong</h1>

            {/* FORM */}
            <form
                onSubmit={handleSubmit}
                className="bg-white p-4 shadow flex gap-2"
            >
                <input
                    className="border p-2 flex-1"
                    placeholder="Nama Gerbong"
                    value={nama}
                    onChange={e => setNama(e.target.value)}
                    required
                />

                <select
                    className="border p-2"
                    value={keretaId}
                    onChange={e => setKeretaId(Number(e.target.value))}
                    required
                >
                    <option value="">Pilih Kereta</option>
                    {kereta.map(k => (
                        <option key={k.id} value={k.id}>
                            {k.nama}
                        </option>
                    ))}
                </select>

                <button className="bg-gray-900 text-white px-4">
                    {editId ? "Update" : "Tambah"}
                </button>
            </form>

            {/* TABLE */}
            <table className="w-full bg-white shadow mt-6">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="p-2">Nama Gerbong</th>
                        <th className="p-2">Kereta</th>
                        <th className="p-2">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {gerbong.map(g => (
                        <tr key={g.id} className="border-t">
                            <td className="p-2">{g.nama}</td>
                            <td className="p-2">{g.kereta_nama}</td>
                            <td className="p-2 flex gap-2">
                                <button
                                    className="bg-yellow-500 text-white px-2"
                                    onClick={() => handleEdit(g)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-600 text-white px-2"
                                    onClick={() => handleDelete(g.id)}
                                >
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
