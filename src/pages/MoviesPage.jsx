import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import MovieCard from '../components/MovieCard'
import { useSearch } from '../hooks/useSearch'
import { getMovieDetails } from '../utils/api'
import './MoviesPage.css'

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { results, loading, error, query, totalResults, search, loadMore, page } = useSearch()
  const [detailedMovies, setDetailedMovies] = useState({})
  const [loadingDetails, setLoadingDetails] = useState(false)

  // Run search from URL param on mount / param change
  useEffect(() => {
    const q = searchParams.get('q')
    if (q) search(q)
  }, [searchParams.get('q')])

  // Fetch full details for each result
  useEffect(() => {
    if (!results.length) return
    const newIds = results.filter(m => !detailedMovies[m.imdbID]).map(m => m.imdbID)
    if (!newIds.length) return

    setLoadingDetails(true)
    Promise.allSettled(newIds.map(id => getMovieDetails(id)))
      .then(settled => {
        const updates = {}
        settled.forEach((r, i) => {
          if (r.status === 'fulfilled') updates[newIds[i]] = r.value
        })
        setDetailedMovies(prev => ({ ...prev, ...updates }))
      })
      .finally(() => setLoadingDetails(false))
  }, [results])

  const handleSearch = (q) => {
    setSearchParams({ q })
    setDetailedMovies({})
    search(q)
  }

  const hasMore = results.length < totalResults

  const enriched = results.map(m => detailedMovies[m.imdbID] || m)

  return (
    <main className="movies-page page-enter">
      <div className="movies-page__header">
        <div className="container">
          <h1 className="movies-page__title">Movie Search</h1>
          <p className="movies-page__subtitle">Search the OMDb database of 500,000+ films</p>
          <div className="movies-page__search">
            <SearchBar
              onSearch={handleSearch}
              placeholder="Search movies by title, actor, or keyword…"
              initialValue={searchParams.get('q') || ''}
            />
          </div>
        </div>
      </div>

      <div className="container movies-page__body">

        {/* Initial empty state */}
        {!query && !loading && (
          <div className="movies-page__empty">
            <div className="movies-page__empty-icon">🎬</div>
            <h2>What will you watch?</h2>
            <p>Search for any movie title above to get started. Results include posters, ratings, cast, and more.</p>
            <div className="movies-page__suggestions">
              {['Inception', 'The Godfather', 'Parasite', 'Oppenheimer', 'Dune'].map(s => (
                <button key={s} className="movies-page__suggestion" onClick={() => handleSearch(s)}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && results.length === 0 && (
          <div className="movies-page__grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="movies-page__card-skeleton">
                <div className="skeleton movies-page__poster-skel" />
                <div className="movies-page__body-skel">
                  <div className="skeleton" style={{ height: 20, marginBottom: 8, borderRadius: 6 }} />
                  <div className="skeleton" style={{ height: 14, width: '60%', borderRadius: 6 }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="movies-page__error">
            <span>⚠️</span>
            <div>
              <p className="movies-page__error-title">No results found</p>
              <p className="movies-page__error-msg">{error}</p>
            </div>
          </div>
        )}

        {/* Results */}
        {!error && results.length > 0 && (
          <>
            <div className="movies-page__results-bar">
              <p className="movies-page__count">
                Showing <strong>{results.length}</strong> of <strong>{totalResults}</strong> results for "<em>{query}</em>"
              </p>
              <span className={`badge ${loadingDetails ? 'badge-teal' : 'badge-gold'}`}>
                {loadingDetails ? '⟳ Loading details…' : '✓ Details loaded'}
              </span>
            </div>

            <div className="movies-page__grid">
              {enriched.map(movie => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </div>

            {hasMore && (
              <div className="movies-page__load-more">
                <button
                  className="movies-page__load-btn"
                  onClick={loadMore}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="movies-page__spinner" />
                  ) : (
                    `Load More (${totalResults - results.length} remaining)`
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}

export default MoviesPage
