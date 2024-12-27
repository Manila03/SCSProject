package com.library.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.library.demo.entity.Book;
import com.library.demo.entity.dto.BookRequest;
import com.library.demo.entity.dto.BookResponse;
import com.library.demo.service.BookService;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true", allowedHeaders = "*")
@RequestMapping("book")
public class BookController {
    @Autowired
    private BookService bookService;

    @GetMapping("/title/{title}")
    public ResponseEntity<BookResponse> getBookByTitle(@PathVariable String title) {
        return ResponseEntity.ok(bookService.getBookByTitle(title));
    }
    
    @PostMapping("/create")
    public ResponseEntity<Book> postBook(@RequestBody BookRequest bookRequest) {
        return ResponseEntity.ok(bookService.saveBook(bookRequest));
    }

    @GetMapping("/isbn/{isbn}")
    public ResponseEntity<BookResponse> getBookByIsbn(@PathVariable String isbn) {
        return ResponseEntity.ok(bookService.getBookByIsbn(isbn));
    }
    
    @GetMapping("/all")
    public ResponseEntity<Page<BookResponse>> getBooks(
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size) {
        if (page == null || size == null)
            return ResponseEntity.ok(bookService.getBooks(PageRequest.of(0, Integer.MAX_VALUE)));
        return ResponseEntity.ok(bookService.getBooks(PageRequest.of(page, size)));
    }

    @GetMapping("/genre/{genre}")
    public ResponseEntity<Page<BookResponse>> getBooksByGenre(
        @RequestParam(required = false) Integer page,
        @RequestParam(required = false) Integer size,
        @PathVariable String genre) {
        if (page == null || size == null)
            return ResponseEntity.ok(bookService.getBookByGenre(PageRequest.of(0, Integer.MAX_VALUE), genre));
        return ResponseEntity.ok(bookService.getBookByGenre(PageRequest.of(page, size), genre));
    }

    @PutMapping("/mod/{isbn}")
    public ResponseEntity<BookResponse> updateBook(@PathVariable String isbn, @RequestBody BookRequest bookRequest){
        return ResponseEntity.ok(bookService.updateBook(isbn, bookRequest));
    }

    @DeleteMapping("/delete/{isbn}")
    public void deleteBook(@PathVariable String isbn) {
        System.out.println(isbn);
        bookService.deleteBook(isbn);
    }
}