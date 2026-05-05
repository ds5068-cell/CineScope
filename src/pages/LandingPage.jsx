import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import { getFeaturedMovies } from '../utils/api'
import './LandingPage.css'

const PLACEHOLDER = 'https://via.placeholder.com/300x445/131820/4a5568?text=No+Poster'

const LandingPage = () => {
  const navigate = useNavigate()
  const [featured, setFeatured] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getFeaturedMovies()
      .then(setFeatured)
      .catch(() => setFeatured([]))
      .finally(() => setLoading(false))
  }, [])

  const handleSearch = (query) => {
    if (query.trim()) navigate(`/movies?q=${encodeURIComponent(query)}`)
  }

  return (
    <main className="landing page-enter">
      {/* Hero */}
      <section className="hero">
        <div className="hero__bg">
          {featured.slice(0, 5).map((m, i) => (
            <div
              key={m.imdbID}
              className="hero__bg-poster"
              style={{
                backgroundImage: `url(${m.Poster && m.Poster !== 'N/A' ? m.Poster : PLACEHOLDER})`,
                animationDelay: `${i * 0.8}s`,
                left: `${i * 22}%`
              }}
            />
          ))}
          <div className="hero__bg-overlay" />
        </div>

        <div className="hero__content container">
          <div className="hero__eyebrow fade-in-up">
            <span className="badge badge-gold">✦ Powered by OMDb API</span>
          </div>
          <h1 className="hero__title fade-in-up" style={{ animationDelay: '0.1s' }}>
            Your Universe<br />
            <em>of Cinema</em>
          </h1>
          <p className="hero__subtitle fade-in-up" style={{ animationDelay: '0.2s' }}>
            Discover, search, rate, and review millions of movies.<br />
            Real-time data. Personal favorites. No limits.
          </p>

          <div className="hero__search fade-in-up" style={{ animationDelay: '0.3s' }}>
            <SearchBar onSearch={handleSearch} placeholder="Search any movie…" size="large" />
          </div>

          <div className="hero__stats fade-in-up" style={{ animationDelay: '0.4s' }}>
            {[
              { num: '500K+', label: 'Movies' },
              { num: 'Real-time', label: 'Data' },
              { num: '∞', label: 'Reviews' },
            ].map(s => (
              <div key={s.label} className="hero__stat">
                <span className="hero__stat-num">{s.num}</span>
                <span className="hero__stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="featured container">
        <div className="featured__header">
          <h2 className="featured__title">Featured Films</h2>
          <button className="featured__see-all" onClick={() => navigate('/movies')}>
            Browse All →
          </button>
        </div>

        <div className="featured__grid">
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="featured__skeleton skeleton" />
              ))
            : featured.map((movie, i) => (
                <div
                  key={movie.imdbID}
                  className="featured__card"
                  style={{ animationDelay: `${i * 0.1}s` }}
                  onClick={() => navigate(`/movies?q=${encodeURIComponent(movie.Title)}`)}
                >
                  <div className="featured__card-img-wrap">
                    <img
                      src={movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : PLACEHOLDER}
                      alt={movie.Title}
                      className="featured__card-img"
                    />
                    <div className="featured__card-overlay">
                      <p className="featured__card-rating">⭐ {movie.imdbRating}</p>
                      <p className="featured__card-cta">Search →</p>
                    </div>
                  </div>
                  <p className="featured__card-title">{movie.Title}</p>
                  <p className="featured__card-year">{movie.Year}</p>
                </div>
              ))
          }
        </div>
      </section>

      {/* Features */}
      <section className="features container">
        <h2 className="features__title">Everything You Need</h2>
        <div className="features__grid">
          {[
            { icon: '🔍', title: 'Instant Search', desc: 'Search half a million movies in real-time with live OMDb data.' },
            { icon: '⭐', title: 'Ratings & Info', desc: 'IMDb ratings, cast, directors, genres, and full plot summaries.' },
            { icon: '✍️', title: 'User Reviews', desc: 'Add personal reviews to any movie. Saved to your browser.' },
            { icon: '❤️', title: 'Favorites List', desc: 'Save movies you love and revisit your personal collection.' },
          ].map(f => (
            <div key={f.title} className="feature-card">
              <div className="feature-card__icon">{f.icon}</div>
              <h3 className="feature-card__title">{f.title}</h3>
              <p className="feature-card__desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container cta__inner">
          <h2 className="cta__title">Start Exploring</h2>
          <p className="cta__sub">Type any title, actor, or genre and discover your next watch.</p>
          <button className="cta__btn" onClick={() => navigate('/movies')}>
            Open Movie Search
          </button>
        </div>
      </section>
    </main>
  )
}

export default LandingPage
