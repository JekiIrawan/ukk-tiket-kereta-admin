"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Sidebar() {
  const router = useRouter()

  function handleLogout() {
    document.cookie =
      "admin_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    router.push("/login")
    router.refresh()
  }

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">
        Admin Panel
      </h2>

      <nav className="flex flex-col gap-3">
        <Link href="/admin">Dashboard</Link>
        <Link href="/admin/kereta">Kereta</Link>
        <Link href="/admin/gerbong">Gerbong</Link>
        <Link href="/admin/kursi">Kursi</Link>
        <Link href="/admin/jadwal">Jadwal</Link>
        <Link href="/admin/booking">Booking</Link>
        <Link href="/admin/rekap">Rekap Pemasukan</Link>

        <hr className="my-2 border-gray-700" />

        <Link href="/admin/transaksi">Transaksi</Link>
        <Link href="/admin/petugas">Petugas</Link>
      </nav>


      <button
        onClick={handleLogout}
        className="mt-8 bg-red-600 px-3 py-2 rounded"
      >
        Logout
      </button>
    </aside>
  )
}
