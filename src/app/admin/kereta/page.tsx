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
    <div>
      <h1 className="text-2xl font-bold mb-4">Data Kereta</h1>

      <KeretaForm
        selected={selected}
        onSuccess={() => {
          setSelected(null)
          fetchKereta()
        }}
      />

      <table className="w-full bg-white shadow mt-6">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Nama</th>
            <th className="p-2">Kelas</th>
            <th className="p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map(k => (
            <tr key={k.id} className="border-t">
              <td className="p-2">{k.nama}</td>
              <td className="p-2">{k.kelas}</td>
              <td className="p-2 flex gap-2">
                <button
                  className="px-2 py-1 bg-yellow-500 text-white"
                  onClick={() => setSelected(k)}
                >
                  Edit
                </button>
                <button
                  className="px-2 py-1 bg-red-600 text-white"
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
  )
}
