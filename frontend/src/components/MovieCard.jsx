import '../css/MovieCard.css'
import { useMovieContext } from '../context/MovieContext'

function MovieCard({movie}) {
    const {isFav, addFav, remFav} = useMovieContext();

    const favourite = isFav(movie.id);

    function addFavourite(e) {
        e.preventDefault();
        if (favourite) {
            remFav(movie.id);
        } else {
            addFav(movie);
        }
    }

    return (
        <div className="movie-card">
            <div className="movie-poster">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
                <div className="movie-overlay">
                    <button className={ `favourite-btn ${favourite ? "active" : ""}`} onClick={addFavourite}>
                    ♥
                    </button>
                </div>
            </div>
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.release_date?.split("-")[0]}</p>
            </div>
        </div>
    )
}

export default MovieCard