"use client";

import { authClient } from "@/lib/auth-client";
import { Loader2, LogOut } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function Logout() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    try {
      await authClient.signOut();
      // Re-render server components (layout/navbar) to reflect no session
      router.push("/");

      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div onClick={handleLogout} className="flex items-center gap-2">
      {loading ? (
        <Loader2 className="animate-spin size-4" />
      ) : (
        <>
          Logout <LogOut className="size-4" />
        </>
      )}
    </div>
  );
}
