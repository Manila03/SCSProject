package com.library.demo.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Entity
@Data
public class Book {
    public Book() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column
    private String title;

    // @ManyToOne
    // @JoinColumn(name = "author_id", nullable = false)
    // @JsonBackReference
    // private Author author;
    @Column
    private String author;

    @Column
    private String isbn;

    @OneToOne
    @JoinColumn(name = "image_id", nullable = true)
    @JsonManagedReference
    private Image image;

    @Column
    private String description;

    @Column
    private String genre;
}