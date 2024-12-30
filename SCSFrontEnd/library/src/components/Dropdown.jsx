import React, { useState } from "react";
import "./Dropdown.css";
import { useNavigate } from "react-router-dom";

const Dropdown = ({setGenero, defaultValue}) => {

const [isOpen, setIsOpen] = useState(false);
const [placeHolder, setPlaceHolder] = useState("Seleccione un genero");

const toggleDropdown = () => {
setIsOpen(!isOpen);
};

// const closeDropdown = () => {
// setIsOpen(false);
// };

const handleOptionClick = (option) => {
    console.log(`Opción seleccionada: ${option}`);
    setPlaceHolder(option);
    setIsOpen(false);
    setGenero(option);
}


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
<div className="dropdown" >
    <button 
    className="dropdown-btn" 
    onClick={toggleDropdown}
    >
    {defaultValue ? defaultValue : placeHolder}
    </button>
    {isOpen && (
    <div className="dropdown-content">
        {/* <button onClick={ crearLibro } className="dropdown-item">cargar libro</button>
        <button onClick={() => handleOptionClick("Opción 2")} name="Opción 2" className="dropdown-item">Opción 2</button>
        <button onClick={() => handleOptionClick("Opción 3")} name="Opción 3" className="dropdown-item">Opción 3</button> */}
        {genres.map((genre) => 
            (<button onClick={() => 
                handleOptionClick(genre)}
                name={genre} 
                className="dropdown-item"
                >{genre}</button>))}

    </div>
    )}
</div>
);
};

export default Dropdown;
