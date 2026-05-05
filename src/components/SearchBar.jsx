import React, { useState } from 'react'
import './SearchBar.css'

const SearchBar = ({ onSearch, placeholder = 'Search for a movie...', size = 'normal', initialValue = '' }) => {
  const [value, setValue] = useState(initialValue)

  const handleKey = (e) => {
    if (e.key === 'Enter') onSearch(value)
  }

  const handleSubmit = () => onSearch(value)

  return (
    <div className={`search-bar search-bar--${size}`}>
      <div className="search-bar__inner">
        <span className="search-bar__icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
        </span>
        <input
          className="search-bar__input"
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKey}
          placeholder={placeholder}
          autoComplete="off"
          spellCheck="false"
        />
        {value && (
          <button className="search-bar__clear" onClick={() => setValue('')} aria-label="Clear">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        )}
        <button className="search-bar__btn" onClick={handleSubmit}>
          Search
        </button>
      </div>
      <p className="search-bar__hint">Press <kbd>Enter</kbd> or click Search</p>
    </div>
  )
}

export default SearchBar
