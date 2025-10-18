import React, { useRef, useState, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import './Book.css';

/**
 * Komponen Book - Menampilkan flip book dengan gambar dari folder public/manuals/
 * 
 * Cara menambahkan halaman baru:
 * 1. Tambahkan gambar ke folder public/manuals/ dengan format: page1.png, page2.png, dst
 * 2. Update array TOTAL_PAGES atau gunakan logic auto-detect
 * 
 * Props:
 * - title: Judul buku (optional)
 */

const Book = ({ title = "Manual Book" }) => {
  const bookRef = useRef();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pages, setPages] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  // Konfigurasi: Tentukan jumlah halaman manual Anda di sini
  // Atau biarkan kosong untuk auto-detect (akan mencoba hingga page tidak ditemukan)
  const TOTAL_PAGES = 6; // Ganti dengan jumlah halaman yang sesuai

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Load semua gambar dari folder public/manuals/
    const loadPages = async () => {
      const pageArray = [];
      
      // Jika TOTAL_PAGES sudah ditentukan, gunakan itu
      if (TOTAL_PAGES > 0) {
        for (let i = 1; i <= TOTAL_PAGES; i++) {
          pageArray.push(`/manuals/page${i}.png`);
        }
        setPages(pageArray);
        setTotalPages(TOTAL_PAGES);
      } else {
        // Auto-detect: coba load gambar hingga tidak ditemukan
        let i = 1;
        let imageExists = true;
        
        while (imageExists && i <= 100) { // Max 100 pages untuk safety
          try {
            const response = await fetch(`/manuals/page${i}.png`, { method: 'HEAD' });
            if (response.ok) {
              pageArray.push(`/manuals/page${i}.png`);
              i++;
            } else {
              imageExists = false;
            }
          } catch (error) {
            imageExists = false;
          }
        }
        
        setPages(pageArray);
        setTotalPages(pageArray.length);
      }
    };

    loadPages();
  }, []);

  // Handler saat halaman di-flip
  const onFlip = (e) => {
    setCurrentPage(e.data);
  };

  // Navigasi ke halaman berikutnya
  const nextPage = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipNext();
    }
  };

  // Navigasi ke halaman sebelumnya
  const prevPage = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipPrev();
    }
  };

  // Jika belum ada halaman yang di-load
  if (pages.length === 0) {
    return (
      <div className="book-container">
        <div className="loading">
          <p>Loading manual book...</p>
          <p className="note">
            Catatan: Pastikan gambar sudah ada di folder <code>public/manuals/</code>
            <br />
            dengan format: page1.png, page2.png, page3.png, dst.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="book-container">
      <h1 className="book-title">{title}</h1>
      
      {/* Flip Book Component */}
      <div className="book-wrapper">
        <HTMLFlipBook
          ref={bookRef}
          width={isMobile ? 300 : 550}
          height={isMobile ? 400 : 733}
          size="stretch"
          minWidth={280}
          maxWidth={1000}
          minHeight={350}
          maxHeight={1533}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          onFlip={onFlip}
          className="flip-book"
          style={{}}
          startPage={0}
          drawShadow={true}
          flippingTime={800}
          usePortrait={true}
          startZIndex={0}
          autoSize={true}
          clickEventForward={true}
          useMouseEvents={true}
          swipeDistance={30}
          showPageCorners={true}
          disableFlipByClick={false}
        >
          {/* Render semua halaman dari array pages */}
          {pages.map((page, index) => (
            <div key={index} className="page">
              <div className="page-content">
                <img 
                  src={page} 
                  alt={`Page ${index + 1}`}
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="550" height="733"%3E%3Crect fill="%23f0f0f0" width="550" height="733"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20" fill="%23999"%3EPage ' + (index + 1) + ' not found%3C/text%3E%3C/svg%3E';
                  }}
                />
                <div className="page-number">{index + 1}</div>
              </div>
            </div>
          ))}
        </HTMLFlipBook>
      </div>

      {/* Navigation Controls */}
      <div className="book-controls">
        <button 
          className="control-btn prev-btn" 
          onClick={prevPage}
          disabled={currentPage === 0}
        >
          ← Previous
        </button>
        
        <span className="page-indicator">
          Page {currentPage + 1} of {totalPages}
        </span>
        
        <button 
          className="control-btn next-btn" 
          onClick={nextPage}
          disabled={currentPage >= totalPages - 1}
        >
          Next →
        </button>
      </div>

      {/* Instructions */}
      <div className="instructions">
        <p>💡 {isMobile ? 'Swipe atau tap ujung halaman untuk flip' : 'Klik pada ujung halaman atau gunakan tombol navigasi untuk berpindah halaman'}</p>
      </div>
    </div>
  );
};

export default Book;
