import { redirect } from 'next/navigation';

/**
 * Çıkış sayfası:
 * Kullanıcı "Çıkış Yap" butonuna basınca buraya gelir.
 * Gerektiğinde burada cookie/token temizleme işlemleri yapılabilir.
 * Şu an doğrudan /giris sayfasına yönlendirir.
 */
export default function CikisPage() {
  redirect('/giris');
}
