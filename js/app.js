/**
 * Sistem Perhitungan HPP, Operasional, dan Laba Titip Jual Churros
 * Versi 1.1: Revisi Transaksi Purchase Order (PO), Font Awesome, dan Task Checklist
 * Based on PRD UMKM Churros & Bakery Flour Design System
 */

// Icon Component Helper (PRD Section 10.1)
function renderIcon(name, extraClass = '', title = '') {
  const srHtml = title ? `<span class="sr-only">${title}</span>` : '';
  return `<i class="fa-solid fa-${name} ${extraClass}" aria-hidden="true"></i>${srHtml}`;
}

// Initial Seed Data with PO Transactions matching PRD Section 7 & Section 11
const INITIAL_DATA = {
  bahanBaku: [
    { id: 'b1', nama: 'Tepung Terigu Protein Sedang', satuanBeli: 'kg', hargaBeli: 12000, satuanResep: 'gram', rasio: 1000, hargaPerSatuan: 12 },
    { id: 'b2', nama: 'Mentega / Margarin Palmia', satuanBeli: 'kg', hargaBeli: 38000, satuanResep: 'gram', rasio: 1000, hargaPerSatuan: 38 },
    { id: 'b3', nama: 'Telur Ayam Ras', satuanBeli: 'butir', hargaBeli: 2000, satuanResep: 'butir', rasio: 1, hargaPerSatuan: 2000 },
    { id: 'b4', nama: 'Gula Pasir Gulaku', satuanBeli: 'kg', hargaBeli: 17500, satuanResep: 'gram', rasio: 1000, hargaPerSatuan: 17.5 },
    { id: 'b5', nama: 'Kayu Manis Bubuk (Cinnamon)', satuanBeli: 'gram', hargaBeli: 25000, satuanResep: 'gram', rasio: 250, hargaPerSatuan: 100 },
    { id: 'b6', nama: 'Minyak Goreng Sawit', satuanBeli: 'liter', hargaBeli: 18000, satuanResep: 'ml', rasio: 1000, hargaPerSatuan: 18 },
    { id: 'b7', nama: 'Saus Cokelat Dip Belgia', satuanBeli: 'kg', hargaBeli: 60000, satuanResep: 'gram', rasio: 1000, hargaPerSatuan: 60 },
    { id: 'b8', nama: 'Saus Keju Cheddar Lumer', satuanBeli: 'kg', hargaBeli: 75000, satuanResep: 'gram', rasio: 1000, hargaPerSatuan: 75 },
    { id: 'b9', nama: 'Kemasan Box Kraft Churros', satuanBeli: 'pcs', hargaBeli: 650, satuanResep: 'pcs', rasio: 1, hargaPerSatuan: 650 },
    { id: 'b10', nama: 'Kertas Roti / Baking Paper', satuanBeli: 'lembar', hargaBeli: 150, satuanResep: 'lembar', rasio: 1, hargaPerSatuan: 150 }
  ],

  operasional: {
    biayaTetapBulanan: [
      { id: 'ot1', nama: 'Sewa Dapur Produksi', nominal: 500000 },
      { id: 'ot2', nama: 'Listrik & Air Operasional', nominal: 200000 },
      { id: 'ot3', nama: 'Penyusutan Alat Fryer & Spuit', nominal: 100000 }
    ],
    estimasiProduksiBulanan: 1000, // pcs
    ongkosAntarStandar: 5000
  },

  resep: [
    {
      id: 'r1',
      namaProduk: 'Churros Cinnamon Sugar Klasik (50 pcs/batch)',
      deskripsi: 'Churros renyah bertabur bubuk kayu manis dan gula pasir wangi.',
      hasilJadiBatch: 50,
      persenSusut: 3,
      bahan: [
        { bahanId: 'b1', takaran: 400 },
        { bahanId: 'b2', takaran: 150 },
        { bahanId: 'b3', takaran: 4 },
        { bahanId: 'b4', takaran: 100 },
        { bahanId: 'b5', takaran: 30 },
        { bahanId: 'b6', takaran: 1000 }
      ],
      biayaLain: [
        { nama: 'Kemasan Box Kraft & Stiker', nominal: 32500 },
        { nama: 'Gas LPG & Listrik Goreng', nominal: 15000 },
        { nama: 'Upah Tenaga Kerja Langsung', nominal: 40000 }
      ]
    },
    {
      id: 'r2',
      namaProduk: 'Churros Chocolate Melted Dip (50 pcs/batch)',
      deskripsi: 'Churros renyah lengkap dengan cup cocolan saus cokelat lezat.',
      hasilJadiBatch: 50,
      persenSusut: 3,
      bahan: [
        { bahanId: 'b1', takaran: 400 },
        { bahanId: 'b2', takaran: 150 },
        { bahanId: 'b3', takaran: 4 },
        { bahanId: 'b4', takaran: 60 },
        { bahanId: 'b6', takaran: 1000 },
        { bahanId: 'b7', takaran: 600 }
      ],
      biayaLain: [
        { nama: 'Kemasan Box & Cup Saus', nominal: 45000 },
        { nama: 'Gas LPG & Listrik Goreng', nominal: 15000 },
        { nama: 'Upah Tenaga Kerja Langsung', nominal: 40000 }
      ]
    }
  ],

  mitra: [
    {
      id: 'm1',
      nama: 'Warung Pojok Bu Sri',
      alamat: 'Jl. Melati No. 12 (Dekat Pasar Pagi)',
      kontak: '0812-3456-7890 (Bu Sri)',
      jarakKm: 2.5,
      ongkosAntar: 5000,
      skema: 'harga_setor',
      nilaiSkema: 6000,
      catatan: 'Ramai pembeli saat pagi dan sore hari.',
      aktif: true
    },
    {
      id: 'm2',
      nama: 'Toko Berkah Mandiri',
      alamat: 'Kawasan Ruko Sentra Niaga No. 4',
      kontak: '0813-9876-5432 (Pak Hendra)',
      jarakKm: 4.8,
      ongkosAntar: 7000,
      skema: 'komisi',
      nilaiSkema: 20,
      catatan: 'Pelanggan pekerja kantor & perumahan.',
      aktif: true
    },
    {
      id: 'm3',
      nama: 'Kantin Kampus Biru',
      alamat: 'Gedung B Lt. 1, Universitas Terpadu',
      kontak: '0857-1122-3344 (Mbak Maya)',
      jarakKm: 6.2,
      ongkosAntar: 8000,
      skema: 'bagi_hasil',
      nilaiSkema: 70,
      catatan: 'Mahasiswa suka churros rasa cokelat.',
      aktif: true
    },
    {
      id: 'm4',
      nama: 'Toko Kue Aroma Manis',
      alamat: 'Jl. Pahlawan No. 45',
      kontak: '0821-5566-7788 (Ibu Ratna)',
      jarakKm: 3.0,
      ongkosAntar: 6000,
      skema: 'beli_putus',
      nilaiSkema: 5500,
      catatan: 'Selalu bayar tunai di depan.',
      aktif: true
    }
  ],

  // Purchase Order (PO) Architecture (PRD Section 5, 6.6, 7 & 11)
  poList: [
    {
      id: 'po_001',
      noPO: 'PO-202610-001',
      jenisPO: 'titip_mitra', // titip_mitra | pelanggan_langsung
      mitraId: 'm1',
      namaPelanggan: 'Warung Pojok Bu Sri',
      kontak: '0812-3456-7890',
      alamat: 'Jl. Melati No. 12',
      tanggalOrder: '2026-10-23',
      tanggalKirim: '2026-10-23',
      tanggalSetor: '2026-10-24',
      status: 'Selesai', // Draft | Dikonfirmasi | Diproduksi | Dikirim | Selesai | Dibatalkan
      produkId: 'r1',
      jumlahTitip: 20,
      hppSnapshot: 4000, // HPP snapshot saat produksi
      ongkosKirim: 5000,
      alokasiTetapPcs: 800,
      // Rekonsiliasi Hasil Setoran
      jumlahTerjual: 16,
      sisaKembali: 4, // sisa retur layak
      sisaDibuang: 0,
      hargaJualMitra: 8000,
      // Finansial Final (PRD Contoh 7.2: Untung Rp 11.000)
      pendapatanFinal: 96000, // 16 * 6000
      bebanHppFinal: 80000, // 20 * 4000
      biayaOpsFinal: 5000, // ongkos antar
      labaFinal: 11000, // 96000 - 80000 - 5000 = Rp 11.000
      // Pembayaran
      pembayaran: [
        { id: 'pay_1', tahap: 'Pelunasan', nominal: 96000, tanggal: '2026-10-24', metode: 'Tunai' }
      ],
      totalDibayar: 96000,
      statusBayar: 'Lunas',
      catatan: 'Contoh PRD 7.2: Titip 20 pcs, terjual 16 pcs, sisa 4 pcs. Laba bersih Rp 11.000.'
    },
    {
      id: 'po_002',
      noPO: 'PO-202610-002',
      jenisPO: 'pelanggan_langsung',
      mitraId: null,
      namaPelanggan: 'Pak Budi (Arisan Kantor)',
      kontak: '0811-2233-4455',
      alamat: 'Gedung Menara Sudirman Lt. 8',
      tanggalOrder: '2026-10-24',
      tanggalKirim: '2026-10-25',
      tanggalSetor: '2026-10-25',
      status: 'Selesai',
      produkId: 'r2',
      jumlahTitip: 10, // 10 box (50 pcs)
      hppSnapshot: 4800, // Rp 4.800 per box / paket
      ongkosKirim: 15000,
      alokasiTetapPcs: 0,
      jumlahTerjual: 10,
      sisaKembali: 0,
      sisaDibuang: 0,
      hargaJualMitra: 10000, // Rp 10.000 per box
      // Finansial Final (PRD Contoh 7.3: Untung Rp 37.000)
      pendapatanFinal: 100000, // 10 * 10.000 = Rp 100.000
      bebanHppFinal: 48000, // 10 * 4.800 = Rp 48.000
      biayaOpsFinal: 15000, // Ongkos antar kurir
      labaFinal: 37000, // 100.000 - 48.000 - 15.000 = Rp 37.000
      // Pembayaran Berjenjang (DP & Pelunasan)
      pembayaran: [
        { id: 'pay_2a', tahap: 'DP', nominal: 50000, tanggal: '2026-10-24', metode: 'Transfer BCA' },
        { id: 'pay_2b', tahap: 'Pelunasan', nominal: 50000, tanggal: '2026-10-25', metode: 'Transfer BCA' }
      ],
      totalDibayar: 100000,
      statusBayar: 'Lunas',
      catatan: 'Contoh PRD 7.3: Pre-order 10 box cokelat. DP Rp 50.000 + Pelunasan Rp 50.000. Laba bersih Rp 37.000.'
    },
    {
      id: 'po_003',
      noPO: 'PO-202610-003',
      jenisPO: 'titip_mitra',
      mitraId: 'm2',
      namaPelanggan: 'Toko Berkah Mandiri',
      kontak: '0813-9876-5432',
      alamat: 'Kawasan Ruko Sentra Niaga No. 4',
      tanggalOrder: '2026-10-25',
      tanggalKirim: '2026-10-25',
      tanggalSetor: null,
      status: 'Dikirim', // Sedang aktif dipajang di toko
      produkId: 'r2',
      jumlahTitip: 30,
      hppSnapshot: 4800,
      ongkosKirim: 7000,
      alokasiTetapPcs: 800,
      jumlahTerjual: 0,
      sisaKembali: 0,
      sisaDibuang: 0,
      hargaJualMitra: 9000,
      // Estimasi Laba Sebelum Disetor (PRD Section 6.6 A)
      pendapatanFinal: 216000, // Estimasi 30 * (9000 * 0.8)
      bebanHppFinal: 144000, // 30 * 4800
      biayaOpsFinal: 31000, // 7000 + (30 * 800)
      labaFinal: 41000, // Estimasi laba
      pembayaran: [],
      totalDibayar: 0,
      statusBayar: 'Belum Bayar',
      catatan: 'Sedang berjalan di toko. Estimasi laba jika laku 100% adalah Rp 41.000.'
    },
    {
      id: 'po_004',
      noPO: 'PO-202610-004',
      jenisPO: 'pelanggan_langsung',
      namaPelanggan: 'Ibu Dewi (Pesanan Ulang Tahun)',
      kontak: '0819-8877-6655',
      alamat: 'Komplek Permata Hijau Blok C-12',
      tanggalOrder: '2026-10-25',
      tanggalKirim: '2026-10-26',
      tanggalSetor: null,
      status: 'Dikonfirmasi',
      produkId: 'r1',
      jumlahTitip: 15,
      hppSnapshot: 4000,
      ongkosKirim: 10000,
      alokasiTetapPcs: 0,
      jumlahTerjual: 15,
      sisaKembali: 0,
      sisaDibuang: 0,
      hargaJualMitra: 8500,
      pendapatanFinal: 127500,
      bebanHppFinal: 60000,
      biayaOpsFinal: 10000,
      labaFinal: 57500,
      pembayaran: [
        { id: 'pay_4a', tahap: 'DP', nominal: 60000, tanggal: '2026-10-25', metode: 'QRIS' }
      ],
      totalDibayar: 60000,
      statusBayar: 'Bayar Sebagian',
      catatan: 'DP Rp 60.000 diterima via QRIS. Siap diproduksi besok pagi.'
    }
  ],

  // 32 Tasks Checklist State (PRD Section 17)
  taskState: {}
};

