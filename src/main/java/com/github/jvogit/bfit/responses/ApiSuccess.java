package com.github.jvogit.bfit.responses;

import org.springframework.http.HttpStatus;
import lombok.Data;

@Data
public class ApiSuccess extends ApiResponse {
    public ApiSuccess(String message) {
        super(HttpStatus.OK, message);
    }
}
