import React, { createContext, useContext, useState, useEffect } from 'react'

const MovieContext = createContext()

export const useMovies = () => useContext(MovieContext)

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cinescope_favorites')) || []
    } catch { return [] }
  })

  const [reviews, setReviews] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cinescope_reviews')) || {}
    } catch { return {} }
  })

  useEffect(() => {
    localStorage.setItem('cinescope_favorites', JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    localStorage.setItem('cinescope_reviews', JSON.stringify(reviews))
  }, [reviews])

  const toggleFavorite = (movie) => {
    setFavorites(prev => {
      const exists = prev.find(m => m.imdbID === movie.imdbID)
      return exists ? prev.filter(m => m.imdbID !== movie.imdbID) : [...prev, movie]
    })
  }

  const isFavorite = (imdbID) => favorites.some(m => m.imdbID === imdbID)

  const addReview = (imdbID, review) => {
    setReviews(prev => ({
      ...prev,
      [imdbID]: [...(prev[imdbID] || []), { ...review, id: Date.now(), date: new Date().toLocaleDateString() }]
    }))
  }

  const getReviews = (imdbID) => reviews[imdbID] || []

  return (
    <MovieContext.Provider value={{ favorites, toggleFavorite, isFavorite, addReview, getReviews }}>
      {children}
    </MovieContext.Provider>
  )
}
