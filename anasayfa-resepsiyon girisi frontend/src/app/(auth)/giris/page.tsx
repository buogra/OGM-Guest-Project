"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [roleTitle, setRoleTitle] = useState('Giriş Türünü Seçiniz');
  const [roleDesc, setRoleDesc] = useState('Rezervasyon oluşturmak için giriş türünüzü seçiniz');
  const [roleIcon, setRoleIcon] = useState('');
  const [targetUrl, setTargetUrl] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleCardClick = (title: string, desc: string, icon: string, target: string) => {
    if (target === '/personel-yakini-dogrulama') {
      router.push(target);
      return;
    }
    setRoleTitle(title + ' Girişi');
    setRoleDesc(desc);
    setRoleIcon(icon);
    setTargetUrl(target);
    setShowForm(true);
  };

  const handleBackClick = () => {
    setShowForm(false);
    setTimeout(() => {
      setRoleTitle('Giriş Türünü Seçiniz');
      setRoleDesc('Rezervasyon oluşturmak için giriş türünüzü seçiniz');
    }, 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(targetUrl);
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
            <Link href="/giris" className="flex items-center gap-3 py-3.5 px-5 bg-[#21472e] text-white border-l-4 border-[#8fbc9f] text-[0.95rem] transition-all duration-200">
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
              Ana Sayfa
            </Link>
            <Link href="/iletisim" className="flex items-center gap-3 py-3.5 px-5 text-[#a8c1b1] hover:text-white hover:bg-white/5 text-[0.95rem] transition-all duration-200">
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              İletişim
            </Link>
          </div>
        </div>
      </div>

      {/* SAĞ İÇERİK */}
      <div className="flex-1 flex flex-col relative z-10">
        
        {/* ÜST HEADER */}
        <div className="h-[70px] bg-white flex justify-end items-center px-8 shadow-[0_1px_4px_rgba(0,0,0,0.05)] z-20">
          <div className="flex items-center gap-2.5 text-[0.9rem] font-medium text-[#333]">
            <div className="w-8 h-8 bg-[#163a22] text-white rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="white"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
            </div>
            <span>Hoş Geldiniz ˅</span>
          </div>
        </div>

        {/* ORTA KISIM */}
        <div className="flex-1 p-12 flex flex-col items-center justify-center relative z-10 overflow-y-auto">
          
          {/* BANNER */}
          <div className="bg-white w-full max-w-[900px] p-6 px-8 rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.02)] mb-10 relative z-10">
            <h1 className="text-[1.4rem] text-[#111] mb-1.5">{roleTitle}</h1>
            <p className="text-[0.9rem] text-[#555]">{roleDesc}</p>
          </div>

          {/* KARTLAR & KAYIT BUTONU */}
          {!showForm ? (
            <div className="w-full max-w-[900px] relative z-10 transition-all duration-300 animate-[fadeSlideIn_0.35s_ease]">
              <div className="flex gap-5 justify-between w-full">
                
                {/* Misafir */}
                <div 
                  className="bg-white flex-1 rounded-lg p-10 px-6 text-center shadow-[0_4px_15px_rgba(0,0,0,0.03)] border-l-[5px] border-[#2b5e39] border-t border-r border-b border-[#eaeaea] flex flex-col items-center transition-all duration-400 cursor-pointer hover:-translate-y-3 hover:scale-[1.02] hover:shadow-[0_20px_30px_rgba(0,0,0,0.08)] hover:border-l-[#1a4225] group"
                  onClick={() => handleCardClick('Misafir', 'E-posta adresiniz ve şifrenizle giriş yapın', 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z', '/misafir-kayit')}
                >
                  <div className="w-[65px] h-[65px] mb-5 text-[#437652] group-hover:scale-110 transition-transform duration-300">
                    <svg viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                  </div>
                  <h3 className="text-[1.15rem] text-[#222] mb-2 font-semibold">Misafir</h3>
                  <p className="text-[0.85rem] text-[#666] leading-[1.4] mb-8 min-h-[40px]">Dışarıdan misafir olarak giriş yapın</p>
                  <span className="bg-[#3b6b4a] text-white px-7 py-2.5 rounded-md text-[0.9rem] font-medium transition-colors hover:bg-[#2b5e39]">Seç →</span>
                </div>

                {/* Personel Yakını */}
                <div 
                  className="bg-[#fcfffd] flex-1 rounded-lg p-10 px-6 text-center shadow-[0_6px_20px_rgba(22,58,34,0.08)] border-2 border-[#bce3cc] border-l-[5px] border-l-[#2b5e39] flex flex-col items-center transition-all duration-400 cursor-pointer hover:-translate-y-3 hover:scale-[1.02] hover:shadow-[0_20px_35px_rgba(22,58,34,0.15)] group"
                  onClick={() => handleCardClick('Personel Yakını', 'OGM personelinin yakını olarak giriş yapın', '', '/personel-yakini-dogrulama')}
                >
                  <div className="w-[65px] h-[65px] mb-5 text-[#437652] group-hover:scale-110 transition-transform duration-300">
                    <svg viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-3 2c-2.67 0-8 1.34-8 4v2h16v-2c0-.42.09-.81.25-1.18-.75-.4-1.7-.68-2.85-.82H9zm11 0c-1.85 0-3.15 1.5-3.15 2.5 0 2 3.15 4.5 3.15 4.5s3.15-2.5 3.15-4.5c0-1-1.3-2.5-3.15-2.5z"/></svg>
                  </div>
                  <h3 className="text-[1.15rem] text-[#222] mb-2 font-semibold">Personel Yakını</h3>
                  <p className="text-[0.85rem] text-[#666] leading-[1.4] mb-8 min-h-[40px]">OGM personelinin yakını olarak giriş yapın</p>
                  <span className="bg-[#3b6b4a] text-white px-7 py-2.5 rounded-md text-[0.9rem] font-medium transition-colors hover:bg-[#2b5e39]">Seç →</span>
                </div>

                {/* Personel */}
                <div 
                  className="bg-white flex-1 rounded-lg p-10 px-6 text-center shadow-[0_4px_15px_rgba(0,0,0,0.03)] border-l-[5px] border-[#2b5e39] border-t border-r border-b border-[#eaeaea] flex flex-col items-center transition-all duration-400 cursor-pointer hover:-translate-y-3 hover:scale-[1.02] hover:shadow-[0_20px_30px_rgba(0,0,0,0.08)] hover:border-l-[#1a4225] group"
                  onClick={() => handleCardClick('Personel', 'E-posta adresiniz ve şifrenizle giriş yapın', 'M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 4c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm4 12H8v-1c0-1.33 2.67-2 4-2s4 .67 4 2v1zm4-6h-4v-2h4v2zm0-4h-4V7h4v2z', '/personel-girisi')}
                >
                  <div className="w-[65px] h-[65px] mb-5 text-[#437652] group-hover:scale-110 transition-transform duration-300">
                    <svg viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 4c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm4 12H8v-1c0-1.33 2.67-2 4-2s4 .67 4 2v1zm4-6h-4v-2h4v2zm0-4h-4V7h4v2z"/></svg>
                  </div>
                  <h3 className="text-[1.15rem] text-[#222] mb-2 font-semibold">Personel</h3>
                  <p className="text-[0.85rem] text-[#666] leading-[1.4] mb-8 min-h-[40px]">OGM personeli olarak giriş yapın</p>
                  <span className="bg-[#3b6b4a] text-white px-7 py-2.5 rounded-md text-[0.9rem] font-medium transition-colors hover:bg-[#2b5e39]">Seç →</span>
                </div>

              </div>

              <div className="flex justify-center mt-6">
                <Link href="/uye-ol" className="inline-flex items-center gap-2 bg-transparent text-[#2b5e39] border-2 border-[#2b5e39] py-2.5 px-9 rounded-full text-[0.92rem] font-semibold tracking-wide transition-all duration-250 hover:bg-[#2b5e39] hover:text-white hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(43,94,57,0.25)] group">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                  Kayıt Ol
                </Link>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-[440px] relative z-10 animate-[fadeSlideIn_0.35s_ease]">
              <div className="bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] overflow-hidden border border-[#eaeaea]">
                
                <div className="bg-[#163a22] p-5 px-7 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d={roleIcon}/></svg>
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-white m-0">{roleTitle}</h2>
                      <p className="text-xs text-white/55 m-0">E-posta ve şifrenizle giriş yapın</p>
                    </div>
                  </div>
                  <button onClick={handleBackClick} className="bg-white/10 border-none text-white/75 py-1.5 px-3.5 rounded-full text-[0.78rem] cursor-pointer hover:bg-white/20 hover:text-white transition-colors whitespace-nowrap">
                    ← Geri Dön
                  </button>
                </div>

                <div className="p-7">
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="mb-4.5">
                      <label className="block text-[0.83rem] font-semibold text-[#444] mb-1.5">E-posta Adresi</label>
                      <input type="email" placeholder="ornek@ogm.gov.tr" className="w-full p-3 px-4 border-[1.5px] border-[#e0e0e0] rounded-lg text-[0.9rem] text-[#222] bg-[#fafafa] outline-none transition-all focus:border-[#2b5e39] focus:shadow-[0_0_0_3px_rgba(43,94,57,0.1)] focus:bg-white" />
                    </div>

                    <div className="mb-4.5">
                      <label className="block text-[0.83rem] font-semibold text-[#444] mb-1.5">Şifre</label>
                      <div className="relative">
                        <input type={showPassword ? "text" : "password"} placeholder="Şifreniz" className="w-full p-3 px-4 pr-11 border-[1.5px] border-[#e0e0e0] rounded-lg text-[0.9rem] text-[#222] bg-[#fafafa] outline-none transition-all focus:border-[#2b5e39] focus:shadow-[0_0_0_3px_rgba(43,94,57,0.1)] focus:bg-white" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-[#aaa] hover:text-[#2b5e39] transition-colors">
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                          </svg>
                        </button>
                      </div>
                    </div>

                    <button type="submit" className="w-full p-3 mt-2 bg-[#1e4829] text-white rounded-lg text-[0.95rem] font-semibold transition-all hover:bg-[#163a22] hover:-translate-y-[1px]">
                      Giriş Yap →
                    </button>
                  </form>
                </div>

              </div>
            </div>
          )}

          {/* ARKA PLAN AĞAÇ */}
          <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-[url('/agac-silueti.png')] bg-no-repeat bg-bottom bg-contain opacity-20 pointer-events-none z-0" style={{ filter: 'sepia(1) hue-rotate(50deg) saturate(2)' }} />

        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
}
