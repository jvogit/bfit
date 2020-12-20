package com.github.jvogit.bfit.responses.accounts;

import com.github.jvogit.bfit.jwt.JwtUserPrincipal;
import com.github.jvogit.bfit.responses.jwt.TokenResponse;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class LoginResponse extends TokenResponse {
    private Object user;
    
    public LoginResponse(Object user, String token) {
        super(token);
        this.user = user;
    }
}
