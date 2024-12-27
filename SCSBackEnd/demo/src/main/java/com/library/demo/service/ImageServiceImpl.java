package com.library.demo.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.library.demo.entity.Book;
import com.library.demo.entity.Image;
import com.library.demo.repository.BookRepository;
import com.library.demo.repository.ImageRepository;

@Service
public class ImageServiceImpl implements ImageService {
    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private BookRepository bookRepository;

    @Override
    public Image create(Image image, String isbn) {
        Book book = bookRepository.findByIsbn(isbn);
        image.setBook(book);
        book.setImage(image);
        return imageRepository.save(image);
    }

    @Override
    public Image viewById(long id) {
        return imageRepository.findById(id).get();
    }

    @Override
    public String deleteImage(long id) {
        Optional<Image> image = imageRepository.findById(id);
        if (image.isPresent()){
            imageRepository.deleteById(id);
            return ("Imagen eliminada correctamente");
        }
        else {
            return("No se encontro la imagen");
        }
        
    }
    
}
