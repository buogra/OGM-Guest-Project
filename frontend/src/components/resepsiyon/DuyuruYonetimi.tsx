"use client";

import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";

export type Duyuru = {
  id: string;
  tur: string;
  baslik: string;
  icerik: string;
  tarih: string;
};

export default function DuyuruYonetimi() {
  const [duyurular, setDuyurular] = useState<Duyuru[]>([
    { id: "1", tur: "Duyuru", baslik: "2025 Yaz Rezervasyonları", icerik: "2025 yaz sezonu rezervasyonları başladı! Erken rezervasyon indirimi için hemen arayın.", tarih: "2024-08-01" },
    { id: "2", tur: "Bilgi", baslik: "Yeni Aile Odaları", icerik: "Yeni aile odaları Haziran 2025 itibarıyla hizmete girmiştir. Kapasite 100 odaya ulaşmıştır.", tarih: "2024-07-15" },
    { id: "3", tur: "Etkinlik", baslik: "Doğa Yürüyüşleri", icerik: "Yaz dönemi doğa yürüyüşleri ve piknik etkinlikleri programı açıklandı.", tarih: "2024-07-20" },
    { id: "4", tur: "Güncelleme", baslik: "Sistem Güncellemesi", icerik: "Online rezervasyon sistemi güncellendi. Artık daha kolay rezervasyon yapabilirsiniz.", tarih: "2024-07-25" }
  ]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [editingDuyuru, setEditingDuyuru] = useState<Partial<Duyuru>>({});
  const [loading, setLoading] = useState(true);

  // Sayfa yüklendiğinde verileri çek
  useEffect(() => {
    fetch("/api/duyurular")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setDuyurular(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Duyurular yüklenemedi", err);
        setLoading(false);
      });
  }, []);

  const isEditing = !!editingDuyuru.id;

  const openNew = () => {
    setEditingDuyuru({});
    setDialogVisible(true);
  };

  const openEdit = (duyuru: Duyuru) => {
    setEditingDuyuru({ ...duyuru });
    setDialogVisible(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Bu duyuruyu silmek istediğinize emin misiniz?")) {
      const yeniDuyurular = duyurular.filter(d => d.id !== id);
      setDuyurular(yeniDuyurular);
      await fetch("/api/duyurular", {
        method: "POST",
        body: JSON.stringify(yeniDuyurular)
      });
    }
  };

  const saveDuyuru = async () => {
    if (!editingDuyuru.tur || !editingDuyuru.baslik || !editingDuyuru.icerik) return;

    let yeniDuyurular = [...duyurular];
    if (isEditing) {
      yeniDuyurular = yeniDuyurular.map(d => d.id === editingDuyuru.id ? { ...d, ...editingDuyuru } as Duyuru : d);
    } else {
      const newDuyuru: Duyuru = {
        id: Date.now().toString(),
        tur: editingDuyuru.tur,
        baslik: editingDuyuru.baslik,
        icerik: editingDuyuru.icerik,
        tarih: editingDuyuru.tarih || new Date().toISOString().split('T')[0]
      };
      yeniDuyurular = [newDuyuru, ...yeniDuyurular];
    }
    
    setDuyurular(yeniDuyurular);
    setDialogVisible(false);

    // API'ye kaydet
    await fetch("/api/duyurular", {
      method: "POST",
      body: JSON.stringify(yeniDuyurular)
    });
  };

  const actionBodyTemplate = (rowData: Duyuru) => {
    return (
      <div className="flex gap-2">
        <Button icon="pi pi-pencil" rounded text severity="info" aria-label="Düzenle" onClick={() => openEdit(rowData)} />
        <Button icon="pi pi-trash" rounded text severity="danger" aria-label="Sil" onClick={() => handleDelete(rowData.id)} />
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-[#0f2a0f] m-0">Duyuru Yönetimi</h1>
          <p className="text-gray-500 m-0 mt-1 text-sm">Anasayfada gösterilecek duyuruları buradan ekleyip düzenleyebilirsiniz.</p>
        </div>
        <Button label="Yeni Duyuru Ekle" icon="pi pi-plus" className="bg-[#16a34a] border-none" onClick={openNew} />
      </div>

      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
        <DataTable value={duyurular} paginator rows={5} emptyMessage={loading ? "Yükleniyor..." : "Kayıtlı duyuru bulunamadı."} responsiveLayout="scroll">
          <Column field="tarih" header="Tarih" sortable style={{ width: "15%" }}></Column>
          <Column field="tur" header="Etiket" sortable style={{ width: "15%" }} body={(row) => <span className="bg-ogm-600 text-white px-2 py-1 rounded text-xs font-bold">{row.tur}</span>}></Column>
          <Column field="baslik" header="Başlık" sortable style={{ width: "25%" }}></Column>
          <Column field="icerik" header="İçerik" style={{ width: "35%" }}></Column>
          <Column body={actionBodyTemplate} exportable={false} style={{ width: "10%" }}></Column>
        </DataTable>
      </div>

      <Dialog 
        visible={dialogVisible} 
        style={{ width: '480px' }} 
        header={isEditing ? "Duyuruyu Düzenle" : "Yeni Duyuru Ekle"} 
        modal 
        className="p-fluid" 
        onHide={() => setDialogVisible(false)}
        headerStyle={{ padding: '1.5rem', borderBottom: '1px solid #f1f5f9', color: '#0f2a0f' }}
        contentStyle={{ padding: '1.5rem', paddingTop: '1rem' }}
      >
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="tarih" className="font-semibold text-[13px] text-gray-600 ml-1">Tarih</label>
            <InputText id="tarih" type="date" value={editingDuyuru.tarih || ''} onChange={(e) => setEditingDuyuru({...editingDuyuru, tarih: e.target.value})} className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-2.5 text-gray-800 focus:bg-white focus:border-ogm-500 focus:ring-2 focus:ring-ogm-500/20 transition-all shadow-sm" />
          </div>
          <div className="field">
            <label htmlFor="tur" className="font-semibold text-[13px] text-gray-600 ml-1">Etiket</label>
            <InputText id="tur" value={editingDuyuru.tur || ''} onChange={(e) => setEditingDuyuru({...editingDuyuru, tur: e.target.value})} className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-2.5 text-gray-800 focus:bg-white focus:border-ogm-500 focus:ring-2 focus:ring-ogm-500/20 transition-all shadow-sm" />
          </div>
          <div className="field">
            <label htmlFor="baslik" className="font-semibold text-[13px] text-gray-600 ml-1">Başlık</label>
            <InputText id="baslik" value={editingDuyuru.baslik || ''} onChange={(e) => setEditingDuyuru({...editingDuyuru, baslik: e.target.value})} className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-2.5 text-gray-800 focus:bg-white focus:border-ogm-500 focus:ring-2 focus:ring-ogm-500/20 transition-all shadow-sm" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="icerik" className="font-semibold text-[13px] text-gray-600 ml-1">İçerik Detayı</label>
            <InputTextarea id="icerik" value={editingDuyuru.icerik || ''} onChange={(e) => setEditingDuyuru({...editingDuyuru, icerik: e.target.value})} required rows={5} className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-gray-800 focus:bg-white focus:border-ogm-500 focus:ring-2 focus:ring-ogm-500/20 transition-all shadow-sm resize-none" />
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-8">
          <Button label="İptal" icon="pi pi-times" text onClick={() => setDialogVisible(false)} className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl px-4 py-2.5 font-semibold transition-colors" />
          <Button label="Kaydet" icon="pi pi-check" onClick={saveDuyuru} className="bg-ogm-600 hover:bg-ogm-700 border-none text-white rounded-xl px-5 py-2.5 font-semibold shadow-md hover:shadow-lg transition-all" />
        </div>
      </Dialog>
    </div>
  );
}
