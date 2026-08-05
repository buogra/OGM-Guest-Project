"use client";


import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function OdaSecimiPage() {
  const router = useRouter();
  const [selectedRoom, setSelectedRoom] = useState('');

  const handleSelectRoom = (roomType: string) => {
    setSelectedRoom(roomType);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRoom) {
      alert("Lütfen bir oda seçiniz!");
      return;
    }
    router.push('/on-izleme');
  };

  return (
    <div className="flex h-screen bg-[#f6f8f7] overflow-hidden">
      
      {/* SOL SIDEBAR */}
      <div className="w-[260px] bg-[#163a22] flex flex-col text-white z-20">
        <div className="pt-8">
          <div className="text-center mb-8">
            <div className="w-[85px] h-[85px] bg-white rounded-full p-1 mx-auto mb-2.5 shadow-[0_4px_10px_rgba(0,0,0,0.15)] flex items-center justify-center overflow-hidden">
              <Image src="/ogm.logo.png" alt="OGM Logo" width={85} height={85} className="object-contain" />
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
              <div className="flex items-center gap-2 text-[#1a3b25] font-semibold text-[1rem]">
                <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] fill-current"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
                <span>Oda Seçimi</span>
              </div>
              <div className="flex-1 h-[1px] bg-[#d1d5db] mx-5"></div>
              <div className="flex items-center gap-2 text-[#888] font-medium text-[1rem]">
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
              <h2 className="text-[1.35rem] font-semibold text-[#1a3b25] mb-1.5">Oda Seçimi</h2>
              <p className="text-[0.9rem] text-[#888]">Tarihlere uygun, müsait odalardan birini seçin.</p>
            </div>

            <form onSubmit={handleSubmit}>

              {/* Standart Oda */}
              <div className={`border rounded-[10px] p-6 mb-6 flex flex-col sm:flex-row justify-between sm:items-center bg-white transition-all duration-200 hover:shadow-[0_4px_15px_rgba(0,0,0,0.03)] ${selectedRoom === 'Standart' ? 'border-[#2b5e39] bg-[#fdfefd]' : 'border-[#eaeaea] hover:border-[#bce3cc]'}`}>
                <div>
                  <h3 className="text-[1.15rem] text-[#1a3b25] font-semibold mb-1">Oda 101 - Standart Oda</h3>
                  <p className="text-[0.85rem] text-[#666] mb-3">Tek kişilik yatak, klima, TV ve mini bar imkanı.</p>
                  <div className="flex gap-2 text-[0.8rem] text-[#444]">
                    <span className="bg-[#f1f5f2] py-1 px-2.5 rounded-[4px] border border-[#e1e8e3]">1 Yetişkin</span>
                    <span className="bg-[#f1f5f2] py-1 px-2.5 rounded-[4px] border border-[#e1e8e3]">18 m²</span>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end gap-2.5 mt-4 sm:mt-0">
                  <div className="text-[1.25rem] font-bold text-[#1a3b25]">₺1000 <span className="text-[0.8rem] font-normal text-[#777]">/ gece</span></div>
                  <button type="button" onClick={() => handleSelectRoom('Standart')} className={`py-2 px-6 rounded-md text-[0.9rem] font-semibold transition-all duration-200 ${selectedRoom === 'Standart' ? 'bg-[#2b5e39] border border-[#2b5e39] text-white' : 'bg-[#f0f4f1] border border-[#c2d6c7] text-[#2b5e39] hover:bg-[#e2ede5]'}`}>
                    {selectedRoom === 'Standart' ? 'Seçildi ✓' : 'Seç'}
                  </button>
                </div>
              </div>

              {/* Suit Oda */}
              <div className={`border rounded-[10px] p-6 mb-6 flex flex-col sm:flex-row justify-between sm:items-center bg-white transition-all duration-200 hover:shadow-[0_4px_15px_rgba(0,0,0,0.03)] ${selectedRoom === 'Suit' ? 'border-[#2b5e39] bg-[#fdfefd]' : 'border-[#eaeaea] hover:border-[#bce3cc]'}`}>
                <div>
                  <h3 className="text-[1.15rem] text-[#1a3b25] font-semibold mb-1">Oda 102 - Suit Oda</h3>
                  <p className="text-[0.85rem] text-[#666] mb-3">Geniş çift kişilik yatak, oturma alanı ve özel manzaralı.</p>
                  <div className="flex gap-2 text-[0.8rem] text-[#444]">
                    <span className="bg-[#f1f5f2] py-1 px-2.5 rounded-[4px] border border-[#e1e8e3]">2 Yetişkin</span>
                    <span className="bg-[#f1f5f2] py-1 px-2.5 rounded-[4px] border border-[#e1e8e3]">28 m²</span>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end gap-2.5 mt-4 sm:mt-0">
                  <div className="text-[1.25rem] font-bold text-[#1a3b25]">₺1800 <span className="text-[0.8rem] font-normal text-[#777]">/ gece</span></div>
                  <button type="button" onClick={() => handleSelectRoom('Suit')} className={`py-2 px-6 rounded-md text-[0.9rem] font-semibold transition-all duration-200 ${selectedRoom === 'Suit' ? 'bg-[#2b5e39] border border-[#2b5e39] text-white' : 'bg-[#f0f4f1] border border-[#c2d6c7] text-[#2b5e39] hover:bg-[#e2ede5]'}`}>
                    {selectedRoom === 'Suit' ? 'Seçildi ✓' : 'Seç'}
                  </button>
                </div>
              </div>

              {/* Aile Odası */}
              <div className={`border rounded-[10px] p-6 mb-6 flex flex-col sm:flex-row justify-between sm:items-center bg-white transition-all duration-200 hover:shadow-[0_4px_15px_rgba(0,0,0,0.03)] ${selectedRoom === 'Aile' ? 'border-[#2b5e39] bg-[#fdfefd]' : 'border-[#eaeaea] hover:border-[#bce3cc]'}`}>
                <div>
                  <h3 className="text-[1.15rem] text-[#1a3b25] font-semibold mb-1">Oda 103 - Aile Odası</h3>
                  <p className="text-[0.85rem] text-[#666] mb-3">Çok yataklı, aileler için özel konforlu geniş oda.</p>
                  <div className="flex gap-2 text-[0.8rem] text-[#444]">
                    <span className="bg-[#f1f5f2] py-1 px-2.5 rounded-[4px] border border-[#e1e8e3]">3+ Kişilik</span>
                    <span className="bg-[#f1f5f2] py-1 px-2.5 rounded-[4px] border border-[#e1e8e3]">40 m²</span>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end gap-2.5 mt-4 sm:mt-0">
                  <div className="text-[1.25rem] font-bold text-[#1a3b25]">₺2500 <span className="text-[0.8rem] font-normal text-[#777]">/ gece</span></div>
                  <button type="button" onClick={() => handleSelectRoom('Aile')} className={`py-2 px-6 rounded-md text-[0.9rem] font-semibold transition-all duration-200 ${selectedRoom === 'Aile' ? 'bg-[#2b5e39] border border-[#2b5e39] text-white' : 'bg-[#f0f4f1] border border-[#c2d6c7] text-[#2b5e39] hover:bg-[#e2ede5]'}`}>
                    {selectedRoom === 'Aile' ? 'Seçildi ✓' : 'Seç'}
                  </button>
                </div>
              </div>

              <hr className="border-t border-[#eaeaea] my-8 mt-10" />
              
              <div className="flex justify-between items-center relative">
                <Link href="/konaklama" className="bg-white border border-[#ccc] text-[#555] py-2.5 px-6 rounded-md text-[0.9rem] font-medium inline-flex items-center gap-2 transition-colors hover:bg-[#f0f0f0]">
                  ← Geri
                </Link>
                <button type="submit" className="bg-[#1a3b25] border-none text-white py-2.5 px-10 rounded-md text-[0.9rem] font-medium cursor-pointer inline-flex items-center gap-2 transition-colors hover:bg-[#122a1a]">
                  Ön İzlemeye Geç →
                </button>
              </div>

            </form>
          </div>

          {/* ARKA PLAN AĞAÇ */}
          <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-[url('/agac-silueti.png')] bg-no-repeat bg-bottom bg-contain opacity-20 pointer-events-none z-0" style={{ filter: 'sepia(1) hue-rotate(50deg) saturate(2)' }} />
        </div>
      </div>
    </div>
  );
}
