"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function OnIzlemePage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/odeme');
  };

  return (
    <div className="flex h-screen bg-[#f6f8f7] overflow-hidden">
      
      {/* SOL SIDEBAR */}
      <div className="w-[260px] bg-[#163a22] flex flex-col text-white z-20">
        <div className="pt-8">
          <div className="text-center mb-8">
            <div className="w-[85px] h-[85px] bg-white rounded-full p-1 mx-auto mb-2.5 shadow-[0_4px_10px_rgba(0,0,0,0.15)] flex items-center justify-center">
              <span className="text-[#163a22] font-bold text-xl">OGM</span>
            </div>
            <h2 className="text-[1.1rem] font-bold tracking-[0.5px]">OGM MİSAFİRHANE</h2>
            <p className="text-[0.8rem] text-[#8bb197] mt-0.5">Rezervasyon Portalı</p>
          </div>
          <div className="flex flex-col gap-1">
            <Link href="/giris" className="flex items-center gap-3 py-3.5 px-5 text-[#a8c1b1] hover:text-white hover:bg-white/5 text-[0.95rem] transition-all duration-200">
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
              Ana Sayfa
            </Link>
            <Link href="/konaklama" className="flex items-center gap-3 py-3.5 px-5 bg-[#21472e] text-white border-l-4 border-[#8fbc9f] text-[0.95rem] transition-all duration-200">
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 9h-2V9H8v3H6v2h2v3h2v-3h2v-2z"/></svg>
              Rezervasyon Oluştur
            </Link>
            <Link href="/rezervasyonlarim" className="flex items-center gap-3 py-3.5 px-5 text-[#a8c1b1] hover:text-white hover:bg-white/5 text-[0.95rem] transition-all duration-200">
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current"><path d="M4 14h4v-4H4v4zm0 5h4v-4H4v4zM4 9h4V5H4v4zm5 5h12v-4H9v4zm0 5h12v-4H9v4zM9 5v4h12V5H9z"/></svg>
              Rezervasyonlarım
            </Link>
            <Link href="/iletisim" className="flex items-center gap-3 py-3.5 px-5 text-[#a8c1b1] hover:text-white hover:bg-white/5 text-[0.95rem] transition-all duration-200">
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              İletişim
            </Link>
          </div>
        </div>
        <div className="mt-auto p-5 pb-7">
          <Link href="/cikis" className="flex items-center gap-2.5 text-[#d1dcd5] hover:text-white text-[0.95rem] transition-colors">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/></svg>
            Çıkış Yap
          </Link>
        </div>
      </div>

      {/* SAĞ İÇERİK */}
      <div className="flex-1 flex flex-col relative z-10">
        
        {/* ÜST HEADER */}
        <div className="h-[70px] bg-white flex justify-between items-center px-8 shadow-[0_1px_4px_rgba(0,0,0,0.05)] z-20">
          <div className="font-semibold text-[#1a3b25] text-[1.1rem]">OGM Misafirhane Rezervasyon Portalı</div>
          <div className="flex items-center gap-2.5 text-[0.9rem] font-medium text-[#333]">
            <div className="w-8 h-8 bg-[#163a22] text-white rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="white"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-3 2c-2.67 0-8 1.34-8 4v2h16v-2c0-.42.09-.81.25-1.18-.75-.4-1.7-.68-2.85-.82H9zm11 0c-1.85 0-3.15 1.5-3.15 2.5 0 2 3.15 4.5 3.15 4.5s3.15-2.5 3.15-4.5c0-1-1.3-2.5-3.15-2.5z"/></svg>
            </div>
            <span>Hoş Geldiniz ˅</span>
          </div>
        </div>

        {/* ORTA KISIM */}
        <div className="flex-1 p-12 flex flex-col items-center relative z-10 overflow-y-auto">
          
          <div className="bg-white w-full max-w-[900px] p-6 px-8 rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.02)] mb-8 relative z-10">
            <h1 className="text-[1.4rem] text-[#111] mb-1.5">Yeni Rezervasyon Oluştur</h1>
            <p className="text-[0.9rem] text-[#555]">Bilgilerinizi adım adım doldurunuz</p>
          </div>

          {/* FORM KARTI */}
          <div className="bg-white w-full max-w-[900px] rounded-xl p-8 md:px-10 shadow-[0_8px_24px_rgba(0,0,0,0.04)] relative z-10">
            
            {/* STEPPER */}
            <div className="flex items-center justify-between w-full mb-14 px-4">
              <div className="flex items-center gap-2 text-[#888] font-medium text-[1rem]">
                <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] fill-current"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/></svg>
                <span>Konaklama</span>
              </div>
              <div className="flex-1 h-[1px] bg-[#d1d5db] mx-5"></div>
              <div className="flex items-center gap-2 text-[#888] font-medium text-[1rem]">
                <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] fill-current"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
                <span>Oda Seçimi</span>
              </div>
              <div className="flex-1 h-[1px] bg-[#d1d5db] mx-5"></div>
              <div className="flex items-center gap-2 text-[#1a3b25] font-semibold text-[1rem]">
                <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] fill-current"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                <span>Ön İzleme</span>
              </div>
              <div className="flex-1 h-[1px] bg-[#d1d5db] mx-5"></div>
              <div className="flex items-center gap-2 text-[#888] font-medium text-[1rem]">
                <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] fill-current"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>
                <span>Ödeme</span>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-[1.35rem] font-semibold text-[#1a3b25] mb-1.5">Ön İzleme</h2>
              <p className="text-[0.9rem] text-[#888]">Lütfen ödeme adımına geçmeden önce rezervasyon bilgilerinizi kontrol edip onaylayın.</p>
            </div>

            <form onSubmit={handleSubmit}>

              <div className="border border-[#eaeaea] rounded-lg p-6 mb-6 bg-[#fcfdfc]">
                <h3 className="text-[1.05rem] text-[#1a3b25] border-b border-[#eaeaea] pb-2 mb-4 font-semibold">Konaklama Özeti</h3>
                <div className="flex justify-between mb-2 text-[0.95rem] text-[#555]">
                  <span>Giriş Tarihi:</span>
                  <strong className="text-[#222]">01/09/2026</strong>
                </div>
                <div className="flex justify-between mb-2 text-[0.95rem] text-[#555]">
                  <span>Çıkış Tarihi:</span>
                  <strong className="text-[#222]">05/09/2026</strong>
                </div>
                <div className="flex justify-between text-[0.95rem] text-[#555]">
                  <span>Kişi Sayısı:</span>
                  <strong className="text-[#222]">2 Yetişkin</strong>
                </div>
              </div>

              <div className="border border-[#eaeaea] rounded-lg p-6 mb-6 bg-[#fcfdfc]">
                <h3 className="text-[1.05rem] text-[#1a3b25] border-b border-[#eaeaea] pb-2 mb-4 font-semibold">Oda Bilgisi</h3>
                <div className="flex justify-between mb-2 text-[0.95rem] text-[#555]">
                  <span>Seçilen Oda:</span>
                  <strong className="text-[#222]">Oda 102 (Suit)</strong>
                </div>
                <div className="flex justify-between text-[0.95rem] text-[#555]">
                  <span>Oda Tipi:</span>
                  <strong className="text-[#222]">Suit Oda</strong>
                </div>
              </div>

              <div className="border rounded-lg p-6 mb-6 bg-[#f0fdf4] border-[#bbf7d0]">
                <h3 className="text-[1.05rem] border-b pb-2 mb-4 font-semibold text-[#166534] border-[#bbf7d0]">Ödeme Detayı</h3>
                <div className="flex justify-between mb-2 text-[0.95rem] text-[#555]">
                  <span>Fiyat Türü:</span>
                  <strong className="text-[#222]">Standart Fiyat</strong>
                </div>
                <div className="flex justify-between mb-2 text-[0.95rem] text-[#555]">
                  <span>Günlük Tutar:</span>
                  <strong className="text-[#222]">₺1800,00</strong>
                </div>
                <div className="flex justify-between mb-4 text-[0.95rem] text-[#555]">
                  <span>Konaklama Süresi:</span>
                  <strong className="text-[#222]">4 Gece</strong>
                </div>
                <div className="flex justify-between text-[1.2rem] mt-2.5">
                  <span className="text-[#555]">Toplam Tutar:</span>
                  <strong className="text-[#166534]">₺7200,00</strong>
                </div>
              </div>

              <hr className="border-t border-[#eaeaea] my-8 mt-10" />
              
              <div className="flex justify-between items-center relative">
                <Link href="/oda-secimi" className="bg-white border border-[#ccc] text-[#555] py-2.5 px-6 rounded-md text-[0.9rem] font-medium inline-flex items-center gap-2 transition-colors hover:bg-[#f0f0f0]">
                  ← Geri
                </Link>
                <button type="submit" className="bg-[#1a3b25] border-none text-white py-2.5 px-10 rounded-md text-[0.9rem] font-medium cursor-pointer inline-flex items-center gap-2 transition-colors hover:bg-[#122a1a]">
                  Ödeme Adımına Geç →
                </button>
              </div>

            </form>
          </div>

          {/* ARKA PLAN AĞAÇ */}
          <svg className="absolute -bottom-5 -right-5 w-[550px] h-[800px] z-0 pointer-events-none overflow-hidden blur-[10px] opacity-25 mix-blend-multiply" viewBox="0 0 500 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M320 800V420L295 450L275 410L250 450L220 395L190 440L150 380L110 450L70 370L20 480V800H320Z" fill="#7fa98c"/>
            <path d="M420 800V310L395 345L375 305L350 345L325 290L295 335L260 270L220 340L180 260L130 360L80 430V800H420Z" fill="#699677"/>
            <path d="M480 800V240L455 275L435 235L410 275L385 220L355 265L320 200L280 270L240 190L190 290L140 370L100 450L70 520V800H480Z" fill="#588566"/>
            <path d="M500 800V150L465 200L435 145L400 195L365 130L325 185L285 110L235 190L185 100L130 210L80 310L40 400L20 500V800H500Z" fill="#477355"/>
          </svg>
        </div>
      </div>
    </div>
  );
}
