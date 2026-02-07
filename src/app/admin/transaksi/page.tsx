export default function TransaksiPage() {
  return (
    <div
      className="
        bg-white dark:bg-neutral-900
        border border-neutral-200 dark:border-neutral-800
        shadow shadow-black/40
        rounded-lg p-6
      "
    >
      <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
        Data Transaksi
      </h1>

      <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
        Transaksi pada sistem ini terjadi secara otomatis saat proses
        <b> booking tiket </b>.
        <br /><br />
        Admin tidak melakukan input transaksi secara manual.
        Seluruh pembayaran akan:
      </p>

      <ul className="list-disc ml-6 mt-4 text-neutral-700 dark:text-neutral-300">
        <li>Tercatat saat booking berhasil</li>
        <li>Terhubung langsung dengan data penumpang</li>
        <li>Direkap otomatis pada menu <b>Rekap Pemasukan</b></li>
      </ul>

      <div
        className="
          mt-6 p-4 rounded
          bg-neutral-100 dark:bg-neutral-800
          text-neutral-700 dark:text-neutral-300
        "
      >
        💡 <b>Catatan:</b>  
        Untuk melihat detail transaksi per penumpang,
        silakan buka menu <b>Booking</b>.
      </div>
    </div>
  )
}
