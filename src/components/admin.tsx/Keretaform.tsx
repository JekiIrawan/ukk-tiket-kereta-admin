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
            className="flex gap-2"
        >
            <input
                className="
      flex-1 p-2 rounded
      bg-white dark:bg-neutral-950
      border border-neutral-300 dark:border-neutral-700
      text-neutral-900 dark:text-neutral-100
    "
                placeholder="Nama Kereta"
            />

            <input
                className="
      p-2 rounded
      bg-white dark:bg-neutral-950
      border border-neutral-300 dark:border-neutral-700
      text-neutral-900 dark:text-neutral-100
    "
                placeholder="Kelas"
            />

            <button
                className="
      bg-neutral-900 dark:bg-neutral-100
      text-white dark:text-neutral-900
      px-4 rounded
    "
            >
                Tambah
            </button>
        </form>

    )
}
