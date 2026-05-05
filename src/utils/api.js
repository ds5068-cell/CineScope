import axios from 'axios'

// OMDb API - Free key for demo. Replace with your own from https://www.omdbapi.com/apikey.aspx
const API_KEY = 'trilogy'  // This is a known public demo key
const BASE_URL = 'https://www.omdbapi.com'

export const searchMovies = async (query, page = 1) => {
  try {
    const res = await axios.get(BASE_URL, {
      params: { apikey: API_KEY, s: query, type: 'movie', page }
    })
    if (res.data.Response === 'True') return res.data
    throw new Error(res.data.Error || 'No results found')
  } catch (err) {
    throw new Error(err.message || 'Search failed')
  }
}

export const getMovieDetails = async (imdbID) => {
  try {
    const res = await axios.get(BASE_URL, {
      params: { apikey: API_KEY, i: imdbID, plot: 'full' }
    })
    if (res.data.Response === 'True') return res.data
    throw new Error(res.data.Error || 'Movie not found')
  } catch (err) {
    throw new Error(err.message || 'Failed to fetch details')
  }
}

export const getFeaturedMovies = async () => {
  const titles = ['Inception', 'Interstellar', 'The Dark Knight', 'Dune', 'Oppenheimer']
  const results = await Promise.allSettled(
    titles.map(t => axios.get(BASE_URL, { params: { apikey: API_KEY, t, plot: 'short' } }))
  )
  return results
    .filter(r => r.status === 'fulfilled' && r.value.data.Response === 'True')
    .map(r => r.value.data)
}
