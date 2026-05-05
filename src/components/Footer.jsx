import React from 'react'
import { NavLink } from 'react-router-dom'
import './Footer.css'

const Footer = () => (
  <footer className="footer">
    <div className="container footer__inner">
      <div className="footer__brand">
        <span className="footer__logo">🎬 CINE<span>SCOPE</span></span>
        <p>Your cinematic universe. Discover, rate, and review movies powered by OMDb API.</p>
      </div>
      <div className="footer__links">
        <h4>Navigate</h4>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/movies">Movies</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/favorites">Favorites</NavLink>
      </div>
      <div className="footer__links">
        <h4>Resources</h4>
        <a href="https://www.omdbapi.com" target="_blank" rel="noopener">OMDb API</a>
        <a href="https://reactjs.org" target="_blank" rel="noopener">React.js</a>
        <a href="https://vitejs.dev" target="_blank" rel="noopener">Vite</a>
      </div>
    </div>
    <div className="footer__bottom container">
      <p>© {new Date().getFullYear()} CineScope. Built with React + OMDb API.</p>
    </div>
  </footer>
)

export default Footer
