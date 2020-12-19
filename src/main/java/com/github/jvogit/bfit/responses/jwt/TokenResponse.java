package com.github.jvogit.bfit.responses.jwt;

import lombok.Data;

@Data
public class TokenResponse {
    private final String token;
    private final String type = "Bearer";
}
