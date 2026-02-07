"use client"

import { useEffect, useState } from "react"
import { Kereta } from "@/app/lib/types"

interface Props {
    selected: Kereta | null
    onSuccess: () => void
}

export default function KeretaForm({ selected, onSuccess }: Props) {
    const [nama, setNama] = useState("")
    const [kelas, setKelas] = useState("")

    useEffect(() => {
        if (selected) {
            setNama(selected.nama)
            setKelas(selected.kelas)
        }
    }, [selected])

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        const method = selected ? "PUT" : "POST"
        const url = selected
            ? `http://localhost:3001/api/kereta/${selected.id}`
            : "http://localhost:3001/api/kereta"

        await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ nama, kelas }),
        })

        setNama("")
        setKelas("")
        onSuccess()
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-4 shadow flex gap-2"
        >
            <input
                className="border p-2 flex-1"
                placeholder="Nama Kereta"
                value={nama}
                onChange={e => setNama(e.target.value)}
                required
            />

            <input
                className="border p-2 flex-1"
                placeholder="Kelas"
                value={kelas}
                onChange={e => setKelas(e.target.value)}
                required
            />

            <button className="bg-gray-900 text-white px-4">
                {selected ? "Update" : "Tambah"}
            </button>
        </form>
    )
}
