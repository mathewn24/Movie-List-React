import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({children}) => {
    const [favourites, setFavourites] = useState([]);

    useEffect(() => {
        const storedFavs = localStorage.getItem("favourites");

        if (storedFavs) setFavourites(JSON.parse(storedFavs));
    }, []);

    useEffect(() => {
        localStorage.setItem('favourites', JSON.stringify(favourites));
    }, [favourites]);

    const addFav = (movie) => {
        setFavourites(prev => [...prev, movie])
    }

    const remFav = (movieId) => {
        setFavourites(prev => prev.filter(movie => movie.id !== movieId));
    }

    const isFav = (movieId) => {
        return favourites.some(movie => movie.id === movieId);
    }

    const value = {
        favourites, 
        addFav,
        remFav,
        isFav
    }

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}