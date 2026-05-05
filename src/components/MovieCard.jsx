import React, { useState } from 'react'
import { useMovies } from '../context/MovieContext'
import ReviewSection from './ReviewSection'
import './MovieCard.css'

const PLACEHOLDER = 'https://via.placeholder.com/300x445/131820/4a5568?text=No+Poster'

const MovieCard = ({ movie, detailed = false }) => {
  const { toggleFavorite, isFavorite } = useMovies()
  const [expanded, setExpanded] = useState(false)
  const [imgError, setImgError] = useState(false)

  const fav = isFavorite(movie.imdbID)
  const poster = (!imgError && movie.Poster && movie.Poster !== 'N/A') ? movie.Poster : PLACEHOLDER

  const rating = movie.imdbRating && movie.imdbRating !== 'N/A'
    ? parseFloat(movie.imdbRating)
    : null

  const stars = rating ? Math.round(rating / 2) : 0

  return (
    <article className={`movie-card ${expanded ? 'movie-card--expanded' : ''}`}>
      <div className="movie-card__poster-wrap">
        <img
          src={poster}
          alt={movie.Title}
          className="movie-card__poster"
          onError={() => setImgError(true)}
          loading="lazy"
        />
        <div className="movie-card__overlay">
          <button
            className={`movie-card__fav-btn ${fav ? 'movie-card__fav-btn--active' : ''}`}
            onClick={(e) => { e.stopPropagation(); toggleFavorite(movie) }}
            aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
          >
            {fav ? '❤️' : '🤍'}
          </button>
          {movie.Year && (
            <span className="badge badge-gold movie-card__year">{movie.Year}</span>
          )}
        </div>
      </div>

      <div className="movie-card__body">
        <h3 className="movie-card__title" title={movie.Title}>{movie.Title}</h3>

        <div className="movie-card__meta">
          {rating ? (
            <div className="movie-card__rating">
              <span className="movie-card__rating-num">⭐ {rating.toFixed(1)}</span>
              <span className="movie-card__stars">
                {'★'.repeat(stars)}{'☆'.repeat(5 - stars)}
              </span>
            </div>
          ) : <span className="movie-card__no-rating">Not Rated</span>}

          {movie.Genre && movie.Genre !== 'N/A' && (
            <div className="movie-card__genres">
              {movie.Genre.split(',').slice(0, 2).map(g => (
                <span key={g} className="badge badge-teal">{g.trim()}</span>
              ))}
            </div>
          )}
        </div>

        {movie.Plot && movie.Plot !== 'N/A' && (
          <p className="movie-card__plot">{movie.Plot}</p>
        )}

        {movie.Director && movie.Director !== 'N/A' && (
          <p className="movie-card__director">
            <span className="movie-card__label">Director</span> {movie.Director}
          </p>
        )}
        {movie.Actors && movie.Actors !== 'N/A' && (
          <p className="movie-card__actors">
            <span className="movie-card__label">Cast</span> {movie.Actors.split(',').slice(0,3).join(', ')}
          </p>
        )}

        <button
          className="movie-card__toggle"
          onClick={() => setExpanded(e => !e)}
        >
          {expanded ? '▲ Hide Reviews' : '▼ Write a Review'}
        </button>

        {expanded && (
          <div className="movie-card__reviews">
            <ReviewSection imdbID={movie.imdbID} title={movie.Title} />
          </div>
        )}
      </div>
    </article>
  )
}

export default MovieCard
