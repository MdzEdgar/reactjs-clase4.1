import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import MovieCard from './components/MovieCard'

function App() {
  const [movies, setMovies] = useState([])

  const URL_BASE = "https://movies-crud-2.academlo.tech/"

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      name: e.target.name.value,
      genre: e.target.genre.value,
      duration: e.target.duration.value,
      release_date: e.target.release.value
    }
    createMovie(data)
    e.target.reset()
  }

  const createMovie = (data) => {
    axios.post(`${URL_BASE}movies/`, data)
    .then(() => getAllMovies())
    .catch((err) => console.log(err))
  }

  const getAllMovies = () => {
    axios.get(`${URL_BASE}movies/`)
    .then((res) => setMovies(res.data))
    .catch((err) => console.log(err))
  }

  const deleteMovie = (id) => {
    axios.delete(`${URL_BASE}movies/${id}/`)
    .then((res) => getAllMovies(res.data))
    .catch((err) => console.log(err))
  }

  useEffect(() => {
    getAllMovies()
  }, [])

  return (
    <div className="App">
      <h1>Movies App</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:<span>*</span></label>
          <input id='name' type="text" />
        </div>
        <div>
          <label>Genre:<span>*</span></label>
          <input id="genre" type="text" />
        </div>
        <div>
          <label>Duration (min):<span>*</span></label>
          <input id='duration' type="number" />
        </div>
        <div>
          <label>Release date:<span>*</span></label>
          <input id='release' type="date" />
        </div>
        <button>Create</button>
      </form>

      <section>
        {
        movies.map(movie => <MovieCard key={movie.id} deleteMovie={deleteMovie} movie={movie} />)
        }
      </section>
    </div>
  );
}

export default App
