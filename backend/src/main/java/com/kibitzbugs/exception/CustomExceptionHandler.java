package com.kibitzbugs.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class CustomExceptionHandler {

    @ExceptionHandler(AuthenticationServiceException.class)
    public ResponseEntity<ExceptionResponse> handleAuthenticationServiceException(AuthenticationServiceException e) {
        return new ResponseEntity<>(new ExceptionResponse(e.getMessage()), HttpStatus.UNAUTHORIZED);
    }

}
