import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useMovies } from '../context/MovieContext'
import './Navbar.css'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { favorites } = useMovies()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [location])

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <NavLink to="/" className="navbar__logo">
          <span className="navbar__logo-icon">🎬</span>
          <span className="navbar__logo-text">CINE<span>SCOPE</span></span>
        </NavLink>

        <button className="navbar__hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
          <span className={menuOpen ? 'bar open' : 'bar'} />
          <span className={menuOpen ? 'bar open' : 'bar'} />
          <span className={menuOpen ? 'bar open' : 'bar'} />
        </button>

        <ul className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          {[
            { to: '/', label: 'Home' },
            { to: '/movies', label: 'Movies' },
            { to: '/about', label: 'About' },
            { to: '/favorites', label: 'Favorites', badge: favorites.length || null },
          ].map(({ to, label, badge }) => (
            <li key={to}>
              <NavLink to={to} className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}>
                {label}
                {badge ? <span className="navbar__badge">{badge}</span> : null}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
