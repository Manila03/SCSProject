import React from "react";
import "./Genre.css";

const Genre = ({ onGenreSelect }) => {
    const genres = [
        "Artes",
        "Ciencias y matemáticas",
        "Deportes",
        "Derecho",
        "Economia",
        "Ficcion",
        "Filosofia y religion",
        "Historia y arqueologia",
        "Infantil y Juvenil",
        "Medicina y salud",
        "Ciencias sociales",
    ];

    return (
        <div className="filtrador-genero">
            <h2>Buscar por género</h2>
            <ul className="lista-genero">
                {genres.map((genre) => (
                    <li 
                        key={genre} 
                        className="genero"
                        onClick={() => onGenreSelect(genre)} 
                    >
                        {genre}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Genre;


