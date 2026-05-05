import React from 'react'
import './AboutPage.css'

const AboutPage = () => (
  <main className="about-page page-enter">
    <div className="about-page__hero">
      <div className="container about-page__hero-inner">
        <span className="badge badge-teal">About CineScope</span>
        <h1 className="about-page__title">Built for<br /><em>Movie Lovers</em></h1>
        <p className="about-page__lead">
          CineScope is a React-powered movie discovery app that connects to the OMDb API
          to deliver real-time data on over half a million films — instantly.
        </p>
      </div>
    </div>

    <div className="container about-page__body">

      {/* App Purpose */}
      <section className="about-section">
        <div className="about-section__text">
          <span className="about-section__tag">The App</span>
          <h2>What is CineScope?</h2>
          <p>
            CineScope is a full-featured movie web application built with React 18, React Router,
            and the OMDb API. It allows users to search for any movie by title, browse detailed
            information including cast, director, runtime, ratings, and genre — and save personal
            reviews and favorites that persist between sessions.
          </p>
          <p>
            The app is designed around a cinematic dark aesthetic, smooth animations,
            and a fully responsive layout that works on every screen size.
          </p>
        </div>
        <div className="about-section__visual">
          <div className="about-stat-grid">
            {[
              { n: '500K+', l: 'Movies in OMDb' },
              { n: 'Real-time', l: 'Data Fetching' },
              { n: 'localStorage', l: 'Favorites & Reviews' },
              { n: 'React 18', l: 'Frontend Framework' },
            ].map(s => (
              <div key={s.l} className="about-stat">
                <span className="about-stat__num">{s.n}</span>
                <span className="about-stat__label">{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* API Details */}
      <section className="about-section about-section--reversed">
        <div className="about-section__text">
          <span className="about-section__tag">The API</span>
          <h2>OMDb API</h2>
          <p>
            The Open Movie Database (OMDb) API is a RESTful web service for obtaining movie information.
            It provides structured JSON data including titles, posters, IMDb ratings, Rotten Tomatoes scores,
            plots, genres, directors, actors, box office, runtime, and much more.
          </p>
          <div className="about-api-details">
            <div className="about-api-row">
              <span className="about-api-key">Endpoint</span>
              <code className="about-api-val">https://www.omdbapi.com/</code>
            </div>
            <div className="about-api-row">
              <span className="about-api-key">Method</span>
              <code className="about-api-val">GET</code>
            </div>
            <div className="about-api-row">
              <span className="about-api-key">Search param</span>
              <code className="about-api-val">?s={'{query}'}&apikey={'{key}'}</code>
            </div>
            <div className="about-api-row">
              <span className="about-api-key">Details param</span>
              <code className="about-api-val">?i={'{imdbID}'}&plot=full</code>
            </div>
            <div className="about-api-row">
              <span className="about-api-key">Free tier</span>
              <code className="about-api-val">1,000 requests / day</code>
            </div>
          </div>
          <a
            href="https://www.omdbapi.com/apikey.aspx"
            target="_blank"
            rel="noopener"
            className="about-api-link"
          >
            Get a free API key →
          </a>
        </div>

        <div className="about-section__visual">
          <div className="about-code-block">
            <div className="about-code-block__header">
              <span className="about-code-block__dot" style={{background:'#ff5f57'}}/>
              <span className="about-code-block__dot" style={{background:'#febc2e'}}/>
              <span className="about-code-block__dot" style={{background:'#28c840'}}/>
              <span style={{marginLeft:'auto', fontSize:11, color:'var(--text-muted)'}}>api.js</span>
            </div>
            <pre className="about-code-block__code">{`// Search movies
const res = await axios.get(
  'https://www.omdbapi.com',
  {
    params: {
      apikey: 'YOUR_KEY',
      s: 'Inception',
      type: 'movie'
    }
  }
)

// Get full details
const detail = await axios.get(
  'https://www.omdbapi.com',
  {
    params: {
      apikey: 'YOUR_KEY',
      i: 'tt1375666',
      plot: 'full'
    }
  }
)`}</pre>
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* Tech Stack */}
      <section className="about-tech">
        <h2 className="about-tech__title">Tech Stack</h2>
        <div className="about-tech__grid">
          {[
            { icon: '⚛️', name: 'React 18', desc: 'Functional components, hooks, Context API' },
            { icon: '🔀', name: 'React Router v6', desc: 'Client-side routing, nested pages' },
            { icon: '📡', name: 'Axios', desc: 'HTTP client for OMDb API requests' },
            { icon: '🎨', name: 'Custom CSS', desc: 'Flexbox, Grid, CSS variables, animations' },
            { icon: '💾', name: 'localStorage', desc: 'Persistent favorites and reviews' },
            { icon: '⚡', name: 'Vite', desc: 'Lightning-fast dev server and build tool' },
          ].map(t => (
            <div key={t.name} className="tech-card">
              <span className="tech-card__icon">{t.icon}</span>
              <div>
                <p className="tech-card__name">{t.name}</p>
                <p className="tech-card__desc">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  </main>
)

export default AboutPage
