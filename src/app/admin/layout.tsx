import Sidebar from "@/components/sidebar"
import Header from "@/components/header"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-neutral-100 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      <Sidebar />

      <div className="flex flex-col flex-1">
        {/* HEADER */}
        <Header />

        {/* CONTENT */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
