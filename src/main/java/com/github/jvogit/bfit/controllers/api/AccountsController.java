package com.github.jvogit.bfit.controllers.api;

import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.github.jvogit.bfit.jwt.JwtUserPrincipal;
import com.github.jvogit.bfit.payloads.accounts.LoginRequest;
import com.github.jvogit.bfit.payloads.accounts.SignUpRequest;
import com.github.jvogit.bfit.responses.ApiResponse;
import com.github.jvogit.bfit.responses.accounts.LoginResponse;
import com.github.jvogit.bfit.responses.accounts.UserAvailability;
import com.github.jvogit.bfit.responses.jwt.TokenResponse;
import com.github.jvogit.bfit.services.UserService;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/accounts")
@Slf4j
public class AccountsController {
    
    @Autowired
    private UserService userService;
    
    @PostMapping("/signup")
    public ApiResponse signup(@Valid @RequestBody SignUpRequest body) {
        userService.createUser(body);
        
        return new ApiResponse(HttpStatus.OK, "Registration success!");
    }
    
    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest body) {
        return userService.authenticate(body);
    }
    
    @GetMapping("/checkUsername")
    public UserAvailability checkUsername(@RequestParam(required = true) String username) {
        UserAvailability responseAvailability = new UserAvailability(!userService.existsByUsername(username));
        
        return responseAvailability;
    }
    
    @GetMapping("/checkEmail")
    public UserAvailability checkEmail(@RequestParam(required = true) String email) {
        UserAvailability responseAvailability = new UserAvailability(!userService.existsByEmail(email));
        
        return responseAvailability;
    }
    
    @GetMapping("/me")
    public JwtUserPrincipal me(@AuthenticationPrincipal JwtUserPrincipal userPrincipal) {
        log.info("Received!");
        return userPrincipal;
    }
}
