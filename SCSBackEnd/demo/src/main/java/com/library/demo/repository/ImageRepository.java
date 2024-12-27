package com.library.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.library.demo.entity.Image;


@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {

}