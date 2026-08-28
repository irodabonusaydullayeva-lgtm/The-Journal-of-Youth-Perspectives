# The Journal of Youth Perspectives

An international academic web journal for youth voices, built with **Vite, React, Tailwind CSS v4, React Router DOM, and Supabase**.

---

## 🌟 Overview

**The Journal of Youth Perspectives** is an editorial-grade web application designed for an international youth publication. It provides a platform for young thinkers, researchers, and writers to explore and publish work on critical global topics such as **Human Rights**, **Ecology**, and **Gender Equality**.

### Features

- **Editorial Visual Design**: Academic, modern, minimal aesthetic with custom serif typography (`Newsreader`), clean body font (`Public Sans`), and monospace accents (`IBM Plex Mono`).
- **Dynamic Supabase Backend**: Server-side filtering, title search, latest articles sorting, and article insertion.
- **LocalStorage Persistence**: Auto-populates and retains author name and contact email across visits without overwriting with blank values.
- **Client-Side Form Validation**: Real-time validation for required fields, email format, and optional cover image URL.
- **Responsive Layout**: Mobile-first grid/list layouts with interactive mobile navigation drawer.
- **Comprehensive State Management**: Handles loading skeletons, empty states with filter reset actions, and graceful error states.
- **Accessible & Performance Optimized**: Semantic HTML5 tags, visible focus indicators, screen-reader friendly elements, and `prefers-reduced-motion` animation fallbacks.

---

## 📁 Architecture & File Structure

```text
src/
├── components/
│   ├── Navbar.jsx              # Responsive header with mobile drawer
│   ├── Footer.jsx              # Editorial footer with brand links
│   ├── Hero.jsx                # Hero banner with mission & CTAs
│   ├── CategoryCard.jsx        # Interactive category cards
│   ├── ArticleCard.jsx         # Article preview card with fallback image support
│   ├── ArticleGrid.jsx         # Responsive card layout container
│   ├── SearchBar.jsx           # Debounced article title search input
│   ├── CategoryFilter.jsx      # Pill-style category toggle buttons
│   ├── SubmitArticleForm.jsx   # Validated article submission form
│   ├── LoadingState.jsx        # Animated skeleton loaders
│   ├── EmptyState.jsx          # Friendly empty state & reset action
│   └── ErrorState.jsx          # Graceful error banner & retry trigger
│
├── pages/
│   ├── Home.jsx                # Landing page with hero, mission, categories & recent posts
│   ├── Articles.jsx            # Article archive page with live search & filter
│   ├── ArticleDetail.jsx       # Full editorial reading view with 404 handling
│   └── SubmitArticle.jsx       # Dedicated article submission page
│
├── hooks/
│   ├── useArticles.js          # Supabase hook for list fetching, search, filter
│   ├── useArticle.js           # Supabase hook for single article by ID
│   ├── useLocalStorage.js      # Persistent state hook for author details
│   └── useScrollReveal.js      # IntersectionObserver hook for subtle scroll animations
│
├── lib/
│   └── supabase.js             # Configured Supabase client
│
├── utils/
│   └── constants.js            # Extensible categories list, storage keys & helpers
│
├── App.jsx                     # React Router layout & route definitions
├── index.css                   # Tailwind CSS v4 setup & editorial design tokens
└── main.jsx                    # React entry point
```

---

## 🛠️ Setup Instructions

### 1. Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [npm](https://www.npmjs.com/)

### 2. Environment Variables

Create a `.env` file in the root directory (refer to `.env.example`):

```env
VITE_SUPABASE_URL=https://your-supabase-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

### 3. Database Schema (Supabase SQL)

Run the following SQL script in your Supabase SQL Editor to create the `articles` table and setup Row Level Security (RLS):

```sql
-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author_name TEXT NOT NULL,
  email TEXT NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Human Rights', 'Ecology', 'Gender Equality')),
  image_url TEXT,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Allow public read access to all articles
CREATE POLICY "Public read access"
  ON articles
  FOR SELECT
  USING (true);

-- Allow public insert access for article submissions
CREATE POLICY "Public insert access"
  ON articles
  FOR INSERT
  WITH CHECK (true);
```

### 4. Installation & Local Development

```bash
# Install dependencies
npm install

# Start local Vite development server
npm run dev

# Build production bundle
npm run build
```

---

## 🧭 Application Routes

| Path | View | Description |
|---|---|---|
| `/` | **Home** | Landing page featuring Hero, Mission, Categories, and Recent Articles |
| `/articles` | **Articles Archive** | Dynamic search & filterable catalog of all published articles |
| `/article/:id` | **Article Detail** | Full reading view with comfortable line-height, text width & metadata |
| `/submit` | **Submit Article** | Form to submit new articles with validation & author local persistence |

---

## 🛡️ License

Built for **The Journal of Youth Perspectives**.
