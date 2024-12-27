import React from 'react'
import BookForm from '../components/BookForm'
import Logo from '../assets/SilverLibrary.png';
import { Search, Heart, ShoppingCart } from 'lucide-react';
import Dropdown from '../components/Dropdown';
import { useNavigate } from "react-router-dom";
import './NewBook.css';
import Header from '../components/Header.jsx';
    
    const NewBook = () => {
        const Navigate = useNavigate();
        const crearLibro = () => {
            Navigate('/newbook');
        }
            return (
                <> 
                
                <Header/>
            
                <BookForm/>
                    
                </>
            )
}

export default NewBook