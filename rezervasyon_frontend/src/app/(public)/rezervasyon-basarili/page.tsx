"use client";

import React from 'react';
import Link from 'next/link';

export default function RezervasyonBasariliPage() {
  return (
    <div className="flex h-screen bg-[#f8f9fa] overflow-hidden">
      
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
            <Link href="/konaklama" className="flex items-center gap-3 py-3.5 px-5 text-[#a8c1b1] hover:text-white hover:bg-white/5 text-[0.95rem] transition-all duration-200">
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 9h-2V9H8v3H6v2h2v3h2v-3h2v-2z"/></svg>
              Rezervasyon Oluştur
            </Link>
            <Link href="/rezervasyonlarim" className="flex items-center gap-3 py-3.5 px-5 bg-[#21472e] text-white border-l-4 border-[#8fbc9f] text-[0.95rem] transition-all duration-200">
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
      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        
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
        <div className="flex-1 p-10 flex justify-center items-start gap-8 overflow-y-auto">
          
          {/* SOL ONAY KARTI */}
          <div className="bg-white rounded-xl p-12 shadow-[0_2px_8px_rgba(0,0,0,0.04)] text-center w-full max-w-[550px]">
            <div className="w-[80px] h-[80px] bg-[#245332] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg viewBox="0 0 24 24" className="w-[50px] h-[50px] fill-white"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
            </div>
            <h2 className="text-[1.5rem] font-bold text-[#111] mb-2">Rezervasyonunuz Oluşturulmuştur</h2>
            <p className="text-[#666] text-[0.9rem] mb-8">Rezervasyon işleminiz başarıyla tamamlanmıştır.<br/>Dilediğiniz zaman Rezervasyonlarım sayfasından iptal talebi oluşturabilirsiniz.</p>

            {/* Özet Tablosu */}
            <div className="flex justify-between bg-[#f8f9fa] rounded-lg p-6 mb-8 border border-[#eee]">
              <div className="text-center flex-1">
                <span className="block text-[#666] text-[0.8rem] mb-2">Oda</span>
                <strong className="text-[#111] text-[1.1rem]">301</strong>
              </div>
              <div className="w-[1px] bg-[#ddd]"></div>
              <div className="text-center flex-1">
                <span className="block text-[#666] text-[0.8rem] mb-2">Süre</span>
                <strong className="text-[#111] text-[1.1rem]">6 Gece</strong>
              </div>
              <div className="w-[1px] bg-[#ddd]"></div>
              <div className="text-center flex-1">
                <span className="block text-[#666] text-[0.8rem] mb-2">Toplam</span>
                <strong className="text-[#245332] text-[1.1rem]">₺7.200</strong>
              </div>
            </div>

            {/* YÖNLENDİRME BUTONLARI */}
            <div className="flex gap-4">
              <Link href="/rezervasyonlarim" className="flex-1 bg-[#1c4227] text-white text-center py-4 rounded-lg font-semibold text-[1rem] transition-colors hover:bg-[#122a1a]">
                Rezervasyonlarıma Git
              </Link>
              <Link href="/dashboard" className="flex-1 bg-white text-[#333] border border-[#ddd] text-center py-4 rounded-lg font-semibold text-[1rem] transition-colors hover:bg-[#f0f0f0]">
                Ana Sayfaya Dön
              </Link>
            </div>
          </div>

          {/* SAĞ SİPARİŞ ÖZETİ */}
          <div className="bg-white rounded-xl p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)] w-full max-w-[350px]">
            <h3 className="text-[1.1rem] font-semibold text-[#111] border-b border-[#eee] pb-4 mb-6">Sipariş Özeti</h3>

            <div className="flex justify-between mb-4 text-[0.9rem]">
              <span className="text-[#666]">Oda</span>
              <span className="text-[#111] font-semibold">OGM + 301</span>
            </div>
            <div className="flex justify-between mb-4 text-[0.9rem]">
              <span className="text-[#666]">Süre</span>
              <span className="text-[#111] font-semibold">6 Gece</span>
            </div>
            <div className="flex justify-between mb-4 text-[0.9rem]">
              <span className="text-[#666]">Toplam</span>
              <span className="text-[#111] font-semibold">₺7.200</span>
            </div>

            <div className="flex justify-between mt-8 pt-4 border-t-2 border-[#eee] text-[1rem]">
              <span className="text-[#111] font-bold">Genel Toplam</span>
              <span className="text-[#245332] font-bold">₺7.200</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
