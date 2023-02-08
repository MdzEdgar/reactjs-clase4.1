import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import MovieCard from './components/MovieCard'

function App() {
  const [movies, setMovies] = useState([])

  const URL_BASE = "https://movies-crud-2.academlo.tech/"

  useEffect(() => {
    axios.get(`${URL_BASE}movies/`)
    .then((res) => setMovies(res.data))
    .catch((err) => console.log(err))
  }, [])

  return (
    <div className="App">
      <h1>Movies App</h1>

      <section>
        {
        movies.map((movie) => <MovieCard key={movie.key} movie={movie} />)
        }
      </section>
    </div>
  );
}

export default App
