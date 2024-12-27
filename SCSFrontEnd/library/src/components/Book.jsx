import React from "react";
import "./Book.css";
import { Trash, Edit } from "lucide-react";
const Book = ({ title, description, image, onTrashClick, onModClick}) => {
    
    const imageSrc = image ? `data:image/jpeg;base64,${image}` : 'default-image-path.jpg';
    return (
        <div className="book-card">
            <h1>{title}</h1>
            <p>{description}</p>
            <img className="homepage-libro-img" src={imageSrc} alt="Imagen" />
            <div className="icon-container">
                <Trash size={24} className="icon trash-icon" onClick={ onTrashClick }/>
                <Edit size={24} className="icon edit-icon" onClick={onModClick}/>
            </div>
        </div>
    );
};

export default Book;
