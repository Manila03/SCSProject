package com.library.demo.entity.dto;

import lombok.Data;

@Data
public class BookRequest { //sin la imagen
    private String isbn;

    private String title;

    private String author;

    private String genre;
    
    private String description;
}