// Storage Key
const STORAGE_KEY = 'churros_webapp_data_v2';

let AppState = {
  data: null,
  activeTab: 'dasbor',
  filterPoType: 'all',
  filterPoStatus: 'all',
  activeSlipPo: null
};

// Format Helpers
function formatRupiah(num) {
  if (num === null || num === undefined || isNaN(num)) return 'Rp 0';
  const val = Math.round(num);
  const isNeg = val < 0;
  const absFormatted = Math.abs(val).toLocaleString('id-ID');
  return (isNeg ? '-Rp ' : 'Rp ') + absFormatted;
}

function formatPercent(num) {
  if (isNaN(num) || num === null) return '0%';
  return `${Number(num).toFixed(1)}%`;
}

// Generate Automatic PO Number: PO-YYYYMM-NNN
function generatePoNumber() {
  const now = new Date();
  const yearMonth = now.getFullYear().toString() + String(now.getMonth() + 1).padStart(2, '0');
  const countThisMonth = (AppState.data?.poList || []).filter(p => p.noPO && p.noPO.includes(`PO-${yearMonth}`)).length + 1;
  return `PO-${yearMonth}-${String(countThisMonth).padStart(3, '0')}`;
}

// Load & Save Data
function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      AppState.data = JSON.parse(raw);
    } else {
      AppState.data = JSON.parse(JSON.stringify(INITIAL_DATA));
      saveData();
    }
  } catch (e) {
    console.warn('Failed to parse localStorage, resetting to initial data', e);
    AppState.data = JSON.parse(JSON.stringify(INITIAL_DATA));
    saveData();
  }
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(AppState.data));
}

function resetToDefaultData() {
  if (confirm('Apakah Anda yakin ingin memuat ulang contoh data UMKM Churros (Versi PO & Font Awesome)? Data saat ini akan diperbarui.')) {
    AppState.data = JSON.parse(JSON.stringify(INITIAL_DATA));
    saveData();
    renderAll();
    showToast('Data berhasil dimuat ulang ke contoh UMKM!');
  }
}

// -------------------------------------------------------------
// CORE CALCULATIONS (PRD Section 6.1 s.d. 6.6)
// -------------------------------------------------------------

function calculateRecipeHpp(recipe) {
  if (!recipe) return { biayaBahan: 0, biayaProduksi: 0, hasilEfektif: 0, hppPcs: 0 };

  let totalBahan = 0;
  if (Array.isArray(recipe.bahan)) {
    recipe.bahan.forEach(item => {
      const b = AppState.data.bahanBaku.find(x => x.id === item.bahanId);
      if (b) totalBahan += (item.takaran || 0) * (b.hargaPerSatuan || 0);
    });
  }

  let totalBiayaLain = 0;
  if (Array.isArray(recipe.biayaLain)) {
    recipe.biayaLain.forEach(item => {
      totalBiayaLain += Number(item.nominal) || 0;
    });
  }

  const biayaProduksi = totalBahan + totalBiayaLain;
  const hasilJadi = Number(recipe.hasilJadiBatch) || 1;
  const susut = Number(recipe.persenSusut) || 0;
  const hasilEfektif = Math.max(1, hasilJadi * (1 - susut / 100));
  const hppPcs = Math.round(biayaProduksi / hasilEfektif);

  return {
    biayaBahan: totalBahan,
    biayaLain: totalBiayaLain,
    biayaProduksi: biayaProduksi,
    hasilEfektif: Math.round(hasilEfektif),
    hppPcs: hppPcs
  };
}

function calculateFixedCostPerPcs() {
  const ops = AppState.data.operasional;
  let totalTetap = 0;
  if (Array.isArray(ops.biayaTetapBulanan)) {
    totalTetap = ops.biayaTetapBulanan.reduce((sum, item) => sum + (Number(item.nominal) || 0), 0);
  }
  const estPcs = Math.max(1, Number(ops.estimasiProduksiBulanan) || 1000);
  return Math.round(totalTetap / estPcs);
}

// Formula Section 6.6: Laba per PO (Estimasi vs Final)
function calculatePoFinancials(po) {
  const isDirect = po.jenisPO === 'pelanggan_langsung';
  const hpp = po.hppSnapshot || 4000;
  const qtyTitip = Number(po.jumlahTitip) || 0;
  const fixedPerPcs = isDirect ? 0 : (po.alokasiTetapPcs || calculateFixedCostPerPcs());
  const ongkosKirim = Number(po.ongkosKirim) || 0;

  // A. Estimasi (Sebelum Setor)
  let estimasiOmzet = 0;
  if (isDirect) {
    estimasiOmzet = qtyTitip * (Number(po.hargaJualMitra) || 10000);
  } else {
    const mitra = AppState.data.mitra.find(m => m.id === po.mitraId);
    const tarif = mitra ? (mitra.skema === 'harga_setor' ? mitra.nilaiSkema : (po.hargaJualMitra || 8000) * 0.8) : 6000;
    estimasiOmzet = qtyTitip * tarif;
  }
  const bebanHppEstimasi = qtyTitip * hpp;
  const biayaOpsEstimasi = ongkosKirim + (qtyTitip * fixedPerPcs);
  const labaEstimasi = estimasiOmzet - bebanHppEstimasi - biayaOpsEstimasi;

  // B. Final (Sesudah Rekonsiliasi)
  const qtyTerjual = po.status === 'Selesai' ? (Number(po.jumlahTerjual) || 0) : qtyTitip;
  const sisaKembali = Number(po.sisaKembali) || 0;
  const sisaDibuang = Number(po.sisaDibuang) || 0;

  let omzetFinal = 0;
  if (isDirect) {
    omzetFinal = qtyTerjual * (Number(po.hargaJualMitra) || 10000);
  } else {
    const mitra = AppState.data.mitra.find(m => m.id === po.mitraId);
    let tarif = 6000;
    if (mitra) {
      if (mitra.skema === 'harga_setor') tarif = mitra.nilaiSkema;
      else if (mitra.skema === 'komisi') tarif = (po.hargaJualMitra || 8000) * (1 - mitra.nilaiSkema / 100);
      else if (mitra.skema === 'bagi_hasil') tarif = hpp + Math.max(0, (po.hargaJualMitra || 8000) - hpp) * (mitra.nilaiSkema / 100);
      else if (mitra.skema === 'beli_putus') tarif = mitra.nilaiSkema;
    }
    omzetFinal = qtyTerjual * tarif;
  }

  // PRD 6.6 B: Beban HPP = (qtyTitip - sisaKembali layak) * hpp (waste tetap hangus jadi beban)
  const pcsBebanHpp = isDirect ? qtyTerjual : (qtyTitip - sisaKembali);
  const bebanHppFinal = pcsBebanHpp * hpp;
  const biayaOpsFinal = ongkosKirim + (qtyTitip * fixedPerPcs);
  const labaFinal = omzetFinal - bebanHppFinal - biayaOpsFinal;
  const marginFinal = omzetFinal > 0 ? (labaFinal / omzetFinal) * 100 : 0;

  return {
    estimasiOmzet,
    labaEstimasi,
    omzetFinal: Math.round(omzetFinal),
    bebanHppFinal: Math.round(bebanHppFinal),
    biayaOpsFinal: Math.round(biayaOpsFinal),
    labaFinal: Math.round(labaFinal),
    marginFinal: marginFinal
  };
}

// -------------------------------------------------------------
// RENDERERS
// -------------------------------------------------------------

function renderAll() {
  renderDashboard();
  renderResepList();
  renderBahanBaku();
  renderOperasional();
  renderMitraList();
  renderPoList();
  renderWhatIfSimulation();
  renderPrdTaskChecklist();
  populateDropdowns();
}

