package com.github.jvogit.bfit.exceptions;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpMediaTypeNotAcceptableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import com.github.jvogit.bfit.exceptions.accounts.BadRequestException;
import com.github.jvogit.bfit.responses.ApiError;

@Order(Ordered.HIGHEST_PRECEDENCE)
@ControllerAdvice
public class RESTExceptionHandler extends ResponseEntityExceptionHandler {
    @Override
    protected ResponseEntity<Object> handleMissingServletRequestParameter(
            MissingServletRequestParameterException ex, HttpHeaders headers, HttpStatus status,
            WebRequest request) {
        return ResponseEntity.badRequest().body(new ApiError(status, ex.getMessage()));
    }
    
    @Override
    protected ResponseEntity<Object> handleHttpMediaTypeNotAcceptable(
            HttpMediaTypeNotAcceptableException ex, HttpHeaders headers, HttpStatus status,
            WebRequest request) {
        return ResponseEntity.badRequest().body(new ApiError(status, ex.getMessage()));
    }
    
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatus status,
            WebRequest request) {
        return ResponseEntity.badRequest().body(new ApiError(status, ex.getMessage()));
    }
    
    @Override
    protected ResponseEntity<Object> handleNoHandlerFoundException(NoHandlerFoundException ex,
            HttpHeaders headers, HttpStatus status, WebRequest request) {
        return ResponseEntity.badRequest().body(new ApiError(status, ex.getMessage()));
    }
    
    @ExceptionHandler(BadRequestException.class)
    protected ResponseEntity<?> handleBadRequest(BadRequestException ex) {
        return ResponseEntity.badRequest().body(new ApiError(HttpStatus.BAD_REQUEST, ex.getMessage()));
    }
    
    @ExceptionHandler(Exception.class)
    protected ResponseEntity<?> handleBadRequest(Exception ex) {
        return ResponseEntity.badRequest().body(new ApiError(HttpStatus.BAD_REQUEST, ex.getMessage()));
    }
}
