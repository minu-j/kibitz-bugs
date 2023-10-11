package com.kibitzbugs.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Arrays;
import java.util.Objects;

@RestControllerAdvice
public class CustomExceptionHandler {

    // 유저 인증 실패
    @ExceptionHandler(AuthenticationServiceException.class)
    public ResponseEntity<ExceptionResponse> handleAuthenticationServiceException(AuthenticationServiceException e) {
        return new ResponseEntity<>(new ExceptionResponse(e.getMessage()), HttpStatus.UNAUTHORIZED);
    }

    // 메소드 에러
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ExceptionResponse> handleHttpRequestMethodNotSupportedException(HttpRequestMethodNotSupportedException e) {
        return new ResponseEntity<>(
                new ExceptionResponse(
                        e.getMethod() + "은/는 지원하지 않는 메소드입니다. "
                        + Arrays.toString(Objects.requireNonNull(e.getSupportedMethods())) + "에서 선택해주세요.")
                , HttpStatus.METHOD_NOT_ALLOWED
        );
    }

    // 유효성 검사 실패
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ExceptionResponse> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        StringBuilder fieldErrors = new StringBuilder();
        for(FieldError fieldError : e.getFieldErrors()) {
            fieldErrors.append(fieldError.getField()).append(", ");
        }
        return new ResponseEntity<>(
                new ExceptionResponse(
                        "[" + fieldErrors.substring(0, fieldErrors.length() - 2) + "]를 수정해주세요."
                ), HttpStatus.BAD_REQUEST
        );
    }
}
