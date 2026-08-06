"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#f6f8f7] flex items-center justify-center py-10 px-4">
      <div className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-[#eaeaea] w-full max-w-[680px] overflow-hidden">
        
        {/* Başlık */}
        <div className="bg-[#163a22] py-7 px-9 flex items-center gap-4">
          <div className="w-12 h-12 shrink-0 bg-white/10 rounded-full flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white"><path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
          </div>
          <div>
            <div className="text-[0.7rem] font-bold tracking-[0.07em] text-white/40 uppercase">Orman Genel Müdürlüğü</div>
            <div className="text-[1.2rem] font-bold text-white my-1">Personel Kaydı</div>
            <div className="text-[0.75rem] text-white/45">OGM personeline özel üyelik kaydı</div>
          </div>
        </div>

        {/* Form Gövdesi */}
        <div className="p-8 md:px-9 md:pb-9">
          <form action="/giris" method="get" noValidate autoComplete="off">
            
            {/* KİŞİSEL BİLGİLER */}
            <div className="text-[0.7rem] font-bold tracking-[0.08em] uppercase text-[#2b5e39] border-b-2 border-[#e6f0ea] pb-1.5 mb-4.5 mt-0">
              Kişisel Bilgiler
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-x-6 mb-6">
              <div className="flex flex-col">
                <label className="text-[0.82rem] font-semibold text-[#444] mb-1.5"><span className="text-[#e53e3e] mr-0.5">*</span>Ad</label>
                <input type="text" placeholder="Adınız" className="w-full p-3 px-4 border-[1.5px] border-[#e0e0e0] rounded-lg text-[0.9rem] text-[#222] bg-[#fafafa] outline-none transition-all focus:border-[#2b5e39] focus:shadow-[0_0_0_3px_rgba(43,94,57,0.1)] focus:bg-white" />
              </div>
              <div className="flex flex-col">
                <label className="text-[0.82rem] font-semibold text-[#444] mb-1.5"><span className="text-[#e53e3e] mr-0.5">*</span>Soyad</label>
                <input type="text" placeholder="Soyadınız" className="w-full p-3 px-4 border-[1.5px] border-[#e0e0e0] rounded-lg text-[0.9rem] text-[#222] bg-[#fafafa] outline-none transition-all focus:border-[#2b5e39] focus:shadow-[0_0_0_3px_rgba(43,94,57,0.1)] focus:bg-white" />
              </div>
              <div className="flex flex-col">
                <label className="text-[0.82rem] font-semibold text-[#444] mb-1.5"><span className="text-[#e53e3e] mr-0.5">*</span>T.C. Kimlik No</label>
                <input type="text" placeholder="11 haneli TC kimlik no" maxLength={11} className="w-full p-3 px-4 border-[1.5px] border-[#e0e0e0] rounded-lg text-[0.9rem] text-[#222] bg-[#fafafa] outline-none transition-all focus:border-[#2b5e39] focus:shadow-[0_0_0_3px_rgba(43,94,57,0.1)] focus:bg-white" />
              </div>
              <div className="flex flex-col">
                <label className="text-[0.82rem] font-semibold text-[#444] mb-1.5"><span className="text-[#e53e3e] mr-0.5">*</span>Sicil Numarası</label>
                <input type="text" placeholder="OGM sicil numaranız" className="w-full p-3 px-4 border-[1.5px] border-[#e0e0e0] rounded-lg text-[0.9rem] text-[#222] bg-[#fafafa] outline-none transition-all focus:border-[#2b5e39] focus:shadow-[0_0_0_3px_rgba(43,94,57,0.1)] focus:bg-white" />
              </div>
            </div>

            {/* İLETİŞİM BİLGİLERİ */}
            <div className="text-[0.7rem] font-bold tracking-[0.08em] uppercase text-[#2b5e39] border-b-2 border-[#e6f0ea] pb-1.5 mb-4.5 mt-6">
              İletişim Bilgileri
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-x-6 mb-6">
              <div className="flex flex-col">
                <label className="text-[0.82rem] font-semibold text-[#444] mb-1.5"><span className="text-[#e53e3e] mr-0.5">*</span>E-posta</label>
                <input type="email" placeholder="ornek@ogm.gov.tr" autoComplete="email" className="w-full p-3 px-4 border-[1.5px] border-[#e0e0e0] rounded-lg text-[0.9rem] text-[#222] bg-[#fafafa] outline-none transition-all focus:border-[#2b5e39] focus:shadow-[0_0_0_3px_rgba(43,94,57,0.1)] focus:bg-white" />
              </div>
              <div className="flex flex-col">
                <label className="text-[0.82rem] font-semibold text-[#444] mb-1.5"><span className="text-[#e53e3e] mr-0.5">*</span>Telefon</label>
                <input type="tel" placeholder="05XX XXX XX XX" className="w-full p-3 px-4 border-[1.5px] border-[#e0e0e0] rounded-lg text-[0.9rem] text-[#222] bg-[#fafafa] outline-none transition-all focus:border-[#2b5e39] focus:shadow-[0_0_0_3px_rgba(43,94,57,0.1)] focus:bg-white" />
              </div>
            </div>

            {/* GÜVENLİK */}
            <div className="text-[0.7rem] font-bold tracking-[0.08em] uppercase text-[#2b5e39] border-b-2 border-[#e6f0ea] pb-1.5 mb-4.5 mt-6">
              Güvenlik
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-x-6 mb-6">
              <div className="flex flex-col relative">
                <label className="text-[0.82rem] font-semibold text-[#444] mb-1.5"><span className="text-[#e53e3e] mr-0.5">*</span>Şifre</label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} placeholder="Şifrenizi belirleyin" autoComplete="new-password" className="w-full p-3 px-4 pr-11 border-[1.5px] border-[#e0e0e0] rounded-lg text-[0.9rem] text-[#222] bg-[#fafafa] outline-none transition-all focus:border-[#2b5e39] focus:shadow-[0_0_0_3px_rgba(43,94,57,0.1)] focus:bg-white" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-[#aaa] hover:text-[#2b5e39] transition-colors">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex flex-col relative">
                <label className="text-[0.82rem] font-semibold text-[#444] mb-1.5"><span className="text-[#e53e3e] mr-0.5">*</span>Şifre Tekrar</label>
                <div className="relative">
                  <input type={showConfirmPassword ? "text" : "password"} placeholder="Şifreyi tekrar girin" autoComplete="new-password" className="w-full p-3 px-4 pr-11 border-[1.5px] border-[#e0e0e0] rounded-lg text-[0.9rem] text-[#222] bg-[#fafafa] outline-none transition-all focus:border-[#2b5e39] focus:shadow-[0_0_0_3px_rgba(43,94,57,0.1)] focus:bg-white" />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-[#aaa] hover:text-[#2b5e39] transition-colors">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* KVKK */}
            <div className="flex items-start gap-2.5 mt-5">
              <input type="checkbox" id="kvkk" className="w-4 h-4 mt-[3px] accent-[#1e4829] shrink-0" />
              <label htmlFor="kvkk" className="text-[0.8rem] text-[#666] leading-[1.55] cursor-pointer">
                <strong className="text-[#1e4829]">Kişisel Verilerin Korunması Aydınlatma Metni</strong>'ni okudum, anladım ve kabul ediyorum.
              </label>
            </div>

            {/* AKSIYON */}
            <div className="flex items-center justify-between flex-wrap gap-3 mt-7 pt-5 border-t border-[#eaeaea]">
              <Link href="/giris" className="text-[0.83rem] text-[#2b5e39] font-semibold hover:underline">
                ← Giriş sayfasına dön
              </Link>
              <button type="submit" className="inline-flex items-center gap-2 bg-[#163a22] text-white py-2.5 px-8 rounded-full text-[0.92rem] font-semibold tracking-[0.3px] transition-all hover:bg-[#112d1a] hover:-translate-y-[1px] hover:shadow-[0_6px_20px_rgba(26,56,32,0.25)]">
                <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current"><path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                Kayıt Oluştur
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
