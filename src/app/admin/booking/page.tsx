"use client"

import { useEffect, useState } from "react"
import { Jadwal, Kursi } from "@/app/lib/types"
import Link from "next/link"
import { BookingList } from "@/app/lib/types"


export default function BookingPage() {
    const [jadwal, setJadwal] = useState<Jadwal[]>([])
    const [kursi, setKursi] = useState<Kursi[]>([])
    const [jadwalId, setJadwalId] = useState<number | "">("")
    const [kursiId, setKursiId] = useState<number | "">("")
    const [nama, setNama] = useState("")
    const [booking, setBooking] = useState<BookingList[]>([])

    async function fetchBooking() {
        const b = await fetch("http://localhost:3001/api/booking").then(r => r.json())
        setBooking(b)
    }

    async function fetchJadwal() {
        const j = await fetch("http://localhost:3001/api/jadwal").then(r => r.json())
        setJadwal(j)
    }

    async function fetchKursi(jadwal_id: number) {
        const k = await fetch(
            `http://localhost:3001/api/kursi?jadwal_id=${jadwal_id}`
        ).then(r => r.json())

        setKursi(k)
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        await fetch("http://localhost:3001/api/booking", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                jadwal_id: jadwalId,
                kursi_id: kursiId,
                nama_penumpang: nama,
            }),
        })

        setNama("")
        setKursiId("")
        alert("Booking berhasil")
        fetchBooking()
    }

    useEffect(() => {
        fetchJadwal()
        fetchBooking()
    }, [])

    useEffect(() => {
        if (jadwalId) fetchKursi(jadwalId)
    }, [jadwalId])

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Booking Penumpang</h1>

            <form
                onSubmit={handleSubmit}
                className="bg-white p-4 shadow grid grid-cols-4 gap-2"
            >
                <select
                    className="border p-2"
                    value={jadwalId}
                    onChange={e => setJadwalId(Number(e.target.value))}
                    required
                >
                    <option value="">Pilih Jadwal</option>
                    {jadwal.map(j => (
                        <option key={j.id} value={j.id}>
                            {j.kereta_nama} | {j.tanggal} | {j.berangkat} → {j.tujuan}
                        </option>
                    ))}
                </select>

                <select
                    className="border p-2"
                    value={kursiId}
                    onChange={e => setKursiId(Number(e.target.value))}
                    required
                    disabled={!jadwalId}
                >
                    <option value="">Pilih Kursi</option>
                    {kursi.map(k => (
                        <option key={k.id} value={k.id}>
                            {k.nomor} ({k.gerbong_nama})
                        </option>
                    ))}
                </select>

                <input
                    className="border p-2"
                    placeholder="Nama Penumpang"
                    value={nama}
                    onChange={e => setNama(e.target.value)}
                    required
                />

                <button className="bg-gray-900 text-white">
                    Booking
                </button>
            </form>
            <table className="w-full bg-white shadow mt-6">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="p-2">Nama</th>
                        <th className="p-2">Kereta</th>
                        <th className="p-2">Tanggal</th>
                        <th className="p-2">Kursi</th>
                        <th className="p-2">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {booking.map(b => (
                        <tr key={b.id} className="border-t">
                            <td className="p-2">{b.nama_penumpang}</td>
                            <td className="p-2">{b.kereta_nama}</td>
                            <td className="p-2">{b.tanggal}</td>
                            <td className="p-2">{b.kursi_nomor}</td>
                            <td className="p-2">
                                <Link
                                    href={`/admin/booking/${b.id}`}
                                    className="bg-blue-600 text-white px-2 py-1"
                                >
                                    Cetak
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}
