package com.realshield.platform.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;


@Data
//this annotation is for making the object creation clean
@Builder
public class ApiResponse<T>{
    private boolean success;
    private String message;
    private T data;
    private ApiError error;
    private LocalDateTime timestamp;
    private String path;

    public static <T> ApiResponse<T> success(String message, T data) {
        return ApiResponse.<T>builder()
                .success(true)
                .message(message)
                .data(data)
                .timestamp(LocalDateTime.now())
                .build();
    }

    public static <T> ApiResponse<T> failure(String message) {
        return ApiResponse.<T>builder()
                .success(false)
                .message(message)
                .data(null)
                .timestamp(LocalDateTime.now())
                .build();
    }


}
