package com.github.jvogit.bfit.services;

import javax.validation.constraints.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.github.jvogit.bfit.exceptions.accounts.UserServiceException;
import com.github.jvogit.bfit.models.accounts.User;
import com.github.jvogit.bfit.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;
    
    public void createUser(User user) throws UserServiceException {
        if (exists(user)) throw new UserServiceException("User already exists!");
        userRepository.save(user);
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
