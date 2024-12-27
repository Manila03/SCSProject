import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllBooks, getBooksByGenre, deleteBook } from "../redux/bookSlice";
import Header from "../components/Header";
import Genre from "../components/Genre";
import Book from "../components/Book";
import LoadingSpinner from "../components/LoadingSpinner";
import "./Homepage.css";


const Homepage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isVisible, setIsVisible] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedGenre, setSelectedGenre] = useState(""); 
    const [hasBooks, setHasBooks] = useState(true);

    const { items, loading, error } = useSelector((state) => state.books);

    useEffect(() => {
        if (selectedGenre) {
            console.log("a punto de hacer el dispatch", selectedGenre);
            dispatch(getBooksByGenre({ genre: selectedGenre, page: currentPage, size: 10 }));
        } else {
            dispatch(getAllBooks({ page: currentPage, size: 10 }));
        }
    }, [dispatch, currentPage, selectedGenre]);

    useEffect(() => {
        setHasBooks(items.content.length > 0);
    }, [items.content]);

    const handleGenreSelect = (genre) => {
        console.log("Género seleccionado:", genre); 
        setSelectedGenre(genre);
        setCurrentPage(0); 
    };

    const handleNextPage = () => {
        if (!items.last) setCurrentPage((prev) => prev + 1);
    };

    const handlePrevPage = () => {
        if (!items.first) setCurrentPage((prev) => prev - 1);
    };

    const handleTrashClick = (book) => {
        console.log("Se hizo clic para eliminar:", book);
        setSelectedBook(book);
        setIsVisible(true);
    };
    
    const eliminarLibro = (bookIsbn) => {
        dispatch(deleteBook(bookIsbn))
            .unwrap()
            .then(() => alert(`El libro "${bookIsbn}" fue eliminado correctamente.`))
            .catch(() => alert("Ocurrió un error al eliminar el libro. Intenta nuevamente."));
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <p>Error al cargar los libros: {error}</p>;

    return (
        <>
            <Header />
            <div className="contenedor-principal">
                <Genre onGenreSelect={handleGenreSelect} />
                <section className="contenedor-libros">
                    <div className="libros-lista">
                        {hasBooks ? (
                            items.content.map((book, index) => (
                                <Book
                                    key={index}
                                    title={book.title}
                                    description={book.description}
                                    image={book.image}
                                    onTrashClick={() => handleTrashClick(book)}
                                    onModClick={() => navigate(`/modbook/${book.isbn}`)}
                                />
                            ))
                        ) : (
                            <p className="mensaje-vacio">No se encontraron libros para este género.</p>
                        )}
                    </div>
                    <div className="listaLibros-paginacion-container">
                        <button 
                            className="listaLibros-botonPagina"
                            onClick={handlePrevPage}
                            disabled={items.first}
                        >
                            ←
                        </button>
                        <span>{items.number + 1} de {items.totalPages}</span>
                        <button 
                            className="listaLibros-botonPagina"
                            onClick={handleNextPage}
                            disabled={items.last}
                        >
                            →
                        </button>
                    </div>
                </section>
            </div>
            {isVisible && (
                <div className="modal-eliminar">
                    <p>¿Estás seguro de que deseas eliminar el libro "{selectedBook?.title}"?</p>
                    <button onClick={() => setIsVisible(false)}>Cancelar</button>
                    <button onClick={() => {
                        setIsVisible(false);
                        eliminarLibro(selectedBook.isbn);
                    }}>
                        Confirmar
                    </button>
                </div>
            )}
        </>
    );
};

export default Homepage;