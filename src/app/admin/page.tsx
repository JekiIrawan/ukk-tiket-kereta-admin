import DashboardCard from "@/components/dashboard-card"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">
          Dashboard
        </h1>
        <p className="text-sm text-neutral-500">
          Ringkasan aktivitas sistem
        </p>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DashboardCard
          title="Total Transaksi"
          value="128"
          subtitle="Bulan ini"
        />
        <DashboardCard
          title="Total Pemasukan"
          value="Rp 12.500.000"
          subtitle="Februari 2026"
        />
        <DashboardCard
          title="Jumlah Penumpang"
          value="96"
          subtitle="Semua booking"
        />
      </div>

      {/* SECTION BAWAH */}
      <div
        className="
          rounded-xl
          border border-neutral-800
          bg-neutral-900/50
          p-6
          text-neutral-400
          text-sm
        "
      >
        Grafik & analitik akan ditambahkan di sini.
      </div>
    </div>
  )
}
