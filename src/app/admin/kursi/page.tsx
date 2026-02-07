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
        await fetch(`http://localhost:3001/api/kursi/${id}`, { method: "DELETE" })
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
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                Data Kursi
            </h1>

            {/* FORM */}
            <form
                onSubmit={handleSubmit}
                className="
                  flex gap-3 p-4 rounded-lg
                  bg-white dark:bg-neutral-900
                  border border-neutral-200 dark:border-neutral-800
                  shadow shadow-black/40
                "
            >
                <input
                    className="
                      flex-1 p-2 rounded
                      border border-neutral-300 dark:border-neutral-700
                      bg-white dark:bg-neutral-950
                      text-neutral-900 dark:text-neutral-100
                    "
                    placeholder="Nomor Kursi (contoh: 1A)"
                    value={nomor}
                    onChange={e => setNomor(e.target.value)}
                    required
                />

                <select
                    className="
                      p-2 rounded
                      border border-neutral-300 dark:border-neutral-700
                      bg-white dark:bg-neutral-950
                      text-neutral-900 dark:text-neutral-100
                    "
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

                <button
                    className="
                      px-4 rounded
                      bg-neutral-900 dark:bg-neutral-100
                      text-white dark:text-neutral-900
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
                            <th className="p-3 text-left">Nomor Kursi</th>
                            <th className="p-3 text-left">Gerbong</th>
                            <th className="p-3 text-left">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {kursi.map(k => (
                            <tr
                                key={k.id}
                                className="border-t border-neutral-200 dark:border-neutral-800"
                            >
                                <td className="p-3">{k.nomor}</td>
                                <td className="p-3">{k.gerbong_nama}</td>
                                <td className="p-3 flex gap-2">
                                    <button
                                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                                        onClick={() => handleEdit(k)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-600 text-white px-3 py-1 rounded"
                                        onClick={() => handleDelete(k.id)}
                                    >
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {kursi.length === 0 && (
                            <tr>
                                <td
                                    colSpan={3}
                                    className="p-4 text-center text-neutral-500"
                                >
                                    Belum ada data kursi
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
