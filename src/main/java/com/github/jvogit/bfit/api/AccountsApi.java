package com.github.jvogit.bfit.api;

import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AccountsApi {
    @GetMapping("/accounts")
    public void getAccounts() {
        LoggerFactory.getLogger(getClass()).info("Hello, world!");
    }
}
