"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/auth";

export default function PersonelYakiniLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { kullanici, yukleniyor } = useAuth();

  useEffect(() => {
    if (!yukleniyor) {
      if (!kullanici) router.replace("/giris");
      else if (kullanici.rol !== "PERSONEL_YAKINI") router.replace("/giris");
    }
  }, [kullanici, yukleniyor, router]);

  if (yukleniyor || !kullanici) return <div>Yükleniyor...</div>;
  return <>{children}</>;
}
