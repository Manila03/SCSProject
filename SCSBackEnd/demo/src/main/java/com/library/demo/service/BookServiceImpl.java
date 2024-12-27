package com.library.demo.service;

import java.sql.Blob;
import java.util.Base64;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.library.demo.entity.Book;
import com.library.demo.entity.dto.BookRequest;
import com.library.demo.entity.dto.BookResponse;
import com.library.demo.repository.BookRepository;

@Service
public class BookServiceImpl implements BookService {
    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private ImageService imageService;

    // @Autowired
    // private AuthorService authorService;

    @Override
    public Book saveBook(BookRequest bookRequest) {
        Book alreadyExist = bookRepository.findByIsbn(bookRequest.getIsbn());
        // Optional<Author> authorOptional = authorRepository.findByName(bookRequest.getAuthor());
        // Author author = authorOptional.orElseGet(() -> new Author(bookRequest.getAuthor()));
        // Author author = authorService.getOrCreateAuthor(bookRequest.getAuthor());
        
        if (alreadyExist != null) {
            throw new RuntimeException("Book already exist");
        } else {
            Book newBook = new Book();
            newBook.setTitle(bookRequest.getTitle());
            newBook.setAuthor(bookRequest.getAuthor());
            newBook.setDescription(bookRequest.getDescription());
            newBook.setGenre( bookRequest.getGenre());
            newBook.setIsbn(bookRequest.getIsbn());

            return bookRepository.save(newBook);
        } 
    }

    @Override
    public Page<BookResponse> getBooks(PageRequest pageRequest) {
        Page<Book> books = bookRepository.findAll(pageRequest);
        return books.map(book -> {
            BookResponse bookResponse = new BookResponse();
            bookResponse.setTitle(book.getTitle());
            bookResponse.setId(book.getId());
            bookResponse.setAuthor(book.getAuthor());
            bookResponse.setDescription(book.getDescription());
            bookResponse.setGenre(book.getGenre());
            bookResponse.setIsbn(book.getIsbn());
            
            String encodedString;
            try {
                // Obtenemos el objeto Blob de la imagen asociada al libro
                Blob imageBlob = book.getImage().getImage();
                
                // Calculamos el tamaño de la imagen en bytes
                int imageLength = (int) imageBlob.length();
                
                // Extraemos los bytes de la imagen desde el índice 1 hasta el tamaño de la imagen
                byte[] imageBytes = imageBlob.getBytes(1, imageLength);
                
                // Codificamos los bytes de la imagen a formato Base64
                encodedString = Base64.getEncoder().encodeToString(imageBytes);
                
                // Establecemos la imagen codificada en Base64 en el objeto bookResponse
                bookResponse.setImage(encodedString);
            } catch (Exception e) {
                e.printStackTrace();
            }
            return bookResponse;
        });
    }

    @Override
    public BookResponse getBookByTitle(String title) {

        Optional<Book> existingBook = bookRepository.findByTitle(title);
        BookResponse bookResponse = new BookResponse();
        if(existingBook.isPresent()){
            Book book = existingBook.get();
            bookResponse.setTitle(book.getTitle());
            bookResponse.setId(book.getId());
            // bookResponse.setAuthor(book.getAuthor());
            bookResponse.setDescription(book.getDescription());
            bookResponse.setGenre(book.getGenre());
            bookResponse.setIsbn(book.getIsbn());

        String encodedString;
            try {
                // Obtenemos el objeto Blob de la imagen asociada al libro
                Blob imageBlob = book.getImage().getImage();
                
                // Calculamos el tamaño de la imagen en bytes
                int imageLength = (int) imageBlob.length();
                
                // Extraemos los bytes de la imagen desde el índice 1 hasta el tamaño de la imagen
                byte[] imageBytes = imageBlob.getBytes(1, imageLength);
                
                // Codificamos los bytes de la imagen a formato Base64
                encodedString = Base64.getEncoder().encodeToString(imageBytes);
                
                // Establecemos la imagen codificada en Base64 en el objeto bookResponse
                bookResponse.setImage(encodedString);
            } catch (Exception e) {
                e.printStackTrace();
            }
            return bookResponse;
        } else {
            throw new RuntimeException("Libro no encontrado con titulo: " + title);
        }
    }

