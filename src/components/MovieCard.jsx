import React from 'react'

const MovieCard = ({movie}) => {
  return (
    <article>
      <h3>{movie.name}</h3>
      <ul>
        <li><span>Genre: </span>{movie.genre}</li>
        <li><span>Duration: </span>{movie.duration} minutes</li>
        <li><span>Release date: </span>{movie.release_date}</li>
      </ul>
    </article>
  )
}

export default MovieCard