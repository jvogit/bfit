package com.github.jvogit.bfit.services;

import java.util.Collections;
import java.util.Set;
import javax.transaction.Transactional;
import javax.validation.constraints.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.github.jvogit.bfit.exceptions.accounts.BadRequestException;
import com.github.jvogit.bfit.jwt.JwtTokenProvider;
import com.github.jvogit.bfit.models.accounts.User;
import com.github.jvogit.bfit.models.roles.Role;
import com.github.jvogit.bfit.models.roles.RoleName;
import com.github.jvogit.bfit.payloads.accounts.LoginBody;
import com.github.jvogit.bfit.payloads.accounts.SignUpBody;
import com.github.jvogit.bfit.repository.RoleRepository;
import com.github.jvogit.bfit.repository.UserRepository;
import com.github.jvogit.bfit.responses.accounts.LoginResponse;

@Service
@Transactional 
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private PasswordEncoder pwdEncoder;

    public User createUser(SignUpBody request) throws BadRequestException {
        User user = new User(request.getName(), request.getUsername(), request.getEmail(),
                pwdEncoder.encode(request.getPassword()));
        Set<Role> roles = Collections.singleton(roleRepository.findByName(RoleName.ROLE_USER)
                .orElseThrow(() -> new BadRequestException("Unable to add default role!")));
        user.setRoles(roles);
        
        if (exists(user))
            throw new BadRequestException("User already exists!");
        
        userRepository.save(user);
        
        return user;
    }
    
    public LoginResponse authenticate(LoginBody request) {
        Authentication auth = authManager.authenticate(new UsernamePasswordAuthenticationToken(
                request.getUsername(), request.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(auth);

        return new LoginResponse(auth.getPrincipal(), jwtTokenProvider.generateToken(auth));
    }

    public boolean exists(User user) {
        return existsByUsername(user.getUsername()) || existsByEmail(user.getEmail());
    }

    public boolean existsByUsername(String name) {
        return userRepository.existsByUsername(name);
    }

    public boolean existsByEmail(@Email String email) {
        return userRepository.existsByEmail(email);
    }

}
