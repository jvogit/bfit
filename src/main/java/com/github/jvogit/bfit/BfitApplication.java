package com.github.jvogit.bfit;

import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import com.github.jvogit.bfit.models.roles.Role;
import com.github.jvogit.bfit.models.roles.RoleName;
import com.github.jvogit.bfit.payloads.accounts.SignUpRequest;
import com.github.jvogit.bfit.repository.RoleRepository;
import com.github.jvogit.bfit.repository.UserRepository;
import com.github.jvogit.bfit.services.UserService;
import lombok.extern.slf4j.Slf4j;

@SpringBootApplication
@Slf4j
public class BfitApplication {
    @Autowired
    private RoleRepository roleRepository;
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private UserRepository userRepository;
    
    public static void main(String[] args) {
        SpringApplication.run(BfitApplication.class, args);
    }

    @Bean
    InitializingBean saveDefaultRoles() {
        return () -> {
            Stream.of(RoleName.values())
                    .forEach(r -> {
                        if(roleRepository.findByName(r).isEmpty()) {
                            log.info("Saving {}", r.name());
                            roleRepository.save(new Role(r));
                        }
                    });
            addAdminUser();
        };
    }
    
    void addAdminUser() {
        var admin = new SignUpRequest("Joe Admin", "admin123", "admin@bfit.com", "admin123");
        var user = userService.createUser(admin);
        Set<Role> roles = Stream.of(RoleName.values())
                .map(r -> roleRepository.findByName(r).get())
                .collect(Collectors.toSet());
        user.setRoles(roles);
        userRepository.save(user);
    }
}
