package com.github.jvogit.bfit.responses;

import org.springframework.http.HttpStatus;
import lombok.Data;

@Data
public class ApiError extends ApiResponse {
    
    public ApiError(HttpStatus status, String message) {
        super(status, message);
    }
    
}
