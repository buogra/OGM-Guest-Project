"use client";

import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";

export type Duyuru = {
  id: string;
  baslik: string;
  icerik: string;
  tarih: string;
};

const initialDuyurular: Duyuru[] = [
  { id: "1", baslik: "Yaz Sezonu Bakım Çalışmaları", icerik: "Misafirhanemiz 1-5 Eylül arası bakıma girecektir.", tarih: "2024-08-01" },
  { id: "2", baslik: "Yeni Oda Fiyatları", icerik: "2024 yılı itibarıyla oda fiyatlarında güncelleme yapılmıştır.", tarih: "2024-07-15" }
];

export default function DuyuruYonetimi() {
  const [duyurular, setDuyurular] = useState<Duyuru[]>(initialDuyurular);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [editingDuyuru, setEditingDuyuru] = useState<Partial<Duyuru>>({});

  const isEditing = !!editingDuyuru.id;

  const openNew = () => {
    setEditingDuyuru({});
    setDialogVisible(true);
  };

  const openEdit = (duyuru: Duyuru) => {
    setEditingDuyuru({ ...duyuru });
    setDialogVisible(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Bu duyuruyu silmek istediğinize emin misiniz?")) {
      setDuyurular(prev => prev.filter(d => d.id !== id));
    }
  };

  const saveDuyuru = () => {
    if (!editingDuyuru.baslik || !editingDuyuru.icerik) return;

    if (isEditing) {
      setDuyurular(prev => prev.map(d => d.id === editingDuyuru.id ? { ...d, ...editingDuyuru } as Duyuru : d));
    } else {
      const newDuyuru: Duyuru = {
        id: Date.now().toString(),
        baslik: editingDuyuru.baslik,
        icerik: editingDuyuru.icerik,
        tarih: new Date().toISOString().split('T')[0]
      };
      setDuyurular([newDuyuru, ...prev]);
    }
    setDialogVisible(false);
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
        <DataTable value={duyurular} paginator rows={5} emptyMessage="Kayıtlı duyuru bulunamadı." responsiveLayout="scroll">
          <Column field="tarih" header="Tarih" sortable style={{ width: "15%" }}></Column>
          <Column field="baslik" header="Başlık" sortable style={{ width: "35%" }}></Column>
          <Column field="icerik" header="İçerik" style={{ width: "40%" }}></Column>
          <Column body={actionBodyTemplate} exportable={false} style={{ width: "10%" }}></Column>
        </DataTable>
      </div>

      <Dialog visible={dialogVisible} style={{ width: '450px' }} header={isEditing ? "Duyuruyu Düzenle" : "Yeni Duyuru Ekle"} modal className="p-fluid" onHide={() => setDialogVisible(false)}>
        <div className="flex flex-col gap-4 mt-4">
          <div className="field">
            <label htmlFor="baslik" className="font-bold text-sm text-gray-700">Duyuru Başlığı</label>
            <InputText id="baslik" value={editingDuyuru.baslik || ''} onChange={(e) => setEditingDuyuru({...editingDuyuru, baslik: e.target.value})} className="w-full mt-1 border-gray-300 p-2" />
          </div>
          <div className="field">
            <label htmlFor="icerik" className="font-bold text-sm text-gray-700">İçerik</label>
            <InputTextarea id="icerik" value={editingDuyuru.icerik || ''} onChange={(e) => setEditingDuyuru({...editingDuyuru, icerik: e.target.value})} required rows={4} className="w-full mt-1 border-gray-300 p-2" />
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <Button label="İptal" icon="pi pi-times" text onClick={() => setDialogVisible(false)} className="text-gray-600" />
          <Button label="Kaydet" icon="pi pi-check" onClick={saveDuyuru} className="bg-[#16a34a] border-none text-white px-4 py-2 rounded" />
        </div>
      </Dialog>
    </div>
  );
}
