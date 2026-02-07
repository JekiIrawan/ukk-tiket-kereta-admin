"use client"

import { useEffect, useState } from "react"
import { RekapBulanan } from "@/app/lib/types"

export default function RekapPage() {
  const [bulan, setBulan] = useState("")
  const [data, setData] = useState<RekapBulanan | null>(null)
  const [loading, setLoading] = useState(false)

  async function fetchRekap() {
    if (!bulan) return
    setLoading(true)

    const res = await fetch(
      `http://localhost:3001/api/rekap?bulan=${bulan}`
    )
    const json = await res.json()
    setData(json)

    setLoading(false)
  }

  useEffect(() => {
    fetchRekap()
  }, [bulan])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
        Rekap Pemasukan Bulanan
      </h1>

      {/* FILTER */}
      <div
        className="
          bg-white dark:bg-neutral-900
          border border-neutral-200 dark:border-neutral-800
          shadow shadow-black/40
          rounded-lg p-4
          flex items-center gap-4
        "
      >
        <input
          type="month"
          className="
            border border-neutral-300 dark:border-neutral-700
            bg-white dark:bg-neutral-800
            text-neutral-900 dark:text-neutral-100
            px-3 py-2 rounded
          "
          value={bulan}
          onChange={e => setBulan(e.target.value)}
        />

        {loading && (
          <span className="text-neutral-500 text-sm">
            Mengambil data...
          </span>
        )}
      </div>

      {/* HASIL */}
      {data && (
        <div
          className="
            bg-white dark:bg-neutral-900
            border border-neutral-200 dark:border-neutral-800
            shadow shadow-black/40
            rounded-lg p-6
          "
        >
          <h2 className="text-lg font-medium text-neutral-700 dark:text-neutral-300">
            Total Pemasukan
          </h2>

          <p className="text-3xl font-bold text-emerald-600 mt-2">
            Rp {data.total.toLocaleString("id-ID")}
          </p>

          <p className="text-sm text-neutral-500 mt-1">
            Periode: {bulan}
          </p>
        </div>
      )}

      {!data && bulan && !loading && (
        <p className="text-neutral-500">
          Tidak ada transaksi pada bulan ini.
        </p>
      )}
    </div>
  )
}
