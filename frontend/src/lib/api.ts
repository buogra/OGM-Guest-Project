import axios from "axios";
import type { Kullanici, KullaniciRol, Oda, OdaDurumu, OdaKati, Rezervasyon, RezervasyonDurum, Talep, TalepDurum, TalepTip } from "@/lib/types";

type ApiEnvelope<T> = { success: boolean; message: string; data: T; errorCode?: string | null };

const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080/api" });

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("ogm_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export function apiError(error: unknown): string {
  if (axios.isAxiosError<ApiEnvelope<never>>(error)) return error.response?.data?.message ?? "İşlem sırasında bir hata oluştu.";
  return "İşlem sırasında bir hata oluştu.";
}

const floor: Record<string, OdaKati> = { CAM_KATI: "Çam Katı", MESE_KATI: "Meşe Katı", KAYIN_KATI: "Kayin Katı" };
const roomStatus: Record<string, OdaDurumu> = { BOS: "Boş", DOLU: "Dolu", REZERVE: "Rezerve", TEMIZLIKTE: "Temizlikte", BAKIMDA: "Bakımda" };
const reservationStatus: Record<string, RezervasyonDurum> = { BEKLEMEDE: "Beklemede", ONAYLI: "Onaylı", CHECK_IN: "Check-in", CHECK_OUT: "Check-out", IPTAL: "İptal" };
const role: Record<string, KullaniciRol> = { GUEST: "Misafir", STAFF: "Personel", ADMIN: "Yönetici" };
const requestType: Record<string, TalepTip> = { IPTAL_TALEBI: "İptal Talebi", ODA_ONAYI: "Oda Onayı" };
const requestStatus: Record<string, TalepDurum> = { BEKLIYOR: "Bekliyor", ONAYLANDI: "Onaylandı", REDDEDILDI: "Reddedildi" };

export const backendRole: Record<KullaniciRol, string> = { Misafir: "GUEST", Personel: "STAFF", Yönetici: "ADMIN" };
export const backendRoomStatus: Record<OdaDurumu, string> = { Boş: "BOS", Dolu: "DOLU", Rezerve: "REZERVE", Temizlikte: "TEMIZLIKTE", Bakımda: "BAKIMDA" };
export const backendReservationStatus: Record<RezervasyonDurum, string> = { Beklemede: "BEKLEMEDE", Onaylı: "ONAYLI", "Check-in": "CHECK_IN", "Check-out": "CHECK_OUT", İptal: "IPTAL" };

export function mapRoom(value: any): Oda { return { ...value, kat: floor[value.kat], otomatikDurum: roomStatus[value.otomatikDurum], manuelDurum: value.manuelDurum ? roomStatus[value.manuelDurum] : null }; }
export function mapReservation(value: any): Rezervasyon { return { ...value, id: String(value.id), durum: reservationStatus[value.durum] }; }
export function mapUser(value: any): Kullanici { return { ...value, id: String(value.id), rol: role[value.rol] }; }
export function mapRequest(value: any): Talep { return { ...value, id: String(value.id), tip: requestType[value.tip], durum: requestStatus[value.durum], tarih: value.tarih?.slice(0, 10) }; }

export async function getData<T>(url: string, config?: object): Promise<T> { return (await api.get<ApiEnvelope<T>>(url, config)).data.data; }
export async function postData<T>(url: string, body?: object): Promise<T> { return (await api.post<ApiEnvelope<T>>(url, body)).data.data; }
export async function putData<T>(url: string, body: object): Promise<T> { return (await api.put<ApiEnvelope<T>>(url, body)).data.data; }
export async function patchData<T>(url: string, body?: object): Promise<T> { return (await api.patch<ApiEnvelope<T>>(url, body)).data.data; }
export async function deleteData(url: string): Promise<void> { await api.delete(url); }

export default api;
