# 🎬 CineScope — Movie Discovery App

A modern, dark-themed React movie web application powered by the **OMDb API**.

---

## ✨ Features

| Feature | Details |
|---|---|
| 🔍 Movie Search | Real-time search by title (press Enter or click Search) |
| 🎥 Movie Cards | Poster, IMDb rating, genre badges, plot, cast, director |
| ⭐ Star Ratings | Displays 5-star visual rating from IMDb score |
| ✍️ User Reviews | Add reviews per movie (name, star rating, text) |
| ❤️ Favorites | Save/remove favorites, persisted in localStorage |
| 📱 Responsive | Mobile + tablet + desktop layouts |
| ⚡ Lazy Loading | Code-split pages via React Suspense |
| 🎨 Dark Theme | Cinematic dark UI with gold accents |

---

## 📁 Folder Structure

```
cinescope/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx              # Entry point
    ├── App.jsx               # Routes + layout
    ├── styles/
    │   └── global.css        # CSS variables, resets, utilities
    ├── context/
    │   └── MovieContext.jsx  # Global state (favorites, reviews)
    ├── hooks/
    │   └── useSearch.js      # Search hook with pagination
    ├── utils/
    │   └── api.js            # OMDb API functions
    ├── components/
    │   ├── Navbar.jsx/css    # Navigation bar
    │   ├── Footer.jsx/css    # Footer
    │   ├── SearchBar.jsx/css # Search input component
    │   ├── MovieCard.jsx/css # Movie card with review toggle
    │   └── ReviewSection.jsx/css # Reviews form + display
    └── pages/
        ├── LandingPage.jsx/css    # Hero + featured + CTA
        ├── MoviesPage.jsx/css     # Search results grid
        ├── AboutPage.jsx/css      # App info + API details
        └── FavoritesPage.jsx/css  # Saved movies
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v16+ — [Download](https://nodejs.org/)
- **npm** v7+ (included with Node.js)

### Step 1 — Install dependencies

```bash
cd cinescope
npm install
```

### Step 2 — Get a free OMDb API key

1. Visit [https://www.omdbapi.com/apikey.aspx](https://www.omdbapi.com/apikey.aspx)
2. Sign up for a **FREE** key (1,000 req/day)
3. Open `src/utils/api.js`
4. Replace `'trilogy'` with your key:

```js
const API_KEY = 'your_actual_key_here'
```

> **Note:** The app uses a public demo key by default. It works but may hit rate limits.

### Step 3 — Start the dev server

```bash
npm run dev
```

Open **http://localhost:5173** in your browser.

### Step 4 — Build for production (optional)

```bash
npm run build
npm run preview
```

---

## 📄 Pages

| Route | Page | Description |
|---|---|---|
| `/` | Landing | Hero section, featured films, feature overview |
| `/movies` | Movies | Search box + results grid with full movie details |
| `/about` | About | App purpose, OMDb API docs, tech stack |
| `/favorites` | Favorites | Saved movies + collection stats |

---

## 🔌 API Reference

All API calls are in `src/utils/api.js`:

```js
// Search movies by title
searchMovies(query, page)     // GET ?s=...&type=movie&page=N

// Get full movie details
getMovieDetails(imdbID)       // GET ?i=tt1234567&plot=full

// Get curated featured films
getFeaturedMovies()           // Fetches 5 preset titles
```

---

## 🧠 State Management

- **MovieContext** — React Context API for app-wide state
- **favorites** — Array of saved movies → persisted to `localStorage`
- **reviews** — Object keyed by `imdbID` → persisted to `localStorage`
- **useSearch hook** — Local state for search results, loading, pagination

---

## 📦 Dependencies

```json
"react": "^18.2.0",
"react-dom": "^18.2.0",
"react-router-dom": "^6.20.0",
"axios": "^1.6.0"
```

Dev:
```json
"vite": "^5.0.0",
"@vitejs/plugin-react": "^4.2.0"
```

---

## 💡 Tips

- **Reviews and favorites** persist automatically — no backend needed
- Clicking a featured movie on the landing page navigates to `/movies?q=...`
- The "Load More" button uses OMDb's pagination (`&page=N`)
- All movie cards have hover animations and a toggleable review section

---

Built with ❤️ using React + Vite + OMDb API