// 1. Dashboard View
function renderDashboard() {
  const poList = AppState.data.poList || [];

  let totalOmzet = 0;
  let totalHpp = 0;
  let totalOps = 0;
  let totalLaba = 0;
  let totalPiutang = 0;
  let totalTitipPcs = 0;
  let totalTerjualPcs = 0;

  poList.forEach(po => {
    if (po.status === 'Dibatalkan') return;

    const fin = calculatePoFinancials(po);
    const omzet = po.status === 'Selesai' ? fin.omzetFinal : fin.estimasiOmzet;
    const laba = po.status === 'Selesai' ? fin.labaFinal : fin.labaEstimasi;

    totalOmzet += omzet;
    totalHpp += fin.bebanHppFinal;
    totalOps += fin.biayaOpsFinal;
    totalLaba += laba;
    totalTitipPcs += Number(po.jumlahTitip) || 0;
    totalTerjualPcs += Number(po.jumlahTerjual) || 0;

    const dibayar = Number(po.totalDibayar) || 0;
    const piutang = omzet - dibayar;
    if (piutang > 0) totalPiutang += piutang;
  });

  const overallMargin = totalOmzet > 0 ? (totalLaba / totalOmzet) * 100 : 0;
  const sellThroughRate = totalTitipPcs > 0 ? (totalTerjualPcs / totalTitipPcs) * 100 : 0;

  document.getElementById('dash-omzet').textContent = formatRupiah(totalOmzet);
  document.getElementById('dash-hpp').textContent = formatRupiah(totalHpp);
  document.getElementById('dash-ops').textContent = formatRupiah(totalOps);
  document.getElementById('dash-laba').textContent = formatRupiah(totalLaba);
  document.getElementById('dash-margin').textContent = formatPercent(overallMargin);
  document.getElementById('dash-piutang').textContent = formatRupiah(totalPiutang);
  document.getElementById('dash-sellthrough').textContent = formatPercent(sellThroughRate);

  // Partner Ranking & Direct Orders Breakdown
  const mitraStats = {};
  AppState.data.mitra.forEach(m => {
    mitraStats[m.id] = {
      nama: m.nama,
      alamat: m.alamat,
      titip: 0,
      terjual: 0,
      omzet: 0,
      laba: 0,
      poCount: 0,
      ongkos: m.ongkosAntar
    };
  });

  let directStats = {
    nama: 'Pesanan Pelanggan Langsung (Pre-Order)',
    alamat: 'Konsumen Retail / Kantor',
    titip: 0,
    terjual: 0,
    omzet: 0,
    laba: 0,
    poCount: 0
  };

  poList.forEach(po => {
    if (po.status === 'Dibatalkan') return;
    const fin = calculatePoFinancials(po);
    const laba = po.status === 'Selesai' ? fin.labaFinal : fin.labaEstimasi;
    const omzet = po.status === 'Selesai' ? fin.omzetFinal : fin.estimasiOmzet;

    if (po.jenisPO === 'pelanggan_langsung') {
      directStats.titip += po.jumlahTitip || 0;
      directStats.terjual += po.jumlahTerjual || po.jumlahTitip || 0;
      directStats.omzet += omzet;
      directStats.laba += laba;
      directStats.poCount++;
    } else if (po.mitraId && mitraStats[po.mitraId]) {
      const s = mitraStats[po.mitraId];
      s.titip += po.jumlahTitip || 0;
      s.terjual += po.jumlahTerjual || 0;
      s.omzet += omzet;
      s.laba += laba;
      s.poCount++;
    }
  });

  const listToRank = [...Object.values(mitraStats), directStats].sort((a, b) => b.laba - a.laba);
  const tbody = document.getElementById('dash-ranking-tbody');
  tbody.innerHTML = '';

  listToRank.forEach((item, idx) => {
    const rate = item.titip > 0 ? (item.terjual / item.titip) * 100 : 0;
    const margin = item.omzet > 0 ? (item.laba / item.omzet) * 100 : 0;

    let statusHtml = '';
    let recoHtml = '';

    if (item.laba > 0) {
      statusHtml = `<span class="status-pill status-profit">${renderIcon('circle-check')} Untung (+${formatRupiah(item.laba)})</span>`;
      if (item.nama.includes('Pelanggan Langsung')) {
        recoHtml = `Jalur paling menguntungkan (Margin ${formatPercent(margin)}). Tingkatkan promo pre-order.`;
      } else if (rate >= 80) {
        recoHtml = `Sangat laris (${formatPercent(rate)} terjual). Tambah porsi titip +5 s.d. +10 pcs.`;
      } else {
        recoHtml = `Performa sehat. Pertahankan kuota saat ini.`;
      }
    } else if (item.laba === 0 && item.titip > 0) {
      statusHtml = `<span class="status-pill status-neutral">${renderIcon('clock')} Impas (Rp 0)</span>`;
      recoHtml = `Wajib tingkatkan penjualan agar menutup ongkos kirim.`;
    } else if (item.laba < 0) {
      statusHtml = `<span class="status-pill status-loss">${renderIcon('triangle-exclamation')} Rugi (${formatRupiah(item.laba)})</span>`;
      recoHtml = `Retur tinggi atau ongkos antar membebani. Evaluasi segera kuota titipan.`;
    } else {
      statusHtml = `<span class="status-pill status-neutral">Belum Ada PO</span>`;
      recoHtml = `Siap buat PO uji coba pertama.`;
    }

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>#${idx + 1}</strong></td>
      <td>
        <strong>${item.nama}</strong><br>
        <span style="font-size: 0.8rem; color: var(--color-muted);">${item.alamat}</span>
      </td>
      <td class="table-num">${item.titip} pcs</td>
      <td class="table-num"><strong>${item.terjual} pcs</strong> (${formatPercent(rate)})</td>
      <td class="table-num">${formatRupiah(item.omzet)}</td>
      <td class="table-num"><strong>${formatRupiah(item.laba)}</strong><br><small style="color:var(--color-muted);">${formatPercent(margin)}</small></td>
      <td>${statusHtml}</td>
      <td style="font-size: 0.82rem; color: var(--color-primary);">${recoHtml}</td>
    `;
    tbody.appendChild(tr);
  });
}

// 2. Resep & Kalkulator HPP
function renderResepList() {
  const container = document.getElementById('resep-cards-container');
  container.innerHTML = '';

  const fixedCostPerPcs = calculateFixedCostPerPcs();

  AppState.data.resep.forEach(r => {
    const calc = calculateRecipeHpp(r);
    const hppPlusFixed = calc.hppPcs + fixedCostPerPcs;

    const card = document.createElement('div');
    card.className = 'artisan-card';
    card.style.marginBottom = '20px';

    let bahanRowsHtml = '';
    r.bahan.forEach(item => {
      const b = AppState.data.bahanBaku.find(x => x.id === item.bahanId);
      const nama = b ? b.nama : '(Bahan tidak ditemukan)';
      const satuan = b ? b.satuanResep : 'unit';
      const hargaSatuan = b ? b.hargaPerSatuan : 0;
      const subtotal = item.takaran * hargaSatuan;
      bahanRowsHtml += `
        <tr>
          <td>${nama}</td>
          <td class="table-num">${item.takaran} ${satuan}</td>
          <td class="table-num">${formatRupiah(hargaSatuan)}</td>
          <td class="table-num"><strong>${formatRupiah(subtotal)}</strong></td>
        </tr>
      `;
    });

    let biayaLainHtml = '';
    r.biayaLain.forEach(item => {
      biayaLainHtml += `
        <tr>
          <td>${item.nama}</td>
          <td class="table-num">-</td>
          <td class="table-num">-</td>
          <td class="table-num"><strong>${formatRupiah(item.nominal)}</strong></td>
        </tr>
      `;
    });

    card.innerHTML = `
      <div class="card-header">
        <div class="card-title-group">
          <h3>${r.namaProduk}</h3>
          <p class="card-subtitle">${r.deskripsi || ''}</p>
        </div>
        <div class="card-header-action" style="display:flex; gap:8px;">
          <button class="btn btn-secondary btn-sm" onclick="editRecipe('${r.id}')">${renderIcon('pen-to-square')} Ubah</button>
          <button class="btn btn-secondary btn-sm" style="color:var(--color-error);" onclick="deleteRecipe('${r.id}')">${renderIcon('trash-can')} Hapus</button>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 340px; gap: 24px;">
        <div>
          <div class="table-responsive">
            <table class="artisan-table">
              <thead>
                <tr>
                  <th>Komposisi / Biaya</th>
                  <th class="table-num">Takaran</th>
                  <th class="table-num">Harga Satuan</th>
                  <th class="table-num">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                ${bahanRowsHtml}
                <tr style="background-color: var(--color-neutral); font-weight: 600;">
                  <td colspan="3">Subtotal Biaya Bahan Baku</td>
                  <td class="table-num">${formatRupiah(calc.biayaBahan)}</td>
                </tr>
                ${biayaLainHtml}
                <tr style="background-color: var(--color-neutral); font-weight: 600;">
                  <td colspan="3">Total Biaya Produksi Langsung</td>
                  <td class="table-num">${formatRupiah(calc.biayaProduksi)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 12px;">
          <div class="stat-slip highlight-stat" style="padding: 16px;">
            <div class="stat-label">HPP Pokok per Pcs</div>
            <div class="stat-value" style="font-size: 2rem;">${formatRupiah(calc.hppPcs)}</div>
            <div class="stat-desc">Dihitung dari ${r.hasilJadiBatch} pcs batch (−${r.persenSusut}% susut: ${calc.hasilEfektif} pcs efektif).</div>
          </div>

          <div class="stat-slip" style="padding: 16px;">
            <div class="stat-label">+ Alokasi Biaya Tetap</div>
            <div style="font-size: 1.25rem; font-weight: 600; color: var(--color-muted);">+ ${formatRupiah(fixedCostPerPcs)} / pcs</div>
            <div class="stat-desc">Sewa tempat, listrik & alat bulanan.</div>
          </div>

          <div class="stat-slip" style="padding: 16px; background-color: var(--color-neutral);">
            <div class="stat-label">Total Beban Pokok + Operasional</div>
            <div style="font-size: 1.5rem; font-weight: 700; color: var(--color-primary);">${formatRupiah(hppPlusFixed)} / pcs</div>
            <div class="stat-desc">Patokan minimal harga setor konsinyasi.</div>
          </div>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

// 3. Master Bahan Baku
function renderBahanBaku() {
  const tbody = document.getElementById('bahan-tbody');
  tbody.innerHTML = '';

  AppState.data.bahanBaku.forEach((b, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${idx + 1}</td>
      <td><strong>${b.nama}</strong></td>
      <td>${b.satuanBeli}</td>
      <td class="table-num">${formatRupiah(b.hargaBeli)}</td>
      <td class="table-num">1 ${b.satuanBeli} = ${b.rasio} ${b.satuanResep}</td>
      <td class="table-num"><strong>${formatRupiah(b.hargaPerSatuan)}</strong> / ${b.satuanResep}</td>
      <td style="text-align: right;">
        <button class="btn btn-secondary btn-sm" onclick="editBahan('${b.id}')">${renderIcon('pen-to-square')} Ubah</button>
        <button class="btn btn-secondary btn-sm" style="color:var(--color-error);" onclick="deleteBahan('${b.id}')">${renderIcon('trash-can')} Hapus</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// 4. Biaya Operasional
function renderOperasional() {
  const ops = AppState.data.operasional;
  const tbody = document.getElementById('ops-tetap-tbody');
  tbody.innerHTML = '';

  let totalTetap = 0;
  ops.biayaTetapBulanan.forEach(item => {
    totalTetap += item.nominal;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.nama}</td>
      <td class="table-num"><strong>${formatRupiah(item.nominal)}</strong> / bulan</td>
      <td style="text-align: right;">
        <button class="btn btn-secondary btn-sm" style="color:var(--color-error);" onclick="deleteOpsTetap('${item.id}')">${renderIcon('trash-can')}</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  document.getElementById('ops-total-tetap').textContent = formatRupiah(totalTetap);
  document.getElementById('ops-estimasi-pcs').value = ops.estimasiProduksiBulanan;

  const alokasi = calculateFixedCostPerPcs();
  document.getElementById('ops-alokasi-per-pcs').textContent = formatRupiah(alokasi);
}

// 5. Mitra Titipan
function renderMitraList() {
  const tbody = document.getElementById('mitra-tbody');
  tbody.innerHTML = '';

  AppState.data.mitra.forEach((m, idx) => {
    let skemaText = '';
    if (m.skema === 'harga_setor') skemaText = `Harga Setor Tetap (${formatRupiah(m.nilaiSkema)}/pcs)`;
    else if (m.skema === 'komisi') skemaText = `Komisi ${m.nilaiSkema}% dari Harga Jual`;
    else if (m.skema === 'bagi_hasil') skemaText = `Bagi Hasil ${m.nilaiSkema}% Pemilik`;
    else if (m.skema === 'beli_putus') skemaText = `Beli Putus (${formatRupiah(m.nilaiSkema)}/pcs)`;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${idx + 1}</td>
      <td>
        <strong>${m.nama}</strong><br>
        <span style="font-size: 0.82rem; color: var(--color-muted);">${m.catatan || ''}</span>
      </td>
      <td>${m.alamat}</td>
      <td>${m.kontak}</td>
      <td><span class="tag-badge">${skemaText}</span></td>
      <td class="table-num">${formatRupiah(m.ongkosAntar)}</td>
      <td style="text-align: right;">
        <button class="btn btn-secondary btn-sm" onclick="editMitra('${m.id}')">${renderIcon('pen-to-square')} Ubah</button>
        <button class="btn btn-secondary btn-sm" style="color:var(--color-error);" onclick="deleteMitra('${m.id}')">${renderIcon('trash-can')} Hapus</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// 6. Transaksi Berbasis Purchase Order (PO)
function renderPoList() {
  const tbody = document.getElementById('po-tbody');
  tbody.innerHTML = '';

  const poList = AppState.data.poList || [];

  // Filter
  const filtered = poList.filter(po => {
    if (AppState.filterPoType !== 'all' && po.jenisPO !== AppState.filterPoType) return false;
    if (AppState.filterPoStatus !== 'all' && po.status !== AppState.filterPoStatus) return false;
    return true;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" style="text-align:center; color: var(--color-muted); padding: 24px;">Tidak ada Purchase Order yang cocok dengan filter.</td></tr>`;
    return;
  }

  filtered.forEach(po => {
    const produk = AppState.data.resep.find(r => r.id === po.produkId);
    const namaProduk = produk ? produk.namaProduk : 'Churros';

    const fin = calculatePoFinancials(po);
    const labaTampil = po.status === 'Selesai' ? fin.labaFinal : fin.labaEstimasi;
    const omzetTampil = po.status === 'Selesai' ? fin.omzetFinal : fin.estimasiOmzet;
    const labaLabel = po.status === 'Selesai' ? 'Final' : 'Estimasi';

    // Status Badge
    let statusClass = 'status-neutral';
    let statusIcon = 'clock';
    if (po.status === 'Selesai') { statusClass = 'status-done'; statusIcon = 'circle-check'; }
    else if (po.status === 'Dikirim') { statusClass = 'status-shipped'; statusIcon = 'truck-fast'; }
    else if (po.status === 'Diproduksi') { statusClass = 'status-produced'; statusIcon = 'wheat-awn'; }
    else if (po.status === 'Dikonfirmasi') { statusClass = 'status-confirmed'; statusIcon = 'circle-check'; }
    else if (po.status === 'Dibatalkan') { statusClass = 'status-cancelled'; statusIcon = 'xmark'; }

    // Payment Status
    let payClass = 'status-pending';
    if (po.statusBayar === 'Lunas') payClass = 'status-profit';
    else if (po.statusBayar === 'Bayar Sebagian') payClass = 'status-dp';

    const tipeBadge = po.jenisPO === 'pelanggan_langsung' 
      ? `<span class="tag-badge" style="background-color:rgba(196,106,30,0.12); color:var(--color-tertiary); border-color:rgba(196,106,30,0.25);">${renderIcon('user')} Pelanggan Langsung</span>`
      : `<span class="tag-badge" style="background-color:rgba(43,30,18,0.06);">${renderIcon('shop')} Mitra Titipan</span>`;

    const labaStyle = labaTampil >= 0 ? 'color: var(--color-primary); font-weight:600;' : 'color: var(--color-error); font-weight:600;';

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <strong>${po.noPO}</strong><br>
        <span style="font-size:0.75rem; color:var(--color-muted);">${po.tanggalOrder}</span>
      </td>
      <td>
        ${tipeBadge}<br>
        <strong>${po.namaPelanggan}</strong><br>
        <span style="font-size:0.8rem; color:var(--color-muted);">${namaProduk}</span>
      </td>
      <td>
        <span class="status-pill ${statusClass}">${renderIcon(statusIcon)} ${po.status}</span>
      </td>
      <td class="table-num">
        ${po.jumlahTitip} pcs<br>
        <small style="color:var(--color-muted);">HPP: ${formatRupiah(po.hppSnapshot)}</small>
      </td>
      <td class="table-num">
        ${po.status === 'Selesai' ? `<strong>${po.jumlahTerjual} pcs</strong><br><small style="color:var(--color-muted);">Retur: ${po.sisaKembali + po.sisaDibuang}</small>` : `<span style="color:var(--color-muted); font-size:0.82rem;">Belum disetor</span>`}
      </td>
      <td class="table-num">
        <strong>${formatRupiah(omzetTampil)}</strong>
      </td>
      <td class="table-num" style="${labaStyle}">
        ${formatRupiah(labaTampil)}<br>
        <small style="font-size:0.72rem; color:var(--color-muted); font-weight:normal;">(${labaLabel})</small>
      </td>
      <td>
        <span class="status-pill ${payClass}">${po.statusBayar}</span><br>
        <small style="font-size:0.75rem; color:var(--color-muted);">Masuk: ${formatRupiah(po.totalDibayar)}</small>
      </td>
      <td style="text-align: right; white-space: nowrap;">
        <button class="btn btn-secondary btn-sm" onclick="openSlipPreview('${po.id}')" title="Cetak Surat Jalan / Slip">${renderIcon('print')} Slip</button>
        <button class="btn btn-secondary btn-sm" onclick="openRekonsiliasiModal('${po.id}')" title="Rekonsiliasi & Pembayaran">${renderIcon('hand-holding-dollar')} Setor</button>
        <button class="btn btn-secondary btn-sm" style="color:var(--color-error);" onclick="deletePo('${po.id}')" title="Hapus PO">${renderIcon('trash-can')}</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Filter PO
function filterPo(type, status) {
  if (type !== undefined) AppState.filterPoType = type;
  if (status !== undefined) AppState.filterPoStatus = status;

  document.querySelectorAll('.filter-po-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.filterType === AppState.filterPoType);
  });

  renderPoList();
}

// Populate Dropdowns
function populateDropdowns() {
  const selMitra = document.getElementById('po-mitra');
  if (selMitra) {
    selMitra.innerHTML = '<option value="">-- Pilih Mitra Warung / Toko --</option>';
    AppState.data.mitra.forEach(m => {
      selMitra.innerHTML += `<option value="${m.id}">${m.nama} (${m.alamat})</option>`;
    });
  }

  const selProduk = document.getElementById('po-produk');
  if (selProduk) {
    selProduk.innerHTML = '<option value="">-- Pilih Resep / Varian Churros --</option>';
    AppState.data.resep.forEach(r => {
      const calc = calculateRecipeHpp(r);
      selProduk.innerHTML += `<option value="${r.id}">${r.namaProduk} (HPP: ${formatRupiah(calc.hppPcs)})</option>`;
    });
  }
}

// 7. What-If Simulation
function renderWhatIfSimulation() {
  const hargaSetor = Number(document.getElementById('sim-harga-setor')?.value || 6500);
  const porsiTitip = Number(document.getElementById('sim-porsi-titip')?.value || 30);
  const sellThrough = Number(document.getElementById('sim-sell-through')?.value || 80);
  const ongkosAntar = Number(document.getElementById('sim-ongkos-antar')?.value || 6000);
  const hppPcs = 4000;
  const fixedPcs = calculateFixedCostPerPcs();

  document.getElementById('sim-val-harga-setor').textContent = formatRupiah(hargaSetor);
  document.getElementById('sim-val-porsi-titip').textContent = `${porsiTitip} pcs`;
  document.getElementById('sim-val-sell-through').textContent = `${sellThrough}%`;
  document.getElementById('sim-val-ongkos-antar').textContent = formatRupiah(ongkosAntar);

  const pcsTerjual = Math.round(porsiTitip * (sellThrough / 100));
  const pcsWaste = porsiTitip - pcsTerjual;
  const omzet = pcsTerjual * hargaSetor;
  const totalHpp = porsiTitip * hppPcs;
  const totalOps = ongkosAntar + (porsiTitip * fixedPcs);
  const labaBersih = omzet - totalHpp - totalOps;
  const margin = omzet > 0 ? (labaBersih / omzet) * 100 : 0;

  const marginPerPcs = Math.max(1, hargaSetor - hppPcs);
  const bepPcs = Math.ceil(totalOps / marginPerPcs);

  document.getElementById('sim-res-terjual').textContent = `${pcsTerjual} pcs`;
  document.getElementById('sim-res-waste').textContent = `${pcsWaste} pcs`;
  document.getElementById('sim-res-omzet').textContent = formatRupiah(omzet);
  document.getElementById('sim-res-hpp').textContent = formatRupiah(totalHpp);
  document.getElementById('sim-res-ops').textContent = formatRupiah(totalOps);

  const elLaba = document.getElementById('sim-res-laba');
  elLaba.textContent = formatRupiah(labaBersih);
  elLaba.style.color = labaBersih >= 0 ? 'var(--color-primary)' : 'var(--color-error)';

  document.getElementById('sim-res-margin').textContent = formatPercent(margin);
  document.getElementById('sim-res-bep').textContent = `${bepPcs} pcs`;

  const elStatus = document.getElementById('sim-status-box');
  if (labaBersih > 0) {
    elStatus.innerHTML = `
      <div style="font-weight:600; color:#2D5837;">${renderIcon('circle-check', 'icon-success')} PROYEKSI UNTUNG: +${formatRupiah(labaBersih)} per pengantaran</div>
      <div style="font-size:0.85rem; color:var(--color-muted);">Jika titip 25 hari dalam sebulan, estimasi laba bersih dari mitra ini mencapai <strong>${formatRupiah(labaBersih * 25)}</strong>.</div>
    `;
    elStatus.style.borderColor = 'rgba(58, 105, 69, 0.4)';
    elStatus.style.backgroundColor = 'rgba(58, 105, 69, 0.08)';
  } else {
    elStatus.innerHTML = `
      <div style="font-weight:600; color:var(--color-error);">${renderIcon('triangle-exclamation', 'icon-error')} PROYEKSI RUGI: ${formatRupiah(labaBersih)} per pengantaran</div>
      <div style="font-size:0.85rem; color:var(--color-muted);">Minimal harus terjual <strong>${bepPcs} pcs</strong> agar tidak merugi, atau naikkan harga setor / hemat ongkos antar.</div>
    `;
    elStatus.style.borderColor = 'rgba(163, 59, 42, 0.4)';
    elStatus.style.backgroundColor = 'rgba(163, 59, 42, 0.08)';
  }
}

// 8. PRD Task Checklist (PRD Section 17)
const PRD_TASKS = [
  // PO Group: T-01 to T-19
  { id: 'T-01', group: 'po', prio: 'P0', size: 'M', seq: 1, title: 'Rancang struktur model data PO (PO, POItem, PORekonsiliasi, POPembayaran).' },
  { id: 'T-02', group: 'po', prio: 'P0', size: 'S', seq: 2, title: 'Buat generator nomor urut PO otomatis berformat PO-YYYYMM-NNN.' },
  { id: 'T-03', group: 'po', prio: 'P0', size: 'S', seq: 3, title: 'Buat state machine validasi transisi status PO (Draft -> Dikonfirmasi -> Diproduksi -> Dikirim -> Selesai / Dibatalkan).' },
  { id: 'T-04', group: 'po', prio: 'P0', size: 'M', seq: 4, title: 'Bangun modal form pembuatan PO baru untuk tipe Mitra Titipan.' },
  { id: 'T-05', group: 'po', prio: 'P0', size: 'M', seq: 5, title: 'Bangun modal form pembuatan PO baru untuk tipe Pelanggan Langsung (pre-order).' },
  { id: 'T-06', group: 'po', prio: 'P0', size: 'S', seq: 6, title: 'Mekanisme penguncian snapshot HPP dari resep saat status PO beralih ke Diproduksi.' },
  { id: 'T-07', group: 'po', prio: 'P0', size: 'M', seq: 7, title: 'Modal dan modul pencatatan pembayaran bertahap (DP dan Pelunasan) per PO.' },
  { id: 'T-08', group: 'po', prio: 'P0', size: 'S', seq: 8, title: 'Validasi toleransi tanggal order, kirim, dan setor PO.' },
  { id: 'T-09', group: 'po', prio: 'P0', size: 'M', seq: 9, title: 'Form rekonsiliasi setoran PO titipan (input terjual, sisa retur layak, sisa rusak).' },
  { id: 'T-10', group: 'po', prio: 'P0', size: 'S', seq: 10, title: 'Validasi matematika rekonsiliasi: terjual + sisa_kembali + sisa_rusak <= titip.' },
  { id: 'T-11', group: 'po', prio: 'P0', size: 'M', seq: 11, title: 'Implementasi formula estimasi laba PO sebelum disetor (PRD 6.6 A).' },
  { id: 'T-12', group: 'po', prio: 'P0', size: 'M', seq: 12, title: 'Implementasi formula laba bersih final PO setelah setoran (PRD 6.6 B).' },
  { id: 'T-13', group: 'po', prio: 'P0', size: 'M', seq: 13, title: 'Tampilan tabel daftar PO utama dengan filter status dan jenis transaksi.' },
  { id: 'T-14', group: 'po', prio: 'P0', size: 'S', seq: 14, title: 'Indikator badge status PO dan status pembayaran (Belum Bayar, DP, Lunas).' },
  { id: 'T-15', group: 'po', prio: 'P0', size: 'M', seq: 15, title: 'Cetak Surat Jalan / Slip Pengantaran PO format Bakery Flour.' },
  { id: 'T-16', group: 'po', prio: 'P0', size: 'M', seq: 16, title: 'Cetak Slip Rekonsiliasi & Pelunasan PO format Bakery Flour.' },
  { id: 'T-17', group: 'po', prio: 'P1', size: 'S', seq: 17, title: 'Aksi pembatalan PO dengan konfirmasi dan pencatatan alasan.' },
  { id: 'T-18', group: 'po', prio: 'P1', size: 'M', seq: 18, title: 'Integrasi metrik agregat laba & piutang per PO ke kartu dasbor.' },
  { id: 'T-19', group: 'po', prio: 'P1', size: 'S', seq: 19, title: 'Audit log riwayat perubahan status & transaksi pembayaran PO.' },

  // Font Awesome Group: T-20 to T-30
  { id: 'T-20', group: 'fa', prio: 'P0', size: 'S', seq: 1, title: 'Setup pustaka Font Awesome 6 Free SVG pada aplikasi.' },
  { id: 'T-21', group: 'fa', prio: 'P0', size: 'M', seq: 2, title: 'Rancang komponen Icon tunggal terpusat (renderIcon).' },
  { id: 'T-22', group: 'fa', prio: 'P0', size: 'S', seq: 3, title: 'Kamus registri ikon eksplisit (tree-shakeable dictionary).' },
  { id: 'T-23', group: 'fa', prio: 'P0', size: 'S', seq: 4, title: 'Terapkan atribut aksesibilitas standar (aria-hidden dan .sr-only).' },
  { id: 'T-24', group: 'fa', prio: 'P0', size: 'S', seq: 5, title: 'Pewarnaan ikon 100% patuh token DESIGN.md (Primary, Secondary, Tertiary).' },
  { id: 'T-25', group: 'fa', prio: 'P0', size: 'S', seq: 6, title: 'Migrasi ikon navigasi tab utama ke Font Awesome.' },
  { id: 'T-26', group: 'fa', prio: 'P0', size: 'S', seq: 7, title: 'Migrasi ikon aksi tombol CRUD (fa-plus, fa-pen-to-square, fa-trash-can).' },
  { id: 'T-27', group: 'fa', prio: 'P0', size: 'S', seq: 8, title: 'Migrasi ikon indikator status (fa-circle-check, fa-triangle-exclamation, fa-clock).' },
  { id: 'T-28', group: 'fa', prio: 'P1', size: 'S', seq: 9, title: 'Migrasi ikon operasional (fa-truck-fast, fa-hand-holding-dollar, fa-print).' },
  { id: 'T-29', group: 'fa', prio: 'P1', size: 'S', seq: 10, title: 'Migrasi ikon aksi cadangan (fa-floppy-disk, fa-folder-open, fa-arrows-rotate).' },
  { id: 'T-30', group: 'fa', prio: 'P2', size: 'S', seq: 11, title: 'Uji ketahanan visual rendering ikon dengan fallback anggun.' },

  // Styling Group: T-31, T-32
  { id: 'T-31', group: 'style', prio: 'P0', size: 'M', seq: 1, title: 'Standarisasi seluruh field input & textarea (tinggi 52px, radius 14px, ring tertiary 3px).' },
  { id: 'T-32', group: 'style', prio: 'P0', size: 'M', seq: 2, title: 'Standarisasi komponen Select & Menu Dropdown (chevron putar 180°, opsi 44px, mark 16px).' }
];

function renderPrdTaskChecklist() {
  const container = document.getElementById('prd-task-checklist-container');
  if (!container) return;
  container.innerHTML = '';

  const groups = [
    { key: 'po', label: '17.1 Kelompok Transaksi Purchase Order (T-01 s.d. T-19)' },
    { key: 'fa', label: '17.2 Kelompok Migrasi Font Awesome (T-20 s.d. T-30)' },
    { key: 'style', label: '17.3 Kelompok Gaya Form & Select (T-31 dan T-32)' }
  ];

  AppState.data.taskState = AppState.data.taskState || {};

  groups.forEach(g => {
    const groupHeading = document.createElement('h3');
    groupHeading.style.margin = '20px 0 10px 0';
    groupHeading.textContent = g.label;
    container.appendChild(groupHeading);

    const taskListDiv = document.createElement('div');
    taskListDiv.className = 'prd-task-list';

    const tasksInGroup = PRD_TASKS.filter(t => t.group === g.key);
    tasksInGroup.forEach(t => {
      const isDone = !!AppState.data.taskState[t.id];
      const prioClass = t.prio === 'P0' ? 'task-tag-p0' : (t.prio === 'P1' ? 'task-tag-p1' : 'task-tag-p2');

      const card = document.createElement('div');
      card.className = `task-item-card ${isDone ? 'is-completed' : ''}`;
      card.innerHTML = `
        <input type="checkbox" id="chk-${t.id}" class="task-checkbox-custom" ${isDone ? 'checked' : ''} onchange="toggleTask('${t.id}')">
        <label for="chk-${t.id}" class="task-content" style="cursor: pointer;">
          <div class="task-meta-tags">
            <span class="task-tag ${prioClass}">${t.prio}</span>
            <span class="task-tag task-tag-size">Size: ${t.size}</span>
            <span class="task-tag task-tag-size">Urutan: ${t.seq}</span>
          </div>
          <strong style="color:var(--color-primary);">${t.id}</strong> — 
          <span class="task-title">${t.title}</span>
        </label>
      `;
      taskListDiv.appendChild(card);
    });

    container.appendChild(taskListDiv);
  });
}

function toggleTask(taskId) {
  AppState.data.taskState = AppState.data.taskState || {};
  AppState.data.taskState[taskId] = !AppState.data.taskState[taskId];
  saveData();
  renderPrdTaskChecklist();
  showToast(`Status task ${taskId} diperbarui.`);
}

// -------------------------------------------------------------
// MODALS & EVENT HANDLERS
// -------------------------------------------------------------

function switchTab(tabName) {
  AppState.activeTab = tabName;
  document.querySelectorAll('.nav-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
  });
  document.querySelectorAll('.view-panel').forEach(panel => {
    panel.classList.toggle('active', panel.id === `view-${tabName}`);
  });

  if (tabName === 'dasbor') renderDashboard();
  else if (tabName === 'simulasi') renderWhatIfSimulation();
  else if (tabName === 'prd') renderPrdTaskChecklist();

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'artisan-toast';
  toast.innerHTML = `
    ${renderIcon('circle-check', 'icon-success')}
    <span>${message}</span>
  `;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 200);
  }, 3200);
}

function openModal(id) { document.getElementById(id).classList.add('active'); }
function closeModal(id) { document.getElementById(id).classList.remove('active'); }

// --- CRUD PO ---
function openNewPoModal() {
  document.getElementById('form-po').reset();
  document.getElementById('po-id').value = '';
  document.getElementById('po-nomor').value = generatePoNumber();
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('po-tgl-order').value = today;
  document.getElementById('po-tgl-kirim').value = today;
  document.getElementById('po-status').value = 'Draft';

  togglePoJenisFields();
  populateDropdowns();
  updatePoModalEstimates();
  openModal('modal-po');
}

function togglePoJenisFields() {
  const jenis = document.getElementById('po-jenis').value;
  const warungBlock = document.getElementById('po-warung-block');
  const pelangganBlock = document.getElementById('po-pelanggan-block');

  if (jenis === 'titip_mitra') {
    warungBlock.style.display = 'block';
    pelangganBlock.style.display = 'none';
  } else {
    warungBlock.style.display = 'none';
    pelangganBlock.style.display = 'block';
  }
  updatePoModalEstimates();
}

function onPoMitraSelected() {
  const mId = document.getElementById('po-mitra').value;
  const m = AppState.data.mitra.find(x => x.id === mId);
  if (m) {
    document.getElementById('po-ongkos').value = m.ongkosAntar;
  }
  updatePoModalEstimates();
}

function updatePoModalEstimates() {
  const jenis = document.getElementById('po-jenis')?.value || 'titip_mitra';
  const prodId = document.getElementById('po-produk')?.value;
  const qty = Number(document.getElementById('po-qty')?.value) || 0;
  const ongkos = Number(document.getElementById('po-ongkos')?.value) || 0;

  const r = AppState.data.resep.find(x => x.id === prodId);
  const calc = calculateRecipeHpp(r);
  const hpp = calc.hppPcs;
  const fixedPcs = jenis === 'pelanggan_langsung' ? 0 : calculateFixedCostPerPcs();

  let omzet = 0;
  if (jenis === 'pelanggan_langsung') {
    const harga = Number(document.getElementById('po-harga-satuan')?.value) || 10000;
    omzet = qty * harga;
  } else {
    const mId = document.getElementById('po-mitra')?.value;
    const m = AppState.data.mitra.find(x => x.id === mId);
    const tarif = m ? (m.skema === 'harga_setor' ? m.nilaiSkema : 6400) : 6000;
    omzet = qty * tarif;
  }

  const hppTotal = qty * hpp;
  const opsTotal = ongkos + (qty * fixedPcs);
  const labaEst = omzet - hppTotal - opsTotal;

  document.getElementById('po-preview-hpp').textContent = formatRupiah(hpp);
  document.getElementById('po-preview-omzet').textContent = formatRupiah(omzet);
  document.getElementById('po-preview-laba').textContent = formatRupiah(labaEst);
  document.getElementById('po-preview-laba').style.color = labaEst >= 0 ? '#2D5837' : 'var(--color-error)';
}

function savePo(e) {
  e.preventDefault();
  const id = document.getElementById('po-id').value;
  const noPO = document.getElementById('po-nomor').value.trim() || generatePoNumber();
  const jenisPO = document.getElementById('po-jenis').value;
  const tanggalOrder = document.getElementById('po-tgl-order').value;
  const tanggalKirim = document.getElementById('po-tgl-kirim').value;
  const status = document.getElementById('po-status').value;
  const produkId = document.getElementById('po-produk').value;
  const jumlahTitip = Number(document.getElementById('po-qty').value) || 0;
  const ongkosKirim = Number(document.getElementById('po-ongkos').value) || 0;

  let mitraId = null;
  let namaPelanggan = '';
  let kontak = '';
  let alamat = '';
  let hargaJualMitra = 8000;

  if (jenisPO === 'titip_mitra') {
    mitraId = document.getElementById('po-mitra').value;
    const m = AppState.data.mitra.find(x => x.id === mitraId);
    if (!m) { alert('Harap pilih Mitra Warung / Toko!'); return; }
    namaPelanggan = m.nama;
    kontak = m.kontak;
    alamat = m.alamat;
  } else {
    namaPelanggan = document.getElementById('po-cust-nama').value.trim();
    kontak = document.getElementById('po-cust-kontak').value.trim();
    alamat = document.getElementById('po-cust-alamat').value.trim();
    hargaJualMitra = Number(document.getElementById('po-harga-satuan').value) || 10000;
    if (!namaPelanggan) { alert('Harap masukkan nama pelanggan!'); return; }
  }

  const r = AppState.data.resep.find(x => x.id === produkId);
  const calc = calculateRecipeHpp(r);
  const hppSnapshot = calc.hppPcs;
  const alokasiTetapPcs = jenisPO === 'pelanggan_langsung' ? 0 : calculateFixedCostPerPcs();

  // Down Payment (DP) check
  const dpAmount = Number(document.getElementById('po-dp-nominal')?.value) || 0;
  const pembayaran = [];
  if (dpAmount > 0) {
    pembayaran.push({
      id: 'pay_' + Date.now(),
      tahap: 'DP',
      nominal: dpAmount,
      tanggal: tanggalOrder,
      metode: document.getElementById('po-dp-metode')?.value || 'Transfer'
    });
  }

  const totalDibayar = dpAmount;
  let statusBayar = 'Belum Bayar';
  if (totalDibayar > 0) statusBayar = 'Bayar Sebagian';

  const newPo = {
    id: id || ('po_' + Date.now()),
    noPO,
    jenisPO,
    mitraId,
    namaPelanggan,
    kontak,
    alamat,
    tanggalOrder,
    tanggalKirim,
    tanggalSetor: null,
    status,
    produkId,
    jumlahTitip,
    hppSnapshot,
    ongkosKirim,
    alokasiTetapPcs,
    jumlahTerjual: 0,
    sisaKembali: 0,
    sisaDibuang: 0,
    hargaJualMitra,
    pendapatanFinal: 0,
    bebanHppFinal: 0,
    biayaOpsFinal: 0,
    labaFinal: 0,
    pembayaran,
    totalDibayar,
    statusBayar,
    catatan: document.getElementById('po-catatan').value.trim()
  };

  if (id) {
    const idx = AppState.data.poList.findIndex(x => x.id === id);
    if (idx !== -1) AppState.data.poList[idx] = newPo;
  } else {
    AppState.data.poList.unshift(newPo);
  }

  saveData();
  renderAll();
  closeModal('modal-po');
  showToast(`Purchase Order ${noPO} berhasil disimpan!`);
}

function deletePo(id) {
  if (confirm('Hapus Purchase Order ini?')) {
    AppState.data.poList = AppState.data.poList.filter(x => x.id !== id);
    saveData();
    renderAll();
    showToast('PO dihapus.');
  }
}

// Rekonsiliasi & Pelunasan Modal
function openRekonsiliasiModal(poId) {
  const po = AppState.data.poList.find(x => x.id === poId);
  if (!po) return;

  const produk = AppState.data.resep.find(r => r.id === po.produkId);

  document.getElementById('rekon-po-id').value = po.id;
  document.getElementById('rekon-info-nopo').textContent = po.noPO;
  document.getElementById('rekon-info-client').textContent = po.namaPelanggan;
  document.getElementById('rekon-info-produk').textContent = produk ? produk.namaProduk : 'Churros';
  document.getElementById('rekon-info-qty').textContent = `${po.jumlahTitip} pcs`;
  document.getElementById('rekon-info-hpp').textContent = formatRupiah(po.hppSnapshot);

  document.getElementById('rekon-status-po').value = po.status;
  document.getElementById('rekon-terjual').value = po.jumlahTerjual || po.jumlahTitip;
  document.getElementById('rekon-sisa-kembali').value = po.sisaKembali || 0;
  document.getElementById('rekon-sisa-buang').value = po.sisaDibuang || 0;
  document.getElementById('rekon-harga-satuan').value = po.hargaJualMitra || (po.jenisPO === 'pelanggan_langsung' ? 10000 : 8000);
  document.getElementById('rekon-sudah-dibayar').textContent = formatRupiah(po.totalDibayar || 0);
  document.getElementById('rekon-tambah-bayar').value = '';
  document.getElementById('rekon-catatan').value = po.catatan || '';

  // Show/hide sisa retur fields if direct order
  const returRow = document.getElementById('rekon-retur-row');
  if (po.jenisPO === 'pelanggan_langsung') {
    returRow.style.display = 'none';
  } else {
    returRow.style.display = 'grid';
  }

  updateRekonsiliasiCalc();
  openModal('modal-rekonsiliasi');
}

function updateRekonsiliasiCalc() {
  const poId = document.getElementById('rekon-po-id').value;
  const po = AppState.data.poList.find(x => x.id === poId);
  if (!po) return;

  const terjual = Number(document.getElementById('rekon-terjual').value) || 0;
  const sisaKembali = Number(document.getElementById('rekon-sisa-kembali').value) || 0;
  const sisaBuang = Number(document.getElementById('rekon-sisa-buang').value) || 0;
  const hargaSatuan = Number(document.getElementById('rekon-harga-satuan').value) || 8000;
  const tambahBayar = Number(document.getElementById('rekon-tambah-bayar').value) || 0;

  const totalInputPcs = terjual + sisaKembali + sisaBuang;
  const warnEl = document.getElementById('rekon-validation-warn');

  if (po.jenisPO === 'titip_mitra' && totalInputPcs > po.jumlahTitip) {
    warnEl.style.display = 'block';
    warnEl.textContent = `Peringatan: Total pcs (${totalInputPcs}) melebihi jumlah titip (${po.jumlahTitip} pcs)!`;
  } else {
    warnEl.style.display = 'none';
  }

  // Calculate using temporary object
  const tempPo = {
    ...po,
    jumlahTerjual: terjual,
    sisaKembali,
    sisaDibuang,
    hargaJualMitra: hargaSatuan,
    status: 'Selesai'
  };

  const fin = calculatePoFinancials(tempPo);
  const totalDibayarAll = (po.totalDibayar || 0) + tambahBayar;
  const sisaPiutang = Math.max(0, fin.omzetFinal - totalDibayarAll);

  document.getElementById('rekon-calc-omzet').textContent = formatRupiah(fin.omzetFinal);
  document.getElementById('rekon-calc-beban-hpp').textContent = formatRupiah(fin.bebanHppFinal);
  document.getElementById('rekon-calc-ops').textContent = formatRupiah(fin.biayaOpsFinal);

  const elLaba = document.getElementById('rekon-calc-laba');
  elLaba.textContent = formatRupiah(fin.labaFinal);
  elLaba.style.color = fin.labaFinal >= 0 ? '#2D5837' : 'var(--color-error)';

  document.getElementById('rekon-calc-piutang').textContent = formatRupiah(sisaPiutang);
}

function saveRekonsiliasi(e) {
  e.preventDefault();
  const poId = document.getElementById('rekon-po-id').value;
  const po = AppState.data.poList.find(x => x.id === poId);
  if (!po) return;

  const status = document.getElementById('rekon-status-po').value;
  const terjual = Number(document.getElementById('rekon-terjual').value) || 0;
  const sisaKembali = Number(document.getElementById('rekon-sisa-kembali').value) || 0;
  const sisaBuang = Number(document.getElementById('rekon-sisa-buang').value) || 0;
  const hargaSatuan = Number(document.getElementById('rekon-harga-satuan').value) || 8000;
  const tambahBayar = Number(document.getElementById('rekon-tambah-bayar').value) || 0;
  const metodeBayar = document.getElementById('rekon-metode-bayar').value;

  po.status = status;
  po.jumlahTerjual = terjual;
  po.sisaKembali = sisaKembali;
  po.sisaDibuang = sisaBuang;
  po.hargaJualMitra = hargaSatuan;
  po.catatan = document.getElementById('rekon-catatan').value.trim();
  po.tanggalSetor = new Date().toISOString().split('T')[0];

  // Financials
  const fin = calculatePoFinancials(po);
  po.pendapatanFinal = fin.omzetFinal;
  po.bebanHppFinal = fin.bebanHppFinal;
  po.biayaOpsFinal = fin.biayaOpsFinal;
  po.labaFinal = fin.labaFinal;

  // Payments
  if (tambahBayar > 0) {
    po.pembayaran = po.pembayaran || [];
    po.pembayaran.push({
      id: 'pay_' + Date.now(),
      tahap: 'Pelunasan',
      nominal: tambahBayar,
      tanggal: po.tanggalSetor,
      metode: metodeBayar
    });
    po.totalDibayar = (po.totalDibayar || 0) + tambahBayar;
  }

  // Status Bayar
  if (po.totalDibayar >= po.pendapatanFinal && po.pendapatanFinal > 0) {
    po.statusBayar = 'Lunas';
  } else if (po.totalDibayar > 0) {
    po.statusBayar = 'Bayar Sebagian';
  } else {
    po.statusBayar = 'Belum Bayar';
  }

  saveData();
  renderAll();
  closeModal('modal-rekonsiliasi');
  showToast(`Hasil setoran PO ${po.noPO} berhasil diperbarui!`);
}

// Order Slip / Surat Jalan Preview & Print
function openSlipPreview(poId) {
  const po = AppState.data.poList.find(x => x.id === poId);
  if (!po) return;
  AppState.activeSlipPo = po;

  const produk = AppState.data.resep.find(r => r.id === po.produkId);
  const fin = calculatePoFinancials(po);

  document.getElementById('slip-no-po').textContent = po.noPO;
  document.getElementById('slip-tgl-order').textContent = `${po.tanggalOrder} (Kirim: ${po.tanggalKirim})`;
  document.getElementById('slip-client-nama').textContent = po.namaPelanggan;
  document.getElementById('slip-client-alamat').textContent = po.alamat;
  document.getElementById('slip-client-kontak').textContent = po.kontak;
  document.getElementById('slip-produk-nama').textContent = produk ? produk.namaProduk : 'Churros';
  document.getElementById('slip-titip-pcs').textContent = `${po.jumlahTitip} pcs`;
  document.getElementById('slip-terjual-pcs').textContent = `${po.jumlahTerjual} pcs`;
  document.getElementById('slip-sisa-pcs').textContent = `${po.sisaKembali + po.sisaDibuang} pcs (Retur: ${po.sisaKembali}, Waste: ${po.sisaDibuang})`;
  document.getElementById('slip-omzet').textContent = formatRupiah(po.status === 'Selesai' ? fin.omzetFinal : fin.estimasiOmzet);
  document.getElementById('slip-laba').textContent = formatRupiah(po.status === 'Selesai' ? fin.labaFinal : fin.labaEstimasi);
  document.getElementById('slip-status-po').textContent = `${po.status} / ${po.statusBayar}`;
  document.getElementById('slip-terbayar').textContent = formatRupiah(po.totalDibayar || 0);

  const piutang = Math.max(0, (po.status === 'Selesai' ? fin.omzetFinal : fin.estimasiOmzet) - (po.totalDibayar || 0));
  document.getElementById('slip-sisa-piutang').textContent = formatRupiah(piutang);

  openModal('modal-slip');
}

function printOrderSlip() { window.print(); }

// --- CRUD BAHAN & RESEP ---
function openAddBahanModal() {
  document.getElementById('modal-bahan-title').textContent = 'Tambah Bahan Baku Baru';
  document.getElementById('form-bahan').reset();
  document.getElementById('bahan-id').value = '';
  openModal('modal-bahan');
}

function editBahan(id) {
  const b = AppState.data.bahanBaku.find(x => x.id === id);
  if (!b) return;
  document.getElementById('modal-bahan-title').textContent = 'Ubah Bahan Baku';
  document.getElementById('bahan-id').value = b.id;
  document.getElementById('bahan-nama').value = b.nama;
  document.getElementById('bahan-satuan-beli').value = b.satuanBeli;
  document.getElementById('bahan-harga-beli').value = b.hargaBeli;
  document.getElementById('bahan-satuan-resep').value = b.satuanResep;
  document.getElementById('bahan-rasio').value = b.rasio;
  openModal('modal-bahan');
}

function saveBahan(e) {
  e.preventDefault();
  const id = document.getElementById('bahan-id').value;
  const nama = document.getElementById('bahan-nama').value.trim();
  const satuanBeli = document.getElementById('bahan-satuan-beli').value.trim();
  const hargaBeli = Number(document.getElementById('bahan-harga-beli').value) || 0;
  const satuanResep = document.getElementById('bahan-satuan-resep').value.trim();
  const rasio = Number(document.getElementById('bahan-rasio').value) || 1;
  const hargaPerSatuan = Math.round((hargaBeli / rasio) * 100) / 100;

  if (id) {
    const idx = AppState.data.bahanBaku.findIndex(x => x.id === id);
    if (idx !== -1) AppState.data.bahanBaku[idx] = { id, nama, satuanBeli, hargaBeli, satuanResep, rasio, hargaPerSatuan };
  } else {
    AppState.data.bahanBaku.push({ id: 'b_' + Date.now(), nama, satuanBeli, hargaBeli, satuanResep, rasio, hargaPerSatuan });
  }

  saveData();
  renderAll();
  closeModal('modal-bahan');
  showToast('Bahan baku disimpan.');
}

function deleteBahan(id) {
  if (confirm('Hapus bahan baku ini?')) {
    AppState.data.bahanBaku = AppState.data.bahanBaku.filter(x => x.id !== id);
    saveData();
    renderAll();
    showToast('Bahan baku dihapus.');
  }
}

// Resep Handlers
function openAddRecipeModal() {
  document.getElementById('modal-resep-title').textContent = 'Buat Resep Churros Baru';
  document.getElementById('form-resep').reset();
  document.getElementById('resep-id').value = '';
  document.getElementById('resep-susut').value = 3;
  document.getElementById('resep-hasil-batch').value = 50;

  const container = document.getElementById('resep-bahan-rows');
  container.innerHTML = '';
  addRecipeBahanRow();
  addRecipeBahanRow();

  const extraContainer = document.getElementById('resep-biayalain-rows');
  extraContainer.innerHTML = '';
  addRecipeBiayaLainRow('Kemasan Box Kraft & Stiker', 32500);
  addRecipeBiayaLainRow('Gas LPG & Listrik', 15000);
  addRecipeBiayaLainRow('Tenaga Kerja Langsung', 40000);

  updateModalHppPreview();
  openModal('modal-resep');
}

function addRecipeBahanRow(bahanId = '', takaran = '') {
  const container = document.getElementById('resep-bahan-rows');
  const div = document.createElement('div');
  div.className = 'resep-row-item';
  div.style.display = 'grid';
  div.style.gridTemplateColumns = '1.8fr 1fr 40px';
  div.style.gap = '8px';
  div.style.marginBottom = '8px';

  let options = '<option value="">-- Pilih Bahan --</option>';
  AppState.data.bahanBaku.forEach(b => {
    options += `<option value="${b.id}" ${b.id === bahanId ? 'selected' : ''}>${b.nama} (${b.satuanResep})</option>`;
  });

  div.innerHTML = `
    <select class="form-select recipe-bahan-select" onchange="updateModalHppPreview()">${options}</select>
    <input type="number" class="form-input recipe-bahan-takaran" placeholder="Takaran" value="${takaran}" oninput="updateModalHppPreview()">
    <button type="button" class="btn btn-secondary btn-sm" style="color:var(--color-error); padding:0;" onclick="this.parentElement.remove(); updateModalHppPreview();">${renderIcon('xmark')}</button>
  `;
  container.appendChild(div);
}

function addRecipeBiayaLainRow(nama = '', nominal = '') {
  const container = document.getElementById('resep-biayalain-rows');
  const div = document.createElement('div');
  div.className = 'resep-row-biayalain';
  div.style.display = 'grid';
  div.style.gridTemplateColumns = '1.8fr 1fr 40px';
  div.style.gap = '8px';
  div.style.marginBottom = '8px';

  div.innerHTML = `
    <input type="text" class="form-input recipe-extra-nama" placeholder="Contoh: Gas / Box" value="${nama}" oninput="updateModalHppPreview()">
    <input type="number" class="form-input recipe-extra-nominal" placeholder="Nominal Rp" value="${nominal}" oninput="updateModalHppPreview()">
    <button type="button" class="btn btn-secondary btn-sm" style="color:var(--color-error); padding:0;" onclick="this.parentElement.remove(); updateModalHppPreview();">${renderIcon('xmark')}</button>
  `;
  container.appendChild(div);
}

function updateModalHppPreview() {
  const hasilBatch = Number(document.getElementById('resep-hasil-batch').value) || 1;
  const susut = Number(document.getElementById('resep-susut').value) || 0;

  let totalBahan = 0;
  document.querySelectorAll('.resep-row-item').forEach(row => {
    const bId = row.querySelector('.recipe-bahan-select').value;
    const takaran = Number(row.querySelector('.recipe-bahan-takaran').value) || 0;
    const b = AppState.data.bahanBaku.find(x => x.id === bId);
    if (b) totalBahan += takaran * b.hargaPerSatuan;
  });

  let totalLain = 0;
  document.querySelectorAll('.resep-row-biayalain').forEach(row => {
    const nominal = Number(row.querySelector('.recipe-extra-nominal').value) || 0;
    totalLain += nominal;
  });

  const totalProduksi = totalBahan + totalLain;
  const hasilEfektif = Math.max(1, hasilBatch * (1 - susut / 100));
  const hppPcs = Math.round(totalProduksi / hasilEfektif);

  document.getElementById('modal-preview-hpp').textContent = formatRupiah(hppPcs);
  document.getElementById('modal-preview-produksi').textContent = formatRupiah(totalProduksi);
}

function editRecipe(id) {
  const r = AppState.data.resep.find(x => x.id === id);
  if (!r) return;
  document.getElementById('modal-resep-title').textContent = 'Ubah Resep Churros';
  document.getElementById('resep-id').value = r.id;
  document.getElementById('resep-nama').value = r.namaProduk;
  document.getElementById('resep-deskripsi').value = r.deskripsi || '';
  document.getElementById('resep-hasil-batch').value = r.hasilJadiBatch;
  document.getElementById('resep-susut').value = r.persenSusut;

  const container = document.getElementById('resep-bahan-rows');
  container.innerHTML = '';
  r.bahan.forEach(item => addRecipeBahanRow(item.bahanId, item.takaran));

  const extraContainer = document.getElementById('resep-biayalain-rows');
  extraContainer.innerHTML = '';
  (r.biayaLain || []).forEach(item => addRecipeBiayaLainRow(item.nama, item.nominal));

  updateModalHppPreview();
  openModal('modal-resep');
}

function saveRecipe(e) {
  e.preventDefault();
  const id = document.getElementById('resep-id').value;
  const namaProduk = document.getElementById('resep-nama').value.trim();
  const deskripsi = document.getElementById('resep-deskripsi').value.trim();
  const hasilJadiBatch = Number(document.getElementById('resep-hasil-batch').value) || 50;
  const persenSusut = Number(document.getElementById('resep-susut').value) || 0;

  const bahan = [];
  document.querySelectorAll('.resep-row-item').forEach(row => {
    const bahanId = row.querySelector('.recipe-bahan-select').value;
    const takaran = Number(row.querySelector('.recipe-bahan-takaran').value) || 0;
    if (bahanId && takaran > 0) bahan.push({ bahanId, takaran });
  });

  const biayaLain = [];
  document.querySelectorAll('.resep-row-biayalain').forEach(row => {
    const nama = row.querySelector('.recipe-extra-nama').value.trim();
    const nominal = Number(row.querySelector('.recipe-extra-nominal').value) || 0;
    if (nama && nominal > 0) biayaLain.push({ nama, nominal });
  });

  if (id) {
    const idx = AppState.data.resep.findIndex(x => x.id === id);
    if (idx !== -1) AppState.data.resep[idx] = { id, namaProduk, deskripsi, hasilJadiBatch, persenSusut, bahan, biayaLain };
  } else {
    AppState.data.resep.push({ id: 'r_' + Date.now(), namaProduk, deskripsi, hasilJadiBatch, persenSusut, bahan, biayaLain });
  }

  saveData();
  renderAll();
  closeModal('modal-resep');
  showToast('Resep churros disimpan.');
}

function deleteRecipe(id) {
  if (confirm('Hapus resep ini?')) {
    AppState.data.resep = AppState.data.resep.filter(x => x.id !== id);
    saveData();
    renderAll();
    showToast('Resep dihapus.');
  }
}

// Operasional Handlers
function addOpsTetap() {
  const nama = prompt('Masukkan nama biaya tetap (Sewa Dapur, Listrik, Penyusutan):');
  if (!nama) return;
  const nominalStr = prompt('Masukkan nominal biaya bulanan (Rp):', '100000');
  const nominal = Number(nominalStr) || 0;

  AppState.data.operasional.biayaTetapBulanan.push({ id: 'ot_' + Date.now(), nama, nominal });
  saveData();
  renderAll();
  showToast('Biaya operasional ditambahkan.');
}

function deleteOpsTetap(id) {
  if (confirm('Hapus biaya tetap ini?')) {
    AppState.data.operasional.biayaTetapBulanan = AppState.data.operasional.biayaTetapBulanan.filter(x => x.id !== id);
    saveData();
    renderAll();
    showToast('Biaya dihapus.');
  }
}

function updateEstimasiPcs() {
  const val = Number(document.getElementById('ops-estimasi-pcs').value) || 1000;
  AppState.data.operasional.estimasiProduksiBulanan = val;
  saveData();
  renderAll();
  showToast('Estimasi produksi bulanan diperbarui.');
}

// Mitra Handlers
function openAddMitraModal() {
  document.getElementById('modal-mitra-title').textContent = 'Tambah Mitra Titip Jual (Warung/Toko)';
  document.getElementById('form-mitra').reset();
  document.getElementById('mitra-id').value = '';
  document.getElementById('mitra-skema').value = 'harga_setor';
  updateMitraSkemaHint();
  openModal('modal-mitra');
}

function updateMitraSkemaHint() {
  const skema = document.getElementById('mitra-skema').value;
  const labelEl = document.getElementById('mitra-nilai-label');
  const hintEl = document.getElementById('mitra-nilai-hint');

  if (skema === 'harga_setor') {
    labelEl.textContent = 'HARGA SETOR TETAP PER PCS (RP)';
    hintEl.textContent = 'Nominal rupiah pasti yang diterima pemilik setiap churros terjual (cth: Rp 6.000).';
  } else if (skema === 'komisi') {
    labelEl.textContent = 'KOMISI PERSEN WARUNG (%)';
    hintEl.textContent = 'Persentase potongan untuk warung dari harga jual konsumen (cth: 20%).';
  } else if (skema === 'bagi_hasil') {
    labelEl.textContent = 'BAGI HASIL UNTUK PEMILIK (%)';
    hintEl.textContent = 'Persentase keuntungan bersih untuk pemilik setelah dikurangi HPP (cth: 70%).';
  } else if (skema === 'beli_putus') {
    labelEl.textContent = 'HARGA BELI PUTUS PER PCS (RP)';
    hintEl.textContent = 'Harga beli grosir di depan, tidak ada retur barang sisa (cth: Rp 5.500).';
  }
}

function editMitra(id) {
  const m = AppState.data.mitra.find(x => x.id === id);
  if (!m) return;
  document.getElementById('modal-mitra-title').textContent = 'Ubah Data Mitra Titipan';
  document.getElementById('mitra-id').value = m.id;
  document.getElementById('mitra-nama').value = m.nama;
  document.getElementById('mitra-alamat').value = m.alamat;
  document.getElementById('mitra-kontak').value = m.kontak;
  document.getElementById('mitra-skema').value = m.skema;
  document.getElementById('mitra-nilai').value = m.nilaiSkema;
  document.getElementById('mitra-ongkos').value = m.ongkosAntar;
  document.getElementById('mitra-catatan').value = m.catatan || '';
  updateMitraSkemaHint();
  openModal('modal-mitra');
}

function saveMitra(e) {
  e.preventDefault();
  const id = document.getElementById('mitra-id').value;
  const nama = document.getElementById('mitra-nama').value.trim();
  const alamat = document.getElementById('mitra-alamat').value.trim();
  const kontak = document.getElementById('mitra-kontak').value.trim();
  const skema = document.getElementById('mitra-skema').value;
  const nilaiSkema = Number(document.getElementById('mitra-nilai').value) || 0;
  const ongkosAntar = Number(document.getElementById('mitra-ongkos').value) || 0;
  const catatan = document.getElementById('mitra-catatan').value.trim();

  if (id) {
    const idx = AppState.data.mitra.findIndex(x => x.id === id);
    if (idx !== -1) AppState.data.mitra[idx] = { id, nama, alamat, kontak, skema, nilaiSkema, ongkosAntar, catatan, aktif: true };
  } else {
    AppState.data.mitra.push({ id: 'm_' + Date.now(), nama, alamat, kontak, skema, nilaiSkema, ongkosAntar, catatan, aktif: true });
  }

  saveData();
  renderAll();
  closeModal('modal-mitra');
  showToast('Mitra warung disimpan.');
}

function deleteMitra(id) {
  if (confirm('Hapus mitra warung ini? Riwayat PO tetap tersimpan.')) {
    AppState.data.mitra = AppState.data.mitra.filter(x => x.id !== id);
    saveData();
    renderAll();
    showToast('Mitra dihapus.');
  }
}

// Backup & Restore
function exportDataJSON() {
  const jsonStr = JSON.stringify(AppState.data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `churros-po-backup-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Cadangan data berhasil diunduh!');
}

function importDataJSON() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = evt => {
      try {
        const imported = JSON.parse(evt.target.result);
        if (imported.bahanBaku && imported.resep) {
          AppState.data = imported;
          saveData();
          renderAll();
          showToast('Data berhasil dipulihkan!');
        } else {
          alert('Format berkas cadangan JSON tidak valid.');
        }
      } catch (err) {
        alert('Gagal membaca file JSON: ' + err.message);
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

// URL Hash Routing Support
function handleHash() {
  const hash = window.location.hash.replace('#', '').toLowerCase();
  if (['dasbor', 'resep', 'transaksi', 'mitra', 'bahan', 'simulasi', 'prd'].includes(hash)) {
    switchTab(hash);
  } else if (hash === 'po') {
    switchTab('transaksi');
  }
}

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  renderAll();

  // Initial Hash or default
  if (window.location.hash) {
    handleHash();
  }

  window.addEventListener('hashchange', handleHash);

  // Navigation tab clicks
  document.querySelectorAll('.nav-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // What-If Simulation range listeners
  ['sim-harga-setor', 'sim-porsi-titip', 'sim-sell-through', 'sim-ongkos-antar'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', renderWhatIfSimulation);
  });
});
