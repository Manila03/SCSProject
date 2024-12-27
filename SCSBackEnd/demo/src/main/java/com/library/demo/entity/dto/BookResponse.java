package com.library.demo.entity.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookResponse { //con la imagen
    private Long id;

    private String title;

    private String image;

    private String isbn;

    private String author;

    private String genre;
    
    private String description;

}