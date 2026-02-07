export default function PetugasPage() {
  return (
    <div
      className="
        bg-white dark:bg-neutral-900
        border border-neutral-200 dark:border-neutral-800
        shadow shadow-black/40
        rounded-lg p-6
        space-y-3
      "
    >
      <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
        Data Petugas
      </h1>

      <p className="text-neutral-600 dark:text-neutral-400">
        Fitur manajemen petugas belum diaktifkan pada sistem ini.
      </p>

      <p className="text-neutral-600 dark:text-neutral-400">
        Seluruh proses pengelolaan data, termasuk jadwal, booking,
        dan rekap pemasukan saat ini dikelola langsung oleh admin.
      </p>

      <div
        className="
          mt-4 inline-block
          px-3 py-1
          text-sm font-medium
          bg-yellow-100 text-yellow-800
          dark:bg-yellow-900/30 dark:text-yellow-300
          rounded
        "
      >
        Status: Nonaktif
      </div>
    </div>
  )
}
