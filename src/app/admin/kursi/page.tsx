"use client"

import { useEffect, useState } from "react"
import { Kursi, Gerbong } from "@/app/lib/types"

export default function KursiPage() {
    const [kursi, setKursi] = useState<Kursi[]>([])
    const [gerbong, setGerbong] = useState<Gerbong[]>([])
    const [nomor, setNomor] = useState("")
    const [gerbongId, setGerbongId] = useState<number | "">("")
    const [editId, setEditId] = useState<number | null>(null)

    async function fetchData() {
        const krs = await fetch("http://localhost:3001/api/kursi").then(r => r.json())
        const grb = await fetch("http://localhost:3001/api/gerbong").then(r => r.json())

        setKursi(krs)
        setGerbong(grb)
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        const payload = {
            nomor,
            gerbong_id: gerbongId,
        }

        const url = editId
            ? `http://localhost:3001/api/kursi/${editId}`
            : "http://localhost:3001/api/kursi"

        const method = editId ? "PUT" : "POST"

        await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        })

        setNomor("")
        setGerbongId("")
        setEditId(null)
        fetchData()
    }

    async function handleDelete(id: number) {
        if (!confirm("Hapus kursi?")) return

        await fetch(`http://localhost:3001/api/kursi/${id}`, {
            method: "DELETE",
        })

        fetchData()
    }

    function handleEdit(k: Kursi) {
        setNomor(k.nomor)
        setGerbongId(k.gerbong_id)
        setEditId(k.id)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Data Kursi</h1>

            {/* FORM */}
            <form
                onSubmit={handleSubmit}
                className="bg-white p-4 shadow flex gap-2"
            >
                <input
                    className="border p-2 flex-1"
                    placeholder="Nomor Kursi (contoh: 1A)"
                    value={nomor}
                    onChange={e => setNomor(e.target.value)}
                    required
                />

                <select
                    className="border p-2"
                    value={gerbongId}
                    onChange={e => setGerbongId(Number(e.target.value))}
                    required
                >
                    <option value="">Pilih Gerbong</option>
                    {gerbong.map(g => (
                        <option key={g.id} value={g.id}>
                            {g.nama}
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
                        <th className="p-2">Nomor Kursi</th>
                        <th className="p-2">Gerbong</th>
                        <th className="p-2">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {kursi.map(k => (
                        <tr key={k.id} className="border-t">
                            <td className="p-2">{k.nomor}</td>
                            <td className="p-2">{k.gerbong_nama}</td>
                            <td className="p-2 flex gap-2">
                                <button
                                    className="bg-yellow-500 text-white px-2"
                                    onClick={() => handleEdit(k)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-600 text-white px-2"
                                    onClick={() => handleDelete(k.id)}
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
