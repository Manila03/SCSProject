import React from 'react'
import Logo from '../assets/SilverLibrary.png'
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import './Header.css';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const crearLibro = () => {
        navigate('/newbook');
    }

    const goToHomepage = () => {
        navigate("/");
        window.location.reload();
    };

    return (
        <>
        <div className="encabezado-principal">
            <div className="contenedor-superior">
                <div className="contenedor-logo">
                    <img src={Logo} alt="Logo" className="logo-imagen" onClick={ goToHomepage}/>
                </div>
                
                {/* Barra de búsqueda */}
                {/* <div className="contenedor-busqueda">
                    <div className="barra-busqueda">
                        <input
                            type="text"
                            placeholder="Ingresar título, autor, ISBN, palabra clave o género"
                            className="campo-busqueda"
                        />
                        <Dropdown/>
                        <button className="boton-buscar">
                            <Search className="icono-buscar" />
                        </button>
                    </div>
                </div> */}

                
                
            </div>
            
            <nav className="barra-navegacion">
                <div className="contenedor-menu">
                    
                    <ul className="lista-menu">
                        <li className="item-menu" onClick={ goToHomepage }>Catálogo</li>
                        <li className="item-menu" onClick={ crearLibro } > Cargar Libros </li>
                    </ul>
                </div>
            </nav>
        </div>
        </>
    );
};

export default Header;