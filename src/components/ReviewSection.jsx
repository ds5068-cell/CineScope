import React, { useState } from 'react'
import { useMovies } from '../context/MovieContext'
import './ReviewSection.css'

const ReviewSection = ({ imdbID, title }) => {
  const { addReview, getReviews } = useMovies()
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [rating, setRating] = useState(5)
  const [hovered, setHovered] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const reviews = getReviews(imdbID)

  const handleSubmit = () => {
    if (!name.trim() || !text.trim()) return
    addReview(imdbID, { name: name.trim(), text: text.trim(), rating })
    setName('')
    setText('')
    setRating(5)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 2000)
  }

  return (
    <div className="reviews">
      <h4 className="reviews__heading">Reviews ({reviews.length})</h4>

      {reviews.length > 0 && (
        <div className="reviews__list">
          {reviews.map(r => (
            <div key={r.id} className="review-item">
              <div className="review-item__header">
                <div className="review-item__avatar">{r.name[0].toUpperCase()}</div>
                <div>
                  <p className="review-item__name">{r.name}</p>
                  <p className="review-item__date">{r.date}</p>
                </div>
                <div className="review-item__stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} style={{ color: i < r.rating ? 'var(--accent-gold)' : 'var(--text-muted)' }}>★</span>
                  ))}
                </div>
              </div>
              <p className="review-item__text">{r.text}</p>
            </div>
          ))}
        </div>
      )}

      <div className="reviews__form">
        <p className="reviews__form-title">Leave a Review</p>
        <input
          className="reviews__input"
          type="text"
          placeholder="Your name"
          value={name}
          onChange={e => setName(e.target.value)}
          maxLength={40}
        />

        <div className="reviews__star-picker">
          {Array.from({ length: 5 }).map((_, i) => (
            <button
              key={i}
              className="reviews__star"
              style={{ color: i < (hovered || rating) ? 'var(--accent-gold)' : 'var(--text-muted)' }}
              onMouseEnter={() => setHovered(i + 1)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => setRating(i + 1)}
            >★</button>
          ))}
          <span className="reviews__star-label">{rating}/5</span>
        </div>

        <textarea
          className="reviews__textarea"
          placeholder="Share your thoughts about this movie..."
          value={text}
          onChange={e => setText(e.target.value)}
          rows={3}
          maxLength={500}
        />

        <div className="reviews__form-footer">
          <span className="reviews__char-count">{text.length}/500</span>
          <button
            className={`reviews__submit ${submitted ? 'reviews__submit--done' : ''}`}
            onClick={handleSubmit}
            disabled={!name.trim() || !text.trim()}
          >
            {submitted ? '✓ Posted!' : 'Post Review'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReviewSection
