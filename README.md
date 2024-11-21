# Movie Finder

A web application to help you find movies based on genre, actor, and release year. Perfect for discovering classic films and new favorites!

## Features

- Search movies by title
- Filter by genre
- Search by actor
- Filter by release year
- View movie details including:
  - Plot synopsis
  - Release date
  - Rating
  - Movie poster

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Get a TMDB API key:
   - Go to [TMDB website](https://www.themoviedb.org/)
   - Create an account
   - Go to your account settings
   - Click on "API" in the left sidebar
   - Request an API key
   - Copy your API key

4. Create a `.env.local` file in the root directory and add your TMDB API key:
   ```
   NEXT_PUBLIC_TMDB_API_KEY=your_api_key_here
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Technologies Used

- Next.js 14
- TypeScript
- Tailwind CSS
- TMDB API
- date-fns

## License

MIT
