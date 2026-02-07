"use client"

import { useEffect, useState } from "react"
import { Kereta } from "@/app/lib/types"
import KeretaForm from "@/components/admin.tsx/Keretaform"

export default function KeretaPage() {
  const [data, setData] = useState<Kereta[]>([])
  const [selected, setSelected] = useState<Kereta | null>(null)

  async function fetchKereta() {
    const res = await fetch("http://localhost:3001/api/kereta")
    const json = await res.json()
    setData(json)
  }

  async function handleDelete(id: number) {
    if (!confirm("Yakin hapus kereta?")) return

    await fetch(`http://localhost:3001/api/kereta/${id}`, {
      method: "DELETE",
    })

    fetchKereta()
  }

  useEffect(() => {
    fetchKereta()
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
        Data Kereta
      </h1>

      {/* FORM */}
      <div
        className="
          bg-white dark:bg-neutral-900
          border border-neutral-200 dark:border-neutral-800
          shadow shadow-black/40
          rounded-lg p-4
        "
      >
        <KeretaForm
          selected={selected}
          onSuccess={() => {
            setSelected(null)
            fetchKereta()
          }}
        />
      </div>

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
              <th className="p-3 text-left">Nama</th>
              <th className="p-3 text-left">Kelas</th>
              <th className="p-3 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map(k => (
              <tr
                key={k.id}
                className="border-t border-neutral-200 dark:border-neutral-800"
              >
                <td className="p-3">{k.nama}</td>
                <td className="p-3">{k.kelas}</td>
                <td className="p-3 flex gap-2">
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                    onClick={() => setSelected(k)}
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
          </tbody>
        </table>
      </div>
    </div>
  )
}
