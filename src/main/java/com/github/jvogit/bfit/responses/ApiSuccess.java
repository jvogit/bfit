package com.github.jvogit.bfit.responses;

import org.springframework.http.HttpStatus;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class ApiSuccess extends ApiResponse {
    public ApiSuccess() {
        this("success");
    }
    
    public ApiSuccess(String message) {
        super(HttpStatus.OK, message);
    }
}
