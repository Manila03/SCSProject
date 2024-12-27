package com.library.demo.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import com.library.demo.entity.Book;
import com.library.demo.entity.dto.BookRequest;
import com.library.demo.entity.dto.BookResponse;

public interface BookService {
    public Book saveBook(BookRequest bookRequest);

    BookResponse getBookByTitle(String title);

    BookResponse getBookByIsbn(String isbn);

    Page<BookResponse> getBookByGenre(PageRequest pageRequest, String genre);

    Page<BookResponse> getBooks(PageRequest pageRequest);

    BookResponse updateBook(String isbn, BookRequest bookRequest);

    void deleteBook(String isbn);
    
}
