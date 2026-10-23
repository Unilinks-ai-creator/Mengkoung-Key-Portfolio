"use client";

import { AdminGuard } from "@/components/admin-guard";
import { AdminSidebar } from "@/components/admin-sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
      {(user) => (
        <div className="flex min-h-screen bg-bg text-fg">
          <AdminSidebar user={user} />
          <div className="flex-1 min-w-0">{children}</div>
        </div>
      )}
    </AdminGuard>
  );
}
