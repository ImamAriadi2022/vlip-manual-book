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
          <h1 className="main-title">
            <span className="logo-icon">🤖</span> Manual Book Cakep.id
          </h1>
          <p className="subtitle">
            AI untuk Pemeliharaan Aset Industri Migas
          </p>
          <p className="tagline">
            Panduan Lengkap Manajemen Aset Industri yang Cerdas
          </p>
        </div>
      </header>

      {/* Book Section */}
      <main className="home-main">
        <Book title="Panduan Pengguna Cakep.id" />
      </main>

      {/* Footer */}
      <footer className="home-footer">
        <p>© 2025 Cakep.id</p>
      </footer>
    </div>
  );
};

export default Home;
