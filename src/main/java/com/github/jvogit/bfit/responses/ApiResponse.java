package com.github.jvogit.bfit.responses;

import org.springframework.http.HttpStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ApiResponse {
    private HttpStatus status;
    private String message;
}
