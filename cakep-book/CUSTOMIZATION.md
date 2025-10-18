# 🎨 Customization Guide

Panduan lengkap untuk kustomisasi aplikasi Manual Book sesuai kebutuhan Anda.

## 📋 Table of Contents

1. [Mengubah Judul & Subtitle](#mengubah-judul--subtitle)
2. [Mengubah Warna Theme](#mengubah-warna-theme)
3. [Mengubah Ukuran Buku](#mengubah-ukuran-buku)
4. [Menambahkan Halaman](#menambahkan-halaman)
5. [Kustomisasi Navigasi](#kustomisasi-navigasi)
6. [Mengubah Animasi](#mengubah-animasi)
7. [Responsive Settings](#responsive-settings)
8. [Advanced Customization](#advanced-customization)

---

## Mengubah Judul & Subtitle

### File: `src/components/Home.jsx`

```javascript
// Baris 19-22
<h1 className="main-title">📖 Interactive Manual Book</h1>
<p className="subtitle">
  Flip through pages with realistic book experience
</p>
```

**Contoh:**
```javascript
<h1 className="main-title">🚗 User Manual - Tesla Model 3</h1>
<p className="subtitle">
  Complete guide for your electric vehicle
</p>
```

### Mengubah Judul Buku

**File:** `src/components/Home.jsx` (baris 28)
```javascript
<Book title="Product Manual Guide" />
```

**Contoh:**
```javascript
<Book title="Tesla Model 3 Owner's Manual" />
```

---

## Mengubah Warna Theme

### 1. Background Gradient

**File:** `src/components/Book.css` (baris 6)
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

**Contoh gradients:**
```css
/* Ocean Blue */
background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);

/* Sunset Orange */
background: linear-gradient(135deg, #ff6b6b 0%, #feca57 100%);

/* Forest Green */
background: linear-gradient(135deg, #134e5e 0%, #71b280 100%);

/* Purple Dreams */
background: linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%);
```

### 2. Button Colors

**File:** `src/components/Book.css` (baris 77-78)
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
```

Match dengan background gradient Anda!

### 3. Page Background

**File:** `src/components/Book.css` (baris 49)
```css
background: white;
```

**Untuk aged paper effect:**
```css
background: #f4f1de;
```

---

## Mengubah Ukuran Buku

### File: `src/components/Book.jsx`

```javascript
// Baris 98-105
<HTMLFlipBook
  width={550}       // Lebar setiap halaman (pixels)
  height={733}      // Tinggi setiap halaman (pixels)
  minWidth={315}    // Min width untuk responsive
  maxWidth={1000}   // Max width untuk responsive
  minHeight={400}   // Min height untuk responsive
  maxHeight={1533}  // Max height untuk responsive
  // ...
>
```

### Preset Sizes

**A4 Portrait (standar):**
```javascript
width={595}
height={842}
```

**Letter Size:**
```javascript
width={612}
height={792}
```

**Square Format:**
```javascript
width={600}
height={600}
```

**Wide Format:**
```javascript
width={800}
height={500}
```

---

## Menambahkan Halaman

### Method 1: Manual Configuration

**Step 1:** Tambahkan gambar ke `public/manuals/`
```
public/manuals/
├── page1.png
├── page2.png
├── page3.png
└── page4.png  <- Gambar baru
```

**Step 2:** Update jumlah di `src/components/Book.jsx` (baris 22)
```javascript
const TOTAL_PAGES = 4; // Update sesuai jumlah gambar
```

### Method 2: Auto-Detection

Set `TOTAL_PAGES = 0` di `src/components/Book.jsx`:
```javascript
const TOTAL_PAGES = 0; // Auto detect
```

System akan otomatis load semua gambar yang ada.

### Method 3: Dynamic Loading

Untuk load dari API atau database, modify `loadPages` function:

```javascript
useEffect(() => {
  const loadPages = async () => {
    // Fetch dari API
    const response = await fetch('/api/manual-pages');
    const data = await response.json();
    
    const pageArray = data.pages.map(page => page.imageUrl);
    setPages(pageArray);
    setTotalPages(pageArray.length);
  };
  
  loadPages();
}, []);
```

---

## Kustomisasi Navigasi

### 1. Mengubah Label Button

**File:** `src/components/Book.jsx` (baris 141-155)

```javascript
// Ubah dari:
← Previous
Next →

// Menjadi:
<< Sebelumnya
Berikutnya >>
```

### 2. Tambahkan Tombol "First" & "Last"

**File:** `src/components/Book.jsx`

```javascript
// Tambahkan function baru setelah prevPage()
const firstPage = () => {
  if (bookRef.current) {
    bookRef.current.pageFlip().flip(0);
  }
};

const lastPage = () => {
  if (bookRef.current) {
    bookRef.current.pageFlip().flip(totalPages - 1);
  }
};

// Dalam render, tambahkan buttons:
<button className="control-btn" onClick={firstPage}>
  ⏮️ First
</button>
<button className="control-btn prev-btn" onClick={prevPage}>
  ← Previous
</button>
// ... existing code
<button className="control-btn next-btn" onClick={nextPage}>
  Next →
</button>
<button className="control-btn" onClick={lastPage}>
  Last ⏭️
</button>
```

### 3. Tambahkan Keyboard Navigation

**File:** `src/components/Book.jsx`

```javascript
// Tambahkan dalam useEffect
useEffect(() => {
  const handleKeyPress = (e) => {
    if (e.key === 'ArrowRight') nextPage();
    if (e.key === 'ArrowLeft') prevPage();
  };
  
  window.addEventListener('keydown', handleKeyPress);
  return () => window.removeEventListener('keydown', handleKeyPress);
}, []);
```

---

## Mengubah Animasi

### 1. Kecepatan Flip

**File:** `src/components/Book.jsx` (baris 110)
```javascript
flippingTime={1000}  // Milliseconds (1000 = 1 detik)
```

**Lebih cepat:**
```javascript
flippingTime={600}   // 0.6 detik
```

**Lebih lambat (dramatic):**
```javascript
flippingTime={1500}  // 1.5 detik
```

### 2. Shadow Opacity

**File:** `src/components/Book.jsx` (baris 102)
```javascript
maxShadowOpacity={0.5}  // 0-1 (0 = no shadow, 1 = full shadow)
```

### 3. Entry Animation

**File:** `src/components/Book.css` (baris terakhir)

```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.book-container {
  animation: fadeIn 0.6s ease-out;
}
```

**Slide from left:**
```css
@keyframes slideInFromLeft {
  from {
    opacity: 0;
    transform: translateX(-100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

---

## Responsive Settings

### Mobile Breakpoints

**File:** `src/components/Book.css` (baris 145-180)

Customize breakpoints:
```css
/* Tablet */
@media (max-width: 1024px) {
  .book-title { font-size: 2rem; }
}

/* Mobile */
@media (max-width: 768px) {
  .book-title { font-size: 1.8rem; }
}

/* Small Mobile */
@media (max-width: 480px) {
  .book-title { font-size: 1.5rem; }
}
```

### Disable Flip on Mobile

**File:** `src/components/Book.jsx`

```javascript
const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const checkMobile = () => {
    setIsMobile(window.innerWidth <= 768);
  };
  
  checkMobile();
  window.addEventListener('resize', checkMobile);
  return () => window.removeEventListener('resize', checkMobile);
}, []);

// In HTMLFlipBook props:
mobileScrollSupport={true}
useMouseEvents={!isMobile}
```

---

## Advanced Customization

### 1. Add Zoom Feature

```javascript
import { useState } from 'react';

const [zoom, setZoom] = useState(1);

// Tambahkan zoom controls
<div className="zoom-controls">
  <button onClick={() => setZoom(zoom + 0.1)}>🔍 +</button>
  <span>{Math.round(zoom * 100)}%</span>
  <button onClick={() => setZoom(zoom - 0.1)}>🔍 -</button>
</div>

// Dalam page-content style
<div className="page-content" style={{ transform: `scale(${zoom})` }}>
```

### 2. Add Bookmarks

```javascript
const [bookmarks, setBookmarks] = useState([]);

const toggleBookmark = (pageNum) => {
  if (bookmarks.includes(pageNum)) {
    setBookmarks(bookmarks.filter(p => p !== pageNum));
  } else {
    setBookmarks([...bookmarks, pageNum]);
  }
};

// Dalam page render
<button 
  className="bookmark-btn"
  onClick={() => toggleBookmark(index)}
>
  {bookmarks.includes(index) ? '⭐' : '☆'}
</button>
```

### 3. Add Search

```javascript
const [searchTerm, setSearchTerm] = useState('');
const [searchResults, setSearchResults] = useState([]);

const handleSearch = (term) => {
  // Implement OCR or metadata search
  const results = pages.filter((page, index) => {
    // Your search logic
    return page.metadata?.includes(term);
  });
  setSearchResults(results);
};
```

### 4. Add Table of Contents

```javascript
const tableOfContents = [
  { page: 0, title: "Introduction" },
  { page: 3, title: "Getting Started" },
  { page: 8, title: "Advanced Features" },
  { page: 15, title: "Troubleshooting" },
];

const goToPage = (pageNum) => {
  if (bookRef.current) {
    bookRef.current.pageFlip().flip(pageNum);
  }
};

// Render TOC
<div className="toc">
  {tableOfContents.map((item, idx) => (
    <button key={idx} onClick={() => goToPage(item.page)}>
      {item.title} - Page {item.page + 1}
    </button>
  ))}
</div>
```

### 5. Add Print Functionality

```javascript
const handlePrint = () => {
  // Create printable version
  const printWindow = window.open('', '', 'width=800,height=600');
  
  pages.forEach((page, index) => {
    printWindow.document.write(`
      <div style="page-break-after: always;">
        <img src="${page}" style="width: 100%;" />
      </div>
    `);
  });
  
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
};

// Button
<button onClick={handlePrint}>🖨️ Print</button>
```

---

## Color Schemes

### Light Mode (Default)

```css
--bg-primary: #ffffff;
--text-primary: #333333;
--accent: #667eea;
```

### Dark Mode

```css
--bg-primary: #1a1a1a;
--text-primary: #f0f0f0;
--accent: #8b5cf6;
```

### Implementation

**File:** `src/index.css`

```css
:root {
  --bg-gradient-start: #667eea;
  --bg-gradient-end: #764ba2;
  --page-bg: #ffffff;
  --text-color: #333333;
}

[data-theme="dark"] {
  --bg-gradient-start: #1a1a2e;
  --bg-gradient-end: #16213e;
  --page-bg: #2d2d2d;
  --text-color: #f0f0f0;
}
```

Toggle:
```javascript
const [theme, setTheme] = useState('light');

const toggleTheme = () => {
  const newTheme = theme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
  document.documentElement.setAttribute('data-theme', newTheme);
};
```

---

## Tips & Best Practices

1. **Image Optimization:** 
   - Compress images before uploading
   - Use WebP format for better compression
   - Target size: < 200KB per image

2. **Performance:**
   - Lazy load images
   - Use thumbnail previews
   - Implement virtual scrolling for 100+ pages

3. **Accessibility:**
   - Add alt text to images
   - Ensure keyboard navigation works
   - Add ARIA labels to buttons

4. **SEO:**
   - Add meta tags
   - Use semantic HTML
   - Add structured data

---

**Need more help?** Check the main README.md or create an issue on GitHub!
