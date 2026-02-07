"use client"

import { useEffect, useState } from "react"
import { Jadwal, Kereta } from "@/app/lib/types"

export default function JadwalPage() {
    const [jadwal, setJadwal] = useState<Jadwal[]>([])
    const [kereta, setKereta] = useState<Kereta[]>([])
    const [keretaId, setKeretaId] = useState<number | "">("")
    const [tanggal, setTanggal] = useState("")
    const [berangkat, setBerangkat] = useState("")
    const [tujuan, setTujuan] = useState("")
    const [harga, setHarga] = useState("")
    const [editId, setEditId] = useState<number | null>(null)

    async function fetchData() {
        const j = await fetch("http://localhost:3001/api/jadwal").then(r => r.json())
        const k = await fetch("http://localhost:3001/api/kereta").then(r => r.json())
        setJadwal(j)
        setKereta(k)
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        const payload = {
            kereta_id: keretaId,
            tanggal,
            berangkat,
            tujuan,
            harga: Number(harga),
        }

        const url = editId
            ? `http://localhost:3001/api/jadwal/${editId}`
            : "http://localhost:3001/api/jadwal"

        const method = editId ? "PUT" : "POST"

        await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        })

        setKeretaId("")
        setTanggal("")
        setBerangkat("")
        setTujuan("")
        setHarga("")
        setEditId(null)
        fetchData()
    }

    function handleEdit(j: Jadwal) {
        setKeretaId(j.kereta_id)
        setTanggal(j.tanggal)
        setBerangkat(j.berangkat)
        setTujuan(j.tujuan)
        setHarga(String(j.harga))
        setEditId(j.id)
    }

    async function handleDelete(id: number) {
        if (!confirm("Hapus jadwal?")) return
        await fetch(`http://localhost:3001/api/jadwal/${id}`, { method: "DELETE" })
        fetchData()
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                Data Jadwal
            </h1>

            {/* FORM */}
            <form
                onSubmit={handleSubmit}
                className="
                  grid grid-cols-6 gap-3 p-4 rounded-lg
                  bg-white dark:bg-neutral-900
                  border border-neutral-200 dark:border-neutral-800
                  shadow shadow-black/40
                "
            >
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
                    <option value="">Kereta</option>
                    {kereta.map(k => (
                        <option key={k.id} value={k.id}>
                            {k.nama}
                        </option>
                    ))}
                </select>

                <input
                    type="date"
                    className="
                      border border-neutral-300 dark:border-neutral-700
                      bg-white dark:bg-neutral-950
                      text-neutral-900 dark:text-neutral-100
                      p-2 rounded
                    "
                    value={tanggal}
                    onChange={e => setTanggal(e.target.value)}
                    required
                />

                <input
                    className="
                      border border-neutral-300 dark:border-neutral-700
                      bg-white dark:bg-neutral-950
                      text-neutral-900 dark:text-neutral-100
                      p-2 rounded
                    "
                    placeholder="Berangkat"
                    value={berangkat}
                    onChange={e => setBerangkat(e.target.value)}
                    required
                />

                <input
                    className="
                      border border-neutral-300 dark:border-neutral-700
                      bg-white dark:bg-neutral-950
                      text-neutral-900 dark:text-neutral-100
                      p-2 rounded
                    "
                    placeholder="Tujuan"
                    value={tujuan}
                    onChange={e => setTujuan(e.target.value)}
                    required
                />

                <input
                    type="number"
                    className="
                      border border-neutral-300 dark:border-neutral-700
                      bg-white dark:bg-neutral-950
                      text-neutral-900 dark:text-neutral-100
                      p-2 rounded
                    "
                    placeholder="Harga"
                    value={harga}
                    onChange={e => setHarga(e.target.value)}
                    required
                />

                <button
                    className="
                      bg-neutral-900 dark:bg-neutral-100
                      text-white dark:text-neutral-900
                      rounded
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
                            <th className="p-3 text-left">Kereta</th>
                            <th className="p-3 text-left">Tanggal</th>
                            <th className="p-3 text-left">Berangkat</th>
                            <th className="p-3 text-left">Tujuan</th>
                            <th className="p-3 text-left">Harga</th>
                            <th className="p-3 text-left">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jadwal.map(j => (
                            <tr
                                key={j.id}
                                className="border-t border-neutral-200 dark:border-neutral-800"
                            >
                                <td className="p-3">{j.kereta_nama}</td>
                                <td className="p-3">{j.tanggal}</td>
                                <td className="p-3">{j.berangkat}</td>
                                <td className="p-3">{j.tujuan}</td>
                                <td className="p-3">Rp {j.harga}</td>
                                <td className="p-3 flex gap-2">
                                    <button
                                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                                        onClick={() => handleEdit(j)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-600 text-white px-3 py-1 rounded"
                                        onClick={() => handleDelete(j.id)}
                                    >
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {jadwal.length === 0 && (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="p-4 text-center text-neutral-500"
                                >
                                    Belum ada data jadwal
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
