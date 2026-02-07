"use client"

import { useEffect, useState } from "react"
import { Jadwal, Kursi, BookingList } from "@/app/lib/types"
import Link from "next/link"

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
        fetchBooking()
        alert("Booking berhasil")
    }

    useEffect(() => {
        fetchJadwal()
        fetchBooking()
    }, [])

    useEffect(() => {
        if (jadwalId) fetchKursi(jadwalId)
    }, [jadwalId])

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                Booking Penumpang
            </h1>

            {/* FORM */}
            <form
                onSubmit={handleSubmit}
                className="
                  grid grid-cols-4 gap-3 p-4 rounded-lg
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
                    className="
                      border border-neutral-300 dark:border-neutral-700
                      bg-white dark:bg-neutral-950
                      text-neutral-900 dark:text-neutral-100
                      p-2 rounded
                      disabled:opacity-50
                    "
                    value={kursiId}
                    onChange={e => setKursiId(Number(e.target.value))}
                    disabled={!jadwalId}
                    required
                >
                    <option value="">Pilih Kursi</option>
                    {kursi.map(k => (
                        <option key={k.id} value={k.id}>
                            {k.nomor} ({k.gerbong_nama})
                        </option>
                    ))}
                </select>

                <input
                    className="
                      border border-neutral-300 dark:border-neutral-700
                      bg-white dark:bg-neutral-950
                      text-neutral-900 dark:text-neutral-100
                      p-2 rounded
                    "
                    placeholder="Nama Penumpang"
                    value={nama}
                    onChange={e => setNama(e.target.value)}
                    required
                />

                <button
                    className="
                      bg-neutral-900 dark:bg-neutral-100
                      text-white dark:text-neutral-900
                      rounded
                    "
                >
                    Booking
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
                    <thead className="bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400">
                        <tr>
                            <th className="p-3 text-left">Nama</th>
                            <th className="p-3 text-left">Kereta</th>
                            <th className="p-3 text-left">Tanggal</th>
                            <th className="p-3 text-left">Kursi</th>
                            <th className="p-3 text-left">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {booking.map(b => (
                            <tr
                                key={b.id}
                                className="
    group
    border-t border-neutral-200 dark:border-neutral-800
    transition-colors duration-200
    hover:bg-neutral-100/70 dark:hover:bg-neutral-900/60
  "
                            >

                                <td className="p-3">{b.nama_penumpang}</td>
                                <td className="p-3">{b.kereta_nama}</td>
                                <td className="p-3">{b.tanggal}</td>
                                <td className="p-3">{b.kursi_nomor}</td>
                                <td className="p-3">
                                    <Link
                                        href={`/admin/booking/${b.id}`}
                                        className="bg-blue-600 text-white px-3 py-1 rounded"
                                    >
                                        Cetak
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
