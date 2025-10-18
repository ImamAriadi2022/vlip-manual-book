import React from 'react'
import Home from './components/Home'
import './App.css'

/**
 * App Component - Root component aplikasi Manual Book
 * 
 * Aplikasi ini menggunakan:
 * - React untuk UI framework
 * - Vite untuk build tool
 * - react-pageflip untuk efek flip halaman
 * 
 * Struktur:
 * - App.jsx: Root component
 * - Home.jsx: Halaman utama
 * - Book.jsx: Komponen flip book
 * 
 * Untuk menambahkan halaman manual:
 * 1. Tambahkan gambar ke folder public/manuals/
 * 2. Format: page1.png, page2.png, page3.png, dst.
 * 3. Update TOTAL_PAGES di Book.jsx jika perlu
 */

function App() {
  return (
    <div className="app">
      <Home />
    </div>
  )
}

export default App
