import type { Oda, Rezervasyon, Kullanici, Talep } from "@/lib/types";

// ─── ODA TİPLERİ ──────────────────────────────────────────────────────────
type OdaTipi = {
  tip: string;
  kapasite: number;
};

const ODA_TIPLERI: OdaTipi[] = [
  { tip: "Tek Kişilik",   kapasite: 1 },
  { tip: "Çift Kişilik",  kapasite: 2 },
  { tip: "Üç Kişilik",    kapasite: 3 },
  { tip: "Aile Odası",    kapasite: 4 },
];

// Sabit dağılım (seed değeri gibi çalışır — her seferinde aynı sonuç)
function odaTipiSec(odaNo: number): OdaTipi {
  // Belirli bir örüntüyle dağıt
  const pattern = [1, 0, 1, 2, 3, 1, 0, 2, 1, 3]; // 10'luk döngü
  return ODA_TIPLERI[pattern[odaNo % 10]];
}

function rastgeleDurum(odaNo: number): Oda["otomatikDurum"] {
  const durumlar: Oda["otomatikDurum"][] = [
    "Boş", "Boş", "Boş", "Dolu", "Rezerve",
    "Boş", "Temizlikte", "Boş", "Boş", "Bakımda",
  ];
  return durumlar[odaNo % 10];
}

// ─── 100 ODA ──────────────────────────────────────────────────────────────
// Çam Katı:  1 – 34  (34 oda)
// Meşe Katı: 35 – 67 (33 oda)
// Kayin Katı:68 – 100 (33 oda)

export const odalar: Oda[] = [
  ...Array.from({ length: 34 }, (_, i) => {
    const no = i + 1;
    const { tip, kapasite } = odaTipiSec(no);
    return {
      no,
      kat: "Çam Katı" as const,
      tip,
      kapasite,
      otomatikDurum: rastgeleDurum(no),
      manuelDurum: null,
    };
  }),
  ...Array.from({ length: 33 }, (_, i) => {
    const no = i + 35;
    const { tip, kapasite } = odaTipiSec(no);
    return {
      no,
      kat: "Meşe Katı" as const,
      tip,
      kapasite,
      otomatikDurum: rastgeleDurum(no),
      manuelDurum: null,
    };
  }),
  ...Array.from({ length: 33 }, (_, i) => {
    const no = i + 68;
    const { tip, kapasite } = odaTipiSec(no);
    return {
      no,
      kat: "Kayin Katı" as const,
      tip,
      kapasite,
      otomatikDurum: rastgeleDurum(no),
      manuelDurum: null,
    };
  }),
];

// ─── REZERVASYONLAR ───────────────────────────────────────────────────────
export const rezervasyonlar: Rezervasyon[] = [
  {
    id: "r1",
    rezNo: "REZ-2024-001",
    misafirAdi: "Ahmet Yılmaz",
    odaNo: 5,
    giris: "2024-08-01",
    cikis: "2024-08-04",
    gece: 3,
    durum: "Onaylı",
  },
  {
    id: "r2",
    rezNo: "REZ-2024-002",
    misafirAdi: "Fatma Demir",
    odaNo: 40,
    giris: "2024-08-02",
    cikis: "2024-08-05",
    gece: 3,
    durum: "Beklemede",
  },
  {
    id: "r3",
    rezNo: "REZ-2024-003",
    misafirAdi: "Mehmet Kaya",
    odaNo: 14,
    giris: "2024-07-28",
    cikis: "2024-07-30",
    gece: 2,
    durum: "Check-in",
  },
  {
    id: "r4",
    rezNo: "REZ-2024-004",
    misafirAdi: "Ayşe Çelik",
    odaNo: 75,
    giris: "2024-08-10",
    cikis: "2024-08-15",
    gece: 5,
    durum: "Onaylı",
  },
  {
    id: "r5",
    rezNo: "REZ-2024-005",
    misafirAdi: "Ali Şahin",
    odaNo: 55,
    giris: "2024-07-25",
    cikis: "2024-07-29",
    gece: 4,
    durum: "Check-out",
  },
];

// ─── KULLANICILAR ─────────────────────────────────────────────────────────
export const kullanicilar: Kullanici[] = [
  {
    id: "u1",
    tcSicilNo: "12345678901",
    adSoyad: "Ahmet Yılmaz",
    eposta: "ahmet@ogm.gov.tr",
    rol: "Misafir",
    aktif: true,
  },
  {
    id: "u2",
    tcSicilNo: "SGS-00142",
    adSoyad: "Fatma Demir",
    eposta: "fatma.demir@ogm.gov.tr",
    rol: "Personel",
    aktif: true,
  },
  {
    id: "u3",
    tcSicilNo: "SGS-00089",
    adSoyad: "Kemal Arslan",
    eposta: "kemal.arslan@ogm.gov.tr",
    rol: "Yönetici",
    aktif: true,
  },
  {
    id: "u4",
    tcSicilNo: "98765432109",
    adSoyad: "Zeynep Kara",
    eposta: "zeynep@mail.com",
    rol: "Misafir",
    aktif: false,
  },
  {
    id: "u5",
    tcSicilNo: "SGS-00211",
    adSoyad: "Mustafa Güler",
    eposta: "m.guler@ogm.gov.tr",
    rol: "Personel",
    aktif: true,
  },
];

// ─── BEKLEYEN TALEPLER ────────────────────────────────────────────────────
export const talepler: Talep[] = [
  {
    id: "t1",
    tip: "İptal Talebi",
    rezNo: "REZ-2024-002",
    misafirAdi: "Fatma Demir",
    odaNo: 40,
    tarih: "2024-07-29",
    durum: "Bekliyor",
    notlar: "Acil aile durumu nedeniyle iptal gerekiyor.",
  },
  {
    id: "t2",
    tip: "Oda Onayı",
    rezNo: "REZ-2024-001",
    misafirAdi: "Ahmet Yılmaz",
    odaNo: 5,
    tarih: "2024-07-28",
    durum: "Bekliyor",
    notlar: "Rezervasyon onayı bekleniyor.",
  },
  {
    id: "t3",
    tip: "İptal Talebi",
    rezNo: "REZ-2024-004",
    misafirAdi: "Ayşe Çelik",
    odaNo: 75,
    tarih: "2024-07-29",
    durum: "Bekliyor",
    notlar: "Tarih değişikliği yapılmak isteniyor.",
  },
];
