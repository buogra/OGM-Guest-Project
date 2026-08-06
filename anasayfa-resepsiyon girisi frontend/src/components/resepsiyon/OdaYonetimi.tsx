"use client";

import { useState } from "react";
import { odalar as ilkOdalar } from "@/data/resepsiyon-icerik";
import { odaDurumRengi } from "@/lib/format";
import type { Oda, OdaDurumu, OdaKati } from "@/lib/types";

const KATLAR: OdaKati[] = ["Çam Katı", "Meşe Katı", "Kayin Katı"];
const TUM_DURUMLAR: OdaDurumu[] = ["Boş", "Dolu", "Rezerve", "Temizlikte", "Bakımda"];

function aktifDurum(oda: Oda): OdaDurumu {
  return oda.manuelDurum ?? oda.otomatikDurum;
}

export default function OdaYonetimi() {
  const [odalar, setOdalar] = useState<Oda[]>(ilkOdalar);
  const [aktifKat, setAktifKat] = useState<OdaKati>("Çam Katı");
  const [secilenOda, setSecilenOda] = useState<Oda | null>(null);
  const [manuelSecim, setManuelSecim] = useState<OdaDurumu>("Boş");

  const katOdalari = odalar.filter((o) => o.kat === aktifKat);

  const odayiSec = (oda: Oda) => {
    setSecilenOda(oda);
    setManuelSecim(aktifDurum(oda));
  };

  const manuelGuncelle = () => {
    if (!secilenOda) return;
    setOdalar((prev) =>
      prev.map((o) =>
        o.no === secilenOda.no ? { ...o, manuelDurum: manuelSecim } : o
      )
    );
    setSecilenOda((prev) => prev ? { ...prev, manuelDurum: manuelSecim } : null);
  };

  const durumSifirla = () => {
    if (!secilenOda) return;
    setOdalar((prev) =>
      prev.map((o) =>
        o.no === secilenOda.no ? { ...o, manuelDurum: null } : o
      )
    );
    setSecilenOda((prev) => prev ? { ...prev, manuelDurum: null } : null);
    setManuelSecim(secilenOda.otomatikDurum);
  };

  return (
    <div className="flex gap-5 h-full">
      {/* ── Sol: Grid ── */}
      <div className="flex-1 min-w-0">
        {/* Başlık */}
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-gray-800">Oda Yönetimi</h1>
          <p className="text-base text-gray-500 mt-1">
            Oda durumları çıkış saatine göre otomatik güncellenir.{" "}
            <span className="text-ogm-600 font-medium">Gerekirse manuel olarak da değiştirebilirsiniz.</span>
          </p>
        </div>

        {/* Kat Sekmeleri */}
        <div className="flex gap-2 mb-5">
          {KATLAR.map((kat) => (
            <button
              key={kat}
              onClick={() => { setAktifKat(kat); setSecilenOda(null); }}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold border transition-colors
                ${aktifKat === kat
                  ? "bg-ogm-700 text-white border-ogm-700"
                  : "bg-white text-gray-600 border-gray-200 hover:border-ogm-400"
                }`}
            >
              <i className="pi pi-building text-xs" />
              {kat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Özet İstatistik */}
        <div className="flex gap-3 mb-5 flex-wrap">
          {TUM_DURUMLAR.map((d) => {
            const renk = odaDurumRengi(d);
            const sayi = katOdalari.filter((o) => aktifDurum(o) === d).length;
            return (
              <div key={d} className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold border ${renk.bg} ${renk.text} ${renk.border}`}>
                <span className={`h-2 w-2 rounded-full ${d === "Boş" ? "bg-green-500" : d === "Dolu" ? "bg-red-500" : d === "Rezerve" ? "bg-orange-500" : d === "Temizlikte" ? "bg-yellow-500" : "bg-gray-400"}`} />
                {d}: {sayi}
              </div>
            );
          })}
        </div>

        {/* Oda Grid — 100 oda için scroll destekli */}
        <div className="max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
          <div className="grid grid-cols-8 gap-2">
            {katOdalari.map((oda) => {
              const durum = aktifDurum(oda);
              const renk = odaDurumRengi(durum);
              const isSecili = secilenOda?.no === oda.no;
              return (
                <button
                  key={oda.no}
                  onClick={() => odayiSec(oda)}
                  title={`${oda.tip} — ${oda.kapasite} kişilik`}
                  className={`relative flex flex-col items-center justify-center gap-0.5 rounded-xl border-2 p-2 transition-all
                    ${renk.bg} ${renk.border}
                    ${isSecili ? "ring-2 ring-ogm-500 ring-offset-1 scale-105 shadow-lg" : "hover:scale-105 hover:shadow-md"}
                  `}
                >
                  <span className="text-sm font-bold text-gray-700 leading-none">{oda.no}</span>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: Math.min(oda.kapasite, 4) }).map((_, i) => (
                      <i key={i} className="pi pi-user text-gray-400" style={{ fontSize: "7px" }} />
                    ))}
                  </div>
                  <span className={`text-[9px] font-bold leading-none ${renk.text}`}>{durum}</span>
                  {oda.manuelDurum && (
                    <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-orange-400 border-2 border-white" title="Manuel değiştirildi" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Sağ Panel ── */}
      {secilenOda && (
        <div className="w-64 shrink-0">
          <div className="rounded-2xl bg-white border border-gray-200 shadow-lg overflow-hidden sticky top-6">
            {/* Panel Başlık */}
            <div className="bg-ogm-800 px-4 py-3 flex items-center justify-between">
              <h2 className="text-white font-bold text-sm">Oda {secilenOda.no} Yönetimi</h2>
              <button onClick={() => setSecilenOda(null)} className="text-white/70 hover:text-white">
                <i className="pi pi-times text-xs" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              {/* Bilgi */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Kat</span>
                  <span className="font-semibold text-gray-700">{secilenOda.kat}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tip</span>
                  <span className="font-semibold text-gray-700">{secilenOda.tip}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Kapasite</span>
                  <span className="font-semibold text-gray-700">{secilenOda.kapasite} kişi</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Mevcut Durum</span>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-bold border
                    ${odaDurumRengi(aktifDurum(secilenOda)).bg}
                    ${odaDurumRengi(aktifDurum(secilenOda)).text}
                    ${odaDurumRengi(aktifDurum(secilenOda)).border}`}>
                    {aktifDurum(secilenOda)}
                    {!secilenOda.manuelDurum && <span className="ml-1 opacity-60">(otomatik)</span>}
                  </span>
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Manuel Değiştir */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5.5">
                  Durum Değiştir (manuel):
                </label>
                <select
                  value={manuelSecim}
                  onChange={(e) => setManuelSecim(e.target.value as OdaDurumu)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-ogm-500 focus:outline-none"
                >
                  {TUM_DURUMLAR.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={manuelGuncelle}
                className="w-full rounded-lg bg-ogm-700 py-2 text-sm font-semibold text-white hover:bg-ogm-800 transition-colors"
              >
                Güncelle
              </button>

              {secilenOda.manuelDurum && (
                <button
                  onClick={durumSifirla}
                  className="w-full rounded-lg border border-gray-300 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Otomatiğe Dön
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
