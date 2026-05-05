import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMovies } from '../context/MovieContext'
import MovieCard from '../components/MovieCard'
import './FavoritesPage.css'

const FavoritesPage = () => {
  const { favorites, toggleFavorite } = useMovies()
  const navigate = useNavigate()
  const [confirmClear, setConfirmClear] = useState(false)

  const handleClearAll = () => {
    if (confirmClear) {
      favorites.forEach(m => toggleFavorite(m))
      setConfirmClear(false)
    } else {
      setConfirmClear(true)
      setTimeout(() => setConfirmClear(false), 3000)
    }
  }

  return (
    <main className="favorites-page page-enter">
      <div className="favorites-page__header">
        <div className="container favorites-page__header-inner">
          <div>
            <span className="badge badge-crimson">❤️ My Collection</span>
            <h1 className="favorites-page__title">Favorites</h1>
            <p className="favorites-page__sub">
              {favorites.length > 0
                ? `${favorites.length} movie${favorites.length !== 1 ? 's' : ''} saved to your collection`
                : 'Your saved movies will appear here'}
            </p>
          </div>
          {favorites.length > 0 && (
            <button
              className={`favorites-page__clear ${confirmClear ? 'favorites-page__clear--confirm' : ''}`}
              onClick={handleClearAll}
            >
              {confirmClear ? '⚠️ Click again to confirm' : 'Clear All'}
            </button>
          )}
        </div>
      </div>

      <div className="container favorites-page__body">
        {favorites.length === 0 ? (
          <div className="favorites-page__empty">
            <div className="favorites-page__empty-heart">🤍</div>
            <h2>No favorites yet</h2>
            <p>
              Tap the heart icon on any movie card to add it to your personal collection.
              Your favorites are saved locally in your browser.
            </p>
            <button className="favorites-page__discover" onClick={() => navigate('/movies')}>
              Discover Movies
            </button>
          </div>
        ) : (
          <>
            {/* Genre summary */}
            <div className="favorites-page__summary">
              <div className="fav-summary-card">
                <span className="fav-summary-card__num">{favorites.length}</span>
                <span className="fav-summary-card__label">Movies Saved</span>
              </div>
              <div className="fav-summary-card">
                <span className="fav-summary-card__num">
                  {favorites.filter(m => m.imdbRating && m.imdbRating !== 'N/A').length > 0
                    ? (
                        favorites
                          .filter(m => m.imdbRating && m.imdbRating !== 'N/A')
                          .reduce((sum, m) => sum + parseFloat(m.imdbRating), 0) /
                        favorites.filter(m => m.imdbRating && m.imdbRating !== 'N/A').length
                      ).toFixed(1)
                    : '—'
                  }
                </span>
                <span className="fav-summary-card__label">Avg IMDb Rating</span>
              </div>
              <div className="fav-summary-card">
                <span className="fav-summary-card__num">
                  {[...new Set(
                    favorites.flatMap(m =>
                      m.Genre && m.Genre !== 'N/A' ? m.Genre.split(',').map(g => g.trim()) : []
                    )
                  )].length}
                </span>
                <span className="fav-summary-card__label">Genres</span>
              </div>
              <div className="fav-summary-card">
                <span className="fav-summary-card__num">
                  {[...new Set(favorites.map(m => m.Year).filter(Boolean))].length}
                </span>
                <span className="fav-summary-card__label">Eras</span>
              </div>
            </div>

            <div className="favorites-page__grid">
              {favorites.map(movie => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  )
}

export default FavoritesPage
