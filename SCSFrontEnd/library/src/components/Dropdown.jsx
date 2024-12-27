import React, { useState } from "react";
import "./Dropdown.css";
import { useNavigate } from "react-router-dom";

const Dropdown = () => {

const [isOpen, setIsOpen] = useState(false);

const navigate = useNavigate();

const toggleDropdown = () => {
setIsOpen(!isOpen);
};

const closeDropdown = () => {
setIsOpen(false);
};

const handleOptionClick = (option) => {
    console.log(`Opción seleccionada: ${option}`);
}

const crearLibro = () => {
    navigate("/newbook");
}

return (
<div className="dropdown" onMouseLeave={closeDropdown}>
    <button 
    className="dropdown-btn" 
    onMouseEnter={toggleDropdown}
    >
    Buscar por:
    </button>
    {isOpen && (
    <div className="dropdown-content">
        <button onClick={ crearLibro } className="dropdown-item">cargar libro</button>
        <button onClick={() => handleOptionClick("Opción 2")} name="Opción 2" className="dropdown-item">Opción 2</button>
        <button onClick={() => handleOptionClick("Opción 3")} name="Opción 3" className="dropdown-item">Opción 3</button>
    </div>
    )}
</div>
);
};

export default Dropdown;
