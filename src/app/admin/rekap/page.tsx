"use client"

import { useEffect, useState } from "react"
import { RekapBulanan } from "@/app/lib/types"

export default function RekapPage() {
    const [bulan, setBulan] = useState("")
    const [data, setData] = useState<RekapBulanan | null>(null)

    async function fetchRekap() {
        if (!bulan) return

        const res = await fetch(
            `http://localhost:3001/api/rekap?bulan=${bulan}`
        )
        const json = await res.json()
        setData(json)
    }

    useEffect(() => {
        fetchRekap()
    }, [bulan])

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">
                Rekap Pemasukan Bulanan
            </h1>

            <div className="bg-white p-4 shadow flex gap-4 items-center">
                <input
                    type="month"
                    className="border p-2"
                    value={bulan}
                    onChange={e => setBulan(e.target.value)}
                />

                {data && (
                    <div className="text-lg font-semibold">
                        Total: Rp {data.total}
                    </div>
                )}
            </div>
        </div>
    )
}
