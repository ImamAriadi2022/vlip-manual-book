import React, { useRef, useState, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
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
  const [isExporting, setIsExporting] = useState(false);

  // Konfigurasi: Tentukan jumlah halaman manual Anda di sini
  // Atau biarkan kosong untuk auto-detect (akan mencoba hingga page tidak ditemukan)
  const TOTAL_PAGES = 22; // Ganti dengan jumlah halaman yang sesuai

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

  // Export semua halaman ke PDF
  const exportToPDF = async () => {
    if (pages.length === 0) {
      alert('Tidak ada halaman untuk diekspor!');
      return;
    }

    setIsExporting(true);
    
    try {
      // Create PDF dengan orientasi portrait
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Kalkulasi dimensi untuk A4
      const pageWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      
      // Rasio gambar original (1410x2250)
      const imageRatio = 1410 / 2250;
      
      // Hitung dimensi yang pas di A4 dengan margin
      const margin = 10;
      const availableWidth = pageWidth - (margin * 2);
      const availableHeight = pageHeight - (margin * 2);
      
      let finalWidth, finalHeight;
      
      if (availableWidth / availableHeight > imageRatio) {
        // Tinggi yang membatasi
        finalHeight = availableHeight;
        finalWidth = finalHeight * imageRatio;
      } else {
        // Lebar yang membatasi
        finalWidth = availableWidth;
        finalHeight = finalWidth / imageRatio;
      }

      // Posisi tengah
      const xPos = (pageWidth - finalWidth) / 2;
      const yPos = (pageHeight - finalHeight) / 2;

      for (let i = 0; i < pages.length; i++) {
        try {
          // Load image
          const img = new Image();
          img.crossOrigin = 'anonymous';
          
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            img.src = pages[i];
          });

          // Add new page (except for first page)
          if (i > 0) {
            pdf.addPage();
          }

          // Add image to PDF
          pdf.addImage(
            img,
            'PNG',
            xPos,
            yPos,
            finalWidth,
            finalHeight,
            `page-${i + 1}`,
            'FAST'
          );

          // Add page number
          pdf.setFontSize(10);
          pdf.setTextColor(100, 100, 100);
          pdf.text(
            `Halaman ${i + 1} dari ${pages.length}`,
            pageWidth / 2,
            pageHeight - 5,
            { align: 'center' }
          );

          // Add watermark
          pdf.setFontSize(8);
          pdf.setTextColor(150, 150, 150);
          pdf.text(
            'Manual Book Cakep.id',
            pageWidth - margin,
            pageHeight - 5,
            { align: 'right' }
          );

        } catch (imageError) {
          console.warn(`Gagal memuat gambar halaman ${i + 1}:`, imageError);
          
          // Add error page
          if (i > 0) {
            pdf.addPage();
          }
          
          pdf.setFontSize(16);
          pdf.setTextColor(100, 100, 100);
          pdf.text(
            `Halaman ${i + 1} tidak dapat dimuat`,
            pageWidth / 2,
            pageHeight / 2,
            { align: 'center' }
          );
        }
      }

      // Add metadata
      pdf.setProperties({
        title: 'Manual Book Cakep.id',
        subject: 'AI untuk Pemeliharaan Aset Industri Migas',
        author: 'Cakep.id',
        creator: 'Cakep.id Manual Book App',
        producer: 'jsPDF'
      });

      // Generate filename dengan timestamp
      const now = new Date();
      const timestamp = now.toISOString().slice(0, 19).replace(/[:.]/g, '-');
      const filename = `Manual-Book-Cakep-${timestamp}.pdf`;

      // Save PDF
      pdf.save(filename);

      alert(`PDF berhasil diekspor: ${filename}`);

    } catch (error) {
      console.error('Error saat export PDF:', error);
      alert('Gagal mengekspor PDF. Silakan coba lagi.');
    } finally {
      setIsExporting(false);
    }
  };

  // Jika belum ada halaman yang di-load
  if (pages.length === 0) {
    return (
      <div className="book-container">
        <div className="loading">
          <p>Memuat manual book...</p>
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
          width={isMobile ? 350 : 705}
          height={isMobile ? 560 : 1125}
          size="stretch"
          minWidth={300}
          maxWidth={1200}
          minHeight={480}
          maxHeight={1800}
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
          autoSize={false}
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
                  alt={`Halaman ${index + 1}`}
                  onError={(e) => {
                    const width = isMobile ? 350 : 705;
                    const height = isMobile ? 560 : 1125;
                    e.target.src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"%3E%3Crect fill="%23f0f0f0" width="${width}" height="${height}"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%23999"%3EHalaman ${index + 1} tidak ditemukan%3C/text%3E%3C/svg%3E`;
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
          disabled={currentPage === 0 || isExporting}
        >
          ← Sebelumnya
        </button>
        
        <span className="page-indicator">
          Halaman {currentPage + 1} dari {totalPages}
        </span>
        
        <button 
          className="control-btn next-btn" 
          onClick={nextPage}
          disabled={currentPage >= totalPages - 1 || isExporting}
        >
          Selanjutnya →
        </button>
      </div>

      {/* Export Controls */}
      <div className="export-controls">
        <button 
          className="export-btn"
          onClick={exportToPDF}
          disabled={isExporting || pages.length === 0}
        >
          {isExporting ? (
            <>
              <span className="loading-spinner">⏳</span>
              Mengekspor PDF... ({pages.length} halaman)
            </>
          ) : (
            <>
              📄 Ekspor ke PDF
            </>
          )}
        </button>
        
        {pages.length > 0 && (
          <p className="export-info">
            {pages.length} halaman siap diekspor ke PDF
          </p>
        )}
      </div>

      {/* Instructions */}
      <div className="instructions">
        <p>💡 {isMobile ? 'Swipe atau tap ujung halaman untuk flip' : 'Klik pada ujung halaman atau gunakan tombol navigasi untuk berpindah halaman'}</p>
      </div>
    </div>
  );
};

export default Book;
