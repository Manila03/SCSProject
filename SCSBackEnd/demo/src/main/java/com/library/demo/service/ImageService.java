package com.library.demo.service;
import org.springframework.stereotype.Service;

import com.library.demo.entity.Image;

@Service
public interface ImageService {
    public Image create(Image image, String isbn);
    public Image viewById(long id);
    public String deleteImage(long id);
}