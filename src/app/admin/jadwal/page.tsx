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

        await fetch(`http://localhost:3001/api/jadwal/${id}`, {
            method: "DELETE",
        })

        fetchData()
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Data Jadwal</h1>

            {/* FORM */}
            <form
                onSubmit={handleSubmit}
                className="bg-white p-4 shadow grid grid-cols-6 gap-2"
            >
                <select
                    className="border p-2 col-span-1"
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
                    className="border p-2 col-span-1"
                    value={tanggal}
                    onChange={e => setTanggal(e.target.value)}
                    required
                />

                <input
                    className="border p-2 col-span-1"
                    placeholder="Berangkat"
                    value={berangkat}
                    onChange={e => setBerangkat(e.target.value)}
                    required
                />

                <input
                    className="border p-2 col-span-1"
                    placeholder="Tujuan"
                    value={tujuan}
                    onChange={e => setTujuan(e.target.value)}
                    required
                />

                <input
                    type="number"
                    className="border p-2 col-span-1"
                    placeholder="Harga"
                    value={harga}
                    onChange={e => setHarga(e.target.value)}
                    required
                />

                <button className="bg-gray-900 text-white col-span-1">
                    {editId ? "Update" : "Tambah"}
                </button>
            </form>

            {/* TABLE */}
            <table className="w-full bg-white shadow mt-6">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="p-2">Kereta</th>
                        <th className="p-2">Tanggal</th>
                        <th className="p-2">Berangkat</th>
                        <th className="p-2">Tujuan</th>
                        <th className="p-2">Harga</th>
                        <th className="p-2">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {jadwal.map(j => (
                        <tr key={j.id} className="border-t">
                            <td className="p-2">{j.kereta_nama}</td>
                            <td className="p-2">{j.tanggal}</td>
                            <td className="p-2">{j.berangkat}</td>
                            <td className="p-2">{j.tujuan}</td>
                            <td className="p-2">Rp {j.harga}</td>
                            <td className="p-2 flex gap-2">
                                <button
                                    className="bg-yellow-500 text-white px-2"
                                    onClick={() => handleEdit(j)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-600 text-white px-2"
                                    onClick={() => handleDelete(j.id)}
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
