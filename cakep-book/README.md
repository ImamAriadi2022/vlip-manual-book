# 📖 Interactive Manual Book - React + Vite

Web aplikasi manual book interaktif dengan efek flip halaman seperti membuka buku fisik. Dibangun menggunakan React, Vite, dan react-pageflip library.

## ✨ Fitur

- 📚 **Efek Flip Halaman** - Animasi flip seperti membuka buku fisik
- 🖱️ **Navigasi Intuitif** - Klik pada ujung halaman atau gunakan tombol Next/Previous
- 📱 **Responsive Design** - Tampil sempurna di desktop dan mobile
- 🎨 **Modern UI** - Desain yang bersih dan menarik dengan gradient background
- ⚡ **Fast Performance** - Dibangun dengan Vite untuk performa optimal

## 🚀 Quick Start

### Prerequisites

- Node.js (versi 16 atau lebih tinggi)
- npm atau yarn

### Installation

1. Clone repository ini:
```bash
git clone <repository-url>
cd cakep-book
```

2. Install dependencies:
```bash
npm install
```

3. Jalankan development server:
```bash
npm run dev
```

4. Buka browser dan akses:
```
http://localhost:5173
```

## 📁 Struktur Project

```
cakep-book/
├── public/
│   └── manuals/              # Folder untuk gambar manual book
│       ├── page1.png         # Halaman 1
│       ├── page2.png         # Halaman 2
│       └── ...               # Halaman lainnya
├── src/
│   ├── components/
│   │   ├── Book.jsx          # Komponen flip book utama
│   │   ├── Book.css          # Styling untuk flip book
│   │   ├── Home.jsx          # Halaman utama
│   │   └── Home.css          # Styling untuk home
│   ├── App.jsx               # Root component
│   ├── App.css               # App styling
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
├── package.json              # Dependencies
└── README.md                 # Dokumentasi
```

## 📝 Cara Menambahkan Halaman Manual Baru

### Metode 1: Menambahkan Gambar

1. Siapkan gambar halaman manual Anda (format: PNG, JPG, atau JPEG)
2. Beri nama dengan format: `page1.png`, `page2.png`, `page3.png`, dst.
3. Copy gambar ke folder `public/manuals/`
4. Update jumlah halaman di `src/components/Book.jsx`:

```javascript
// Baris sekitar 20-22
const TOTAL_PAGES = 6; // Ubah sesuai jumlah halaman Anda
```

### Metode 2: Auto-Detection (Eksperimental)

Jika Anda ingin sistem otomatis mendeteksi jumlah halaman:

1. Set `TOTAL_PAGES = 0` di `src/components/Book.jsx`
2. System akan otomatis mencari gambar hingga tidak ditemukan lagi

**Catatan:** Metode auto-detection memerlukan request HEAD untuk setiap gambar, bisa lebih lambat.

## 🎨 Kustomisasi

### Mengubah Judul Manual Book

Edit di `src/components/Home.jsx`:

```javascript
<h1 className="main-title">📖 Interactive Manual Book</h1>
<p className="subtitle">Flip through pages with realistic book experience</p>

// Dan di komponen Book:
<Book title="Product Manual Guide" />
```

### Mengubah Warna Theme

Edit gradient background di `src/components/Book.css` dan `src/components/Home.css`:

```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
/* Ganti dengan warna gradient pilihan Anda */
```

### Mengubah Ukuran Buku

Edit di `src/components/Book.jsx`:

```javascript
<HTMLFlipBook
  width={550}      // Lebar halaman
  height={733}     // Tinggi halaman
  // ... props lainnya
>
```

## 🏗️ Build untuk Production

### Build Project

```bash
npm run build
```

Build output akan ada di folder `dist/`.

### Preview Build

```bash
npm run preview
```

## 🚀 Deploy ke Vercel

### Metode 1: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login ke Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Untuk production deployment:
```bash
vercel --prod
```

### Metode 2: Deploy via Vercel Dashboard

1. Push code ke GitHub repository
2. Buka [Vercel Dashboard](https://vercel.com/dashboard)
3. Klik "New Project"
4. Import repository GitHub Anda
5. Vercel akan otomatis mendeteksi Vite project
6. Klik "Deploy"

### Metode 3: Deploy via GitHub Integration

1. Push code ke GitHub:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. Connect repository ke Vercel:
   - Buka [vercel.com](https://vercel.com)
   - Login dengan GitHub
   - Klik "Add New Project"
   - Select repository Anda
   - Vercel akan auto-configure settings untuk Vite

3. Deploy settings (sudah otomatis terdeteksi):
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

4. Klik "Deploy"

### Environment Variables (Opsional)

Jika menggunakan environment variables:

1. Buat file `.env` (jangan commit ke git):
```
VITE_API_URL=your_api_url
```

2. Tambahkan di Vercel Dashboard:
   - Go to Project Settings → Environment Variables
   - Add variables dengan prefix `VITE_`

## 📦 Dependencies

- **react** - UI library
- **react-dom** - React DOM renderer
- **react-pageflip** - Library untuk efek flip halaman
- **vite** - Build tool dan dev server

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build untuk production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Tips Development

1. **Hot Module Replacement (HMR)** sudah aktif, perubahan code langsung terlihat
2. Gunakan React DevTools untuk debugging
3. Check browser console untuk error atau warning

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Troubleshooting

### Gambar tidak muncul?

1. Pastikan gambar ada di `public/manuals/`
2. Periksa nama file (case-sensitive): `page1.png`, `page2.png`, dst.
3. Pastikan `TOTAL_PAGES` sesuai dengan jumlah gambar
4. Check browser console untuk error loading

### Flip animation tidak smooth?

1. Reduce image size/resolution
2. Optimize images (compress dengan tools seperti TinyPNG)
3. Check performance di browser DevTools

### Build gagal?

1. Hapus `node_modules` dan `package-lock.json`
2. Install ulang: `npm install`
3. Clear cache: `npm cache clean --force`
4. Try again: `npm run build`

## 📄 License

MIT License - Bebas digunakan untuk project personal maupun komersial

## 🤝 Contributing

Kontribusi sangat diterima! Silakan:

1. Fork repository
2. Buat branch baru (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📞 Support

Jika ada pertanyaan atau issue, silakan buat GitHub issue atau hubungi developer.

## 🎯 Roadmap

- [ ] PDF support
- [ ] Zoom feature
- [ ] Bookmarks
- [ ] Search functionality
- [ ] Multiple language support
- [ ] Dark mode
- [ ] Export to PDF

---

**Built with ❤️ using React + Vite**

