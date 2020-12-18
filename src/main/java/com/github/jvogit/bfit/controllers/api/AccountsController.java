package com.github.jvogit.bfit.controllers.api;

import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.github.jvogit.bfit.models.accounts.User;
import com.github.jvogit.bfit.payloads.accounts.SignUpRequest;
import com.github.jvogit.bfit.repository.UserRepository;
import com.github.jvogit.bfit.responses.ApiResponse;
import com.github.jvogit.bfit.responses.accounts.UserAvailability;
import com.github.jvogit.bfit.services.UserService;

@RestController
@RequestMapping("/api/accounts")
public class AccountsController {
    
    @Autowired
    AuthenticationManager authManager;
    
    @Autowired
    PasswordEncoder pwdEncoder;
    
    @Autowired
    UserService userService;
    
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignUpRequest body) {
        User user = new User(body.getName(), body.getUsername(), body.getEmail(), pwdEncoder.encode(body.getPassword()));
        
        userService.createUser(user);
        
        return ResponseEntity.ok(new ApiResponse(HttpStatus.OK, "Registration success!"));
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody String string) {
        Authentication auth = authManager.authenticate(new UsernamePasswordAuthenticationToken(null, null));
        
        SecurityContextHolder.getContext().setAuthentication(auth);
        
        return ResponseEntity.ok(null);
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
}
