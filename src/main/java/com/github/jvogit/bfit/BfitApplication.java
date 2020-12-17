package com.github.jvogit.bfit;

import java.util.stream.Stream;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import com.github.jvogit.bfit.models.roles.Role;
import com.github.jvogit.bfit.models.roles.RoleName;
import com.github.jvogit.bfit.repository.RoleRepository;

@SpringBootApplication
public class BfitApplication {
    @Autowired
    RoleRepository roleRepository;

    public static void main(String[] args) {
        SpringApplication.run(BfitApplication.class, args);
    }

    @Bean
    InitializingBean sendDatabase() {
        return () -> {
            Stream.of(RoleName.values())
            .forEach(r -> {
                roleRepository.save(new Role(r));
            });
        };
    }
}
