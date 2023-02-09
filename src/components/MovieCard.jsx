import React from 'react'

const MovieCard = ({movie, deleteMovie, setMovieUpdate, editForm}) => {

  const handleClickEdit = () => {
    setMovieUpdate(movie)
    editForm(movie)
  }

  return (
    <article>
      <h3>{movie.name}</h3>
      <ul>
        <li><span>Genre: </span>{movie.genre}</li>
        <li><span>Duration: </span>{movie.duration} minutes</li>
        <li><span>Release date: </span>{movie.release_date}</li>
      </ul>
      <button onClick={() => deleteMovie(movie.id)} ><i className='bx bx-trash'></i></button>
      <button onClick={handleClickEdit}><i className='bx bx-edit'></i></button>
    </article>
  )
}

export default MovieCard