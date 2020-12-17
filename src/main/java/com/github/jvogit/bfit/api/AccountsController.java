package com.github.jvogit.bfit.api;

import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.github.jvogit.bfit.models.accounts.User;
import com.github.jvogit.bfit.payloads.ApiResponse;
import com.github.jvogit.bfit.payloads.accounts.SignUpRequest;
import com.github.jvogit.bfit.repository.UserRepository;

@RestController
@RequestMapping("/api/accounts")
public class AccountsController {
    
    @Autowired
    AuthenticationManager authManager;
    
    @Autowired
    PasswordEncoder pwdEncoder;
    
    @Autowired
    UserRepository userRepo;
    
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignUpRequest body) {
        
        User user = new User(body.getName(), body.getUsername(), body.getEmail(), pwdEncoder.encode(body.getPassword()));
        
        userRepo.save(user);
        
        return ResponseEntity.ok(new ApiResponse(true, "Registration success!"));
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody String string) {
        Authentication auth = authManager.authenticate(new UsernamePasswordAuthenticationToken(null, null));
        
        SecurityContextHolder.getContext().setAuthentication(auth);
        
        return ResponseEntity.ok(null);
    }
}
