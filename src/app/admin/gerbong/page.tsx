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

        const payload = { nama, kereta_id: keretaId }
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
        await fetch(`http://localhost:3001/api/gerbong/${id}`, { method: "DELETE" })
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
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                Data Gerbong
            </h1>

            {/* FORM */}
            <form
                onSubmit={handleSubmit}
                className="
                  bg-white dark:bg-neutral-900
                  border border-neutral-200 dark:border-neutral-800
                  shadow shadow-black/40
                  p-4 flex gap-2 rounded-lg
                "
            >
                <input
                    className="
                      border border-neutral-300 dark:border-neutral-700
                      bg-white dark:bg-neutral-950
                      text-neutral-900 dark:text-neutral-100
                      p-2 flex-1 rounded
                    "
                    placeholder="Nama Gerbong"
                    value={nama}
                    onChange={e => setNama(e.target.value)}
                    required
                />

                <select
                    className="
                      border border-neutral-300 dark:border-neutral-700
                      bg-white dark:bg-neutral-950
                      text-neutral-900 dark:text-neutral-100
                      p-2 rounded
                    "
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

                <button
                    className="
                      bg-neutral-900 dark:bg-neutral-100
                      text-white dark:text-neutral-900
                      px-4 rounded
                    "
                >
                    {editId ? "Update" : "Tambah"}
                </button>
            </form>

            {/* TABLE */}
            <div
                className="
                  bg-white dark:bg-neutral-900
                  border border-neutral-200 dark:border-neutral-800
                  shadow shadow-black/40
                  rounded-lg overflow-hidden
                "
            >
                <table className="w-full">
                    <thead className="bg-neutral-100 dark:bg-neutral-800">
                        <tr>
                            <th className="p-3 text-left">Nama Gerbong</th>
                            <th className="p-3 text-left">Kereta</th>
                            <th className="p-3 text-left">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gerbong.map(g => (
                            <tr
                                key={g.id}
                                className="border-t border-neutral-200 dark:border-neutral-800"
                            >
                                <td className="p-3">{g.nama}</td>
                                <td className="p-3">{g.kereta_nama}</td>
                                <td className="p-3 flex gap-2">
                                    <button
                                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                                        onClick={() => handleEdit(g)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-600 text-white px-3 py-1 rounded"
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
        </div>
    )
}
