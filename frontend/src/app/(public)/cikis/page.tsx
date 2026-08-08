"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { oturumuKapat } from '@/auth';

export default function CikisPage() {
  const router = useRouter();

  useEffect(() => {
    oturumuKapat();       // cookie + localStorage temizle
    router.replace('/giris');
  }, [router]);

  return null;
}
