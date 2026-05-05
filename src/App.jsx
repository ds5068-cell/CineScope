import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { MovieProvider } from './context/MovieContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const LandingPage  = lazy(() => import('./pages/LandingPage'))
const MoviesPage   = lazy(() => import('./pages/MoviesPage'))
const AboutPage    = lazy(() => import('./pages/AboutPage'))
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'))

const LoadingSpinner = () => (
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    minHeight: '100vh', color: 'var(--accent-gold)'
  }}>
    <div style={{
      width: 40, height: 40,
      border: '3px solid rgba(245,197,24,0.2)',
      borderTop: '3px solid var(--accent-gold)',
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite'
    }} />
  </div>
)

function App() {
  return (
    <MovieProvider>
      <Navbar />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/"          element={<LandingPage />} />
          <Route path="/movies"    element={<MoviesPage />} />
          <Route path="/about"     element={<AboutPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="*"          element={<LandingPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </MovieProvider>
  )
}

export default App
