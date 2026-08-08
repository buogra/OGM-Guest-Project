"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/auth";
import { ROLLER } from "@/auth/roller";

// Dashboard: misafir, personel yakını ve personel ortak kullanır
const IZINLI_ROLLER = [ROLLER.MISAFIR, ROLLER.PERSONEL_YAKINI, ROLLER.PERSONEL];

export default function MisafirLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { kullanici, yukleniyor } = useAuth();

  useEffect(() => {
    if (!yukleniyor) {
      if (!kullanici) {
        router.replace("/giris");
      } else if (!(IZINLI_ROLLER as string[]).includes(kullanici.rol)) {
        router.replace("/giris");
      }
    }
  }, [kullanici, yukleniyor, router]);

  if (yukleniyor || !kullanici) {
    return <div>Yükleniyor...</div>;
  }

  return <>{children}</>;
}
