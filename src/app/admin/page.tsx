export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Dashboard Admin
      </h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          Total Transaksi
        </div>
        <div className="bg-white p-4 rounded shadow">
          Total Pemasukan
        </div>
        <div className="bg-white p-4 rounded shadow">
          Jumlah Pelanggan
        </div>
      </div>
    </div>
  )
}
