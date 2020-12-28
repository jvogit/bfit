package com.github.jvogit.bfit;

import java.time.LocalDate;
import java.util.Collections;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import com.github.jvogit.bfit.models.accounts.User;
import com.github.jvogit.bfit.models.records.CalorieRecord;
import com.github.jvogit.bfit.models.records.calorie.CalorieItem;
import com.github.jvogit.bfit.models.roles.Role;
import com.github.jvogit.bfit.models.roles.RoleName;
import com.github.jvogit.bfit.payloads.accounts.SignUpBody;
import com.github.jvogit.bfit.repository.CalorieRecordRepository;
import com.github.jvogit.bfit.repository.RoleRepository;
import com.github.jvogit.bfit.repository.UserRepository;
import com.github.jvogit.bfit.services.UserService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class InitialActions {
    @Autowired
    private RoleRepository roleRepository;
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private CalorieRecordRepository calorieRecordRepository;
    
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
            User user = addAdminUser();
            addCalorieRecords(user.getId());
        };
    }
    
    User addAdminUser() {
        var admin = new SignUpBody("Joe Admin", "admin123", "admin@bfit.com", "admin123");
        var user = userService.createUser(admin);
        Set<Role> roles = Stream.of(RoleName.values())
                .map(r -> roleRepository.findByName(r).get())
                .collect(Collectors.toSet());
        user.setRoles(roles);
        userRepository.save(user);
        
        return user;
    }
    
    void addCalorieRecords(Long user_id) {
        CalorieItem item1 = new CalorieItem("Apple", 100), item2 = new CalorieItem("Banana", 200);
        CalorieRecord record = new CalorieRecord(user_id, LocalDate.of(2020, 12, 28), Collections.emptySet());
        record.addItem(item1);
        record.addItem(item2);
        
        calorieRecordRepository.save(record);
    }
}
