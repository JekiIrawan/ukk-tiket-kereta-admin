"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

interface Nota {
    id: number
    nama_penumpang: string
    tanggal_pesan: string
    harga: number
    kursi_nomor: string
    gerbong_nama: string
    kereta_nama: string
    tanggal: string
    berangkat: string
    tujuan: string
}

interface BookingDetail {
    id: number
    nama_penumpang: string
    kereta_nama: string
    gerbong_nama: string
    kursi_nomor: string
    tanggal: string
    berangkat: string
    tujuan: string
    harga: number
}

export default function NotaBookingPage() {
    const { id } = useParams()
    const [data, setData] = useState<BookingDetail | null>(null)

    async function fetchDetail() {
        const res = await fetch(`http://localhost:3001/api/booking/${id}`)
        const json = await res.json()
        setData(json)
    }

    useEffect(() => {
        fetchDetail()
    }, [])

    if (!data) return <p>Loading...</p>

    return (
        <div className="max-w-xl mx-auto bg-white p-6 shadow">
            <h1 className="text-2xl font-bold mb-4 text-center">
                Nota Booking Kereta
            </h1>

            <div className="space-y-2">
                <p><b>Nama Penumpang:</b> {data.nama_penumpang}</p>
                <p><b>Kereta:</b> {data.kereta_nama}</p>
                <p><b>Gerbong:</b> {data.gerbong_nama}</p>
                <p><b>Kursi:</b> {data.kursi_nomor}</p>
                <p><b>Tanggal:</b> {data.tanggal}</p>
                <p><b>Rute:</b> {data.berangkat} → {data.tujuan}</p>
                <p className="font-semibold">
                    Harga: Rp {data.harga.toLocaleString("id-ID")}
                </p>
            </div>

            <button
                onClick={() => window.print()}
                className="mt-6 bg-gray-900 text-white px-4 py-2 w-full print:hidden"
            >
                Cetak Nota
            </button>
        </div>
    )
}