import React, { useState, useRef, useEffect } from "react";
import "./BookForm.css";
import { createBook } from "../redux/bookSlice";
import { postImagen } from "../redux/imageSlice";
import { useDispatch, useSelector} from "react-redux";
import Dropdown from "./Dropdown";

const BookForm = () => {
    const imagenRef = useRef(null);
    const [titulop, setTitulo] = useState("")
    const [descripcionp, setDescripcion] = useState("")
    const [isbnp, setIsbn] = useState("");
    const [generop, setGenero] = useState("");
    const [autorp, setAutor] = useState("");
    const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
    const [publicacionLista, setPublicacionLista] = useState(false);
    const [libroNuevo, setLibroNuevo] = useState(null);
    const [errorImagen, setErrorImagen] = useState(false);

    const handleImagenChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagenSeleccionada(file);
            setErrorImagen(false);
        }
    };

    const validarIsbn = (isbn) => {
        const isbnPattern = /^[0-9]+$/; // solo numeros
        return isbnPattern.test(isbn);
    };

    const manejarPublicar = async () => {

        if (!titulop || !descripcionp || !isbnp || !generop || !autorp) {
            alert("Por favor, complete todos los campos.");
            return;
        }
        if (!validarIsbn(isbnp)) {
            alert("El ISBN debe contener solo números.");
            return;
        }

        if (!imagenSeleccionada) {
            setErrorImagen(true);
            return;
        }

        const libroData= {
            isbn: isbnp,
            title: titulop,
            author: autorp,
            description: descripcionp,
            genre: generop,
        }
        setLibroNuevo(libroData)
        setPublicacionLista(true)
    }

    const dispatch = useDispatch()
    const {items, loading, error} = useSelector((state)=> state.books)

    useEffect(()=>{
        if (publicacionLista){
            dispatch(createBook(libroNuevo))
            .unwrap()
            .then(async (data) => {
            console.log("Libro creado:", data);
            const formData = new FormData();
            formData.append("name", titulop);
            formData.append("isbn", isbnp);
            formData.append("genre", generop);
            formData.append("description", descripcionp);
            formData.append("author", autorp);
            formData.append("file", imagenSeleccionada);
            await dispatch(postImagen(formData)).unwrap();
            alert("Libro publicado exitosamente");
            setGenero("");
            setTitulo("");
            setDescripcion("");
            setAutor("");
            setIsbn("");
            setImagenSeleccionada(null);
        })
        setLibroNuevo(null)
        setPublicacionLista(false)
        }
        }, [publicacionLista, dispatch])

        if (error) return <p>Error al cargar las publicaciones: {error}</p>

    return (
            <div className="PublicarLibro-contenedor">
                <div className="PublicarLibro-book-image" onClick={() => imagenRef.current.click()}> 
                <img src={imagenSeleccionada ? URL.createObjectURL(imagenSeleccionada) : "ruta_a_la_imagen"} alt="Click aquí para seleccionar una imagen" />
                </div>
                <input
                type="file"
                className="PublicarLibro-input-field"
                accept="image/*"
                onChange={handleImagenChange}
                ref={imagenRef}
                style={{ display: 'none' }}
                />

                

            <div className="PublicarLibro-book-detalles">
                <label className="PublicarLibro-label">Título:</label>
                <input
                    type="text"
                    className="PublicarLibro-input-field"
                    placeholder="Título..."
                    value={titulop}
                    onChange={(e) => setTitulo(e.target.value)}
                />

                <label className="PublicarLibro-label">Genero:</label>  
                <Dropdown setGenero={setGenero}/>
                {/* {generop && <p>Genero seleccionado: {generop}</p>} */}

                <label className="PublicarLibro-label">Autor:</label>
                <input
                    type="text"
                    className="PublicarLibro-input-field"
                    placeholder="Autor..."
                    value={autorp}
                    onChange={(e) => setAutor(e.target.value)}
                />

                <label className="PublicarLibro-label">Descripción:</label>
                <textarea
                    className="PublicarLibro-textarea-field"
                    placeholder="Sinopsis..."
                    value={descripcionp}
                    onChange={(e) => setDescripcion(e.target.value)}
                />
                
                <label className="PublicarLibro-label">ISBN:</label>
                <input
                    type="text"
                    className="PublicarLibro-input-field"
                    placeholder="ISBN..."
                    value={isbnp}
                    onChange={(e) => setIsbn(e.target.value)}
                />
                
                

                
                {/* <input
                    type="text"
                    className="PublicarLibro-input-field"
                    placeholder="Autor..."
                    value={autorp}
                    onChange={(e) => setAutor(e.target.value)}
                /> */}
                
                {errorImagen && (
                <p className="error-mensaje">Selecciona una imagen antes de publicar.</p>
                )}

                <button className="PublicarLibro-boton-publicar" onClick={manejarPublicar}>
                    Publicar
                </button>
                </div>
            </div>

    );
    };
    

export default BookForm;
