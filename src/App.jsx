import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import './App.css'
import MovieCard from './components/MovieCard'


//URL BASE de la API
const URL_BASE = "https://movies-crud-2.academlo.tech/"

function App() {
  //Estado que almacena las peliculas que tengamos en la base de datos
  const [movies, setMovies] = useState([])
  //Estado que almacena la pelicula que se vaya a editar
  const [movieUpdate, setMovieUpdate] = useState()

  //Instancia del hook useRef para posterior referenciar con el <form />
  const form = useRef()  

  //Funcion que se ejecuta cuando ocurre el onSubmit del <form />
  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      name: e.target.name.value,
      genre: e.target.genre.value,
      duration: e.target.duration.value,
      release_date: e.target.release.value
    }
    if(movieUpdate){
      updateMovie(data)
      setMovieUpdate()
    } else {
      createMovie(data)
    }
    e.target.reset()
  }

  //Funciona que recibe la data con la que se crea una nueva pelicula, la crea y vuelve a obtener todas las peliculas
  const createMovie = (data) => {
    axios.post(`${URL_BASE}movies/`, data)
    .then(() => getAllMovies())
    .catch((err) => console.log(err))
  }

  //Funcion que permite obtener toas las peliculas y enviarlas al estado movies
  const getAllMovies = () => {
    axios.get(`${URL_BASE}movies/`)
    .then((res) => setMovies(res.data))
    .catch((err) => console.log(err))
  }

  //Función que recibe el id de la pelicula que se vaya a eliminar, la elimina y obtiene de nuevo todas las peliculas
  const deleteMovie = (id) => {
    axios.delete(`${URL_BASE}movies/${id}/`)
    .then(() => getAllMovies())
    .catch((err) => console.log(err))
  }

  //Funcion que recibe la nueva data para actualizar la pelicula, actualzia la pelicula y obtiene todas las peliculas
  const updateMovie = (data) => {
    axios.patch(`${URL_BASE}movies/${movieUpdate.id}/`, data)
    .then(() => getAllMovies())
    .catch((err) => console.log(err))
  }

  //Función que se ejecuta cuando se da click en el botón de edit, para montar la información en el formulario
  const editForm = (data) => {
    console.log(data)
    form.current.name.value = data.name
    form.current.genre.value = data.genre
    form.current.duration.value = data.duration
    form.current.release.value = data.release_date
  }

  //Efecto que se ejecuta al renderizarse la aplicación y obtiene todas las peliculas
  useEffect(() => {
    getAllMovies()
  }, [])

  return (
    <div className="App">
      <h1>Movies App</h1>

      <form  ref={form} onSubmit={handleSubmit}>
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
        <button>{movieUpdate ? 'update' : 'create'}</button>
      </form>

      <section>
        {
        movies.map(movie => <MovieCard key={movie.id} deleteMovie={deleteMovie} movie={movie} setMovieUpdate={setMovieUpdate} editForm={editForm} />)
        }
      </section>
    </div>
  );
}

export default App