    // @Override
    // public List<Book> getBooksByAuthor(String author) {
    //     return bookRepository.findByAuthor(author);
    // }

    // @Override
    // public List<Book> getBooksByGenre(String gender) {
    //     return bookRepository.findByGenre(gender);
    // }

    @Override
    public BookResponse updateBook(String isbn, BookRequest bookRequest) {
        Optional<Book> existingBook = bookRepository.findByIsbnPUT(isbn);
        BookResponse bookResponse = new BookResponse();
        if(existingBook.isPresent()){
            Book book = existingBook.get();
            book.setTitle(bookRequest.getTitle());
            bookResponse.setTitle(bookRequest.getTitle());

            book.setDescription(bookRequest.getDescription());
            bookResponse.setDescription(bookRequest.getDescription());

            book.setGenre(bookRequest.getGenre());
            bookResponse.setGenre(bookRequest.getGenre());

            bookResponse.setId(book.getId());
            bookResponse.setAuthor(book.getAuthor());
            bookResponse.setIsbn(book.getIsbn());
        String encodedString;
            try {
                // Obtenemos el objeto Blob de la imagen asociada al libro
                Blob imageBlob = book.getImage().getImage();
                
                // Calculamos el tamaño de la imagen en bytes
                int imageLength = (int) imageBlob.length();
                
                // Extraemos los bytes de la imagen desde el índice 1 hasta el tamaño de la imagen
                byte[] imageBytes = imageBlob.getBytes(1, imageLength);
                
                // Codificamos los bytes de la imagen a formato Base64
                encodedString = Base64.getEncoder().encodeToString(imageBytes);
                
                // Establecemos la imagen codificada en Base64 en el objeto bookResponse
                bookResponse.setImage(encodedString);
            } catch (Exception e) {
                e.printStackTrace();
            }
            bookRepository.save(book);
            return bookResponse;
        } else {
            throw new RuntimeException("Libro no encontrado con isbn: " + isbn);
        }
    }

    @Override
    public Page<BookResponse> getBookByGenre(PageRequest pageRequest, String genre){
        Page<Book> books = bookRepository.findByGenre(genre, pageRequest);
        return books.map(book -> {
            BookResponse bookResponse = new BookResponse();
            bookResponse.setTitle(book.getTitle());
            bookResponse.setId(book.getId());
            bookResponse.setAuthor(book.getAuthor());
            bookResponse.setDescription(book.getDescription());
            bookResponse.setGenre(book.getGenre());
            bookResponse.setIsbn(book.getIsbn());
            
            String encodedString;
            try {
                Blob imageBlob = book.getImage().getImage();
                
                int imageLength = (int) imageBlob.length();
                
                byte[] imageBytes = imageBlob.getBytes(1, imageLength);
                
                encodedString = Base64.getEncoder().encodeToString(imageBytes);
                
                bookResponse.setImage(encodedString);
            } catch (Exception e) {
                e.printStackTrace();
            }
            return bookResponse;
        });
    }

    @Override
    public void deleteBook(String isbn) {
        Book existingBook = bookRepository.findByIsbn(isbn);

        if (existingBook.getImage() != null){
            imageService.deleteImage(existingBook.getImage().getId());
            }
            else {
                bookRepository.delete(existingBook);
            }
    }

    @Override
    public BookResponse getBookByIsbn(String isbn) {
        Book book = bookRepository.findByIsbn(isbn);
        BookResponse bookResponse = new BookResponse();
        bookResponse.setTitle(book.getTitle());
        bookResponse.setId(book.getId());
        // bookResponse.setAuthor(book.getAuthor());
        bookResponse.setDescription(book.getDescription());
        bookResponse.setGenre(book.getGenre());
        bookResponse.setIsbn(book.getIsbn());
        String encodedString;
            try {
                Blob imageBlob = book.getImage().getImage();
                
                int imageLength = (int) imageBlob.length();
                
                byte[] imageBytes = imageBlob.getBytes(1, imageLength);
                
                encodedString = Base64.getEncoder().encodeToString(imageBytes);
                
                bookResponse.setImage(encodedString);
            } catch (Exception e) {
                e.printStackTrace();
            }
            return bookResponse;
        };
    }


