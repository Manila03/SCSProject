package com.library.demo.controller.images;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ImageResponse {
    private Long id;
    private String file;
}