import React from 'react';
import Book from './Book';
import './Home.css';

/**
 * Komponen Home - Halaman utama aplikasi manual book
 * 
 * Komponen ini menampilkan:
 * - Header dengan judul dan deskripsi
 * - Komponen Book untuk flip book manual
 * 
 * Untuk kustomisasi:
 * - Ubah title dan description sesuai kebutuhan
 * - Modifikasi styling di Home.css
 */

const Home = () => {
  return (
    <div className="home">
      {/* Header Section */}
      <header className="home-header">
        <div className="header-content">
          <h1 className="main-title">📖 Interactive Manual Book</h1>
          <p className="subtitle">
            Flip through pages with realistic book experience
          </p>
        </div>
      </header>

      {/* Book Section */}
      <main className="home-main">
        <Book title="Product Manual Guide" />
      </main>

      {/* Footer */}
      <footer className="home-footer">
        <p>© 2025 Manual Book. Built with React & Vite</p>
      </footer>
    </div>
  );
};

export default Home;
