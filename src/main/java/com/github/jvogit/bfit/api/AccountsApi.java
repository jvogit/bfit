package com.github.jvogit.bfit.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AccountsApi {
    @GetMapping("/register")
    public void getAccounts() {
        
    }
}
