import { useState, useCallback } from 'react'
import { searchMovies } from '../utils/api'

export const useSearch = () => {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('')
  const [totalResults, setTotalResults] = useState(0)
  const [page, setPage] = useState(1)

  const search = useCallback(async (q, p = 1) => {
    if (!q.trim()) return
    setLoading(true)
    setError(null)
    try {
      const data = await searchMovies(q, p)
      if (p === 1) {
        setResults(data.Search || [])
      } else {
        setResults(prev => [...prev, ...(data.Search || [])])
      }
      setTotalResults(parseInt(data.totalResults) || 0)
      setQuery(q)
      setPage(p)
    } catch (err) {
      setError(err.message)
      if (p === 1) setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  const loadMore = () => search(query, page + 1)

  return { results, loading, error, query, totalResults, search, loadMore, page }
}
