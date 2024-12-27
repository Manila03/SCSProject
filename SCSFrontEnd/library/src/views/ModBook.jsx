import React, { useState, useEffect } from "react";
import "./ModBook.css";
import { updateBook, getBookByIsbn } from "../redux/bookSlice";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";

const ModBook = () => {
    const { isbn } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [titulop, setTitulo] = useState("");
    const [descripcionp, setDescripcion] = useState("");
    const [generop, setGenero] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imagen, setImagen] = useState("");

    const { book, loading, error } = useSelector((state) => state.books);

    useEffect(() => {
        dispatch(getBookByIsbn(isbn));
    }, [dispatch, isbn]);

    useEffect(() => {
        if (book) {
            setTitulo(book.title || "");
            setDescripcion(book.description || "");
            setGenero(book.genre || "");
            setImagen(book.image ? `data:image/jpeg;base64,${book.image}` : '/images/default-book.jpg');
        }
    }, [book]);

    const manejarActualizar = async () => {
        if (isSubmitting) return;
        
        setIsSubmitting(true);
        
        const bookData = {
            isbn,
            title: titulop,
            description: descripcionp,
            genre: generop,
        };

        try {
            await dispatch(updateBook({ 
                isbn, 
                book: bookData 
            })).unwrap();
            
            alert("Libro actualizado exitosamente.");
            navigate("/");
        } catch (error) {
            console.error("Error al actualizar el libro:", error);
            alert("Ocurrió un error al actualizar el libro.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const onCancel = () => {
        navigate("/");
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <Header /> 
            <div className="ActualizarLibro-contenedor">
                <div className="ActualizarLibro-book-image">
                    <img src={imagen} alt="imagen" />
                </div>
                <div className="ActualizarLibro-book-detalles">
                    <label className="ActualizarLibro-label">Título:</label>
                    <input
                        type="text"
                        className="ActualizarLibro-input-field"
                        placeholder="Título..."
                        value={titulop}
                        onChange={(e) => setTitulo(e.target.value)}
                    />
                    <label className="ActualizarLibro-label">Descripción:</label>
                    <textarea
                        className="ActualizarLibro-textarea-field"
                        placeholder="Sinopsis..."
                        value={descripcionp}
                        onChange={(e) => setDescripcion(e.target.value)}
                    />
                    <label className="ActualizarLibro-label">ISBN:</label>
                    <input
                        type="text"
                        className="ActualizarLibro-input-field"
                        value={isbn}
                        disabled
                    />
                    <label className="ActualizarLibro-label">Género:</label>
                    <input
                        type="text"
                        className="ActualizarLibro-input-field"
                        placeholder="Género..."
                        value={generop}
                        onChange={(e) => setGenero(e.target.value)}
                    />
                    <button
                        className="ActualizarLibro-boton-publicar"
                        onClick={manejarActualizar}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Actualizando..." : "Actualizar"}
                    </button>
                    <button
                        className="ActualizarLibro-boton-cancelar"
                        onClick={onCancel}
                        disabled={isSubmitting}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </>
    );
};

export default ModBook;