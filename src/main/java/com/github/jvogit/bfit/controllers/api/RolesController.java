package com.github.jvogit.bfit.controllers.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.github.jvogit.bfit.models.roles.Role;
import com.github.jvogit.bfit.models.roles.RoleName;
import com.github.jvogit.bfit.repository.RoleRepository;

@RestController
@RequestMapping("/api/roles")
public class RolesController {
    @Autowired
    RoleRepository roleRepository;
    
    @GetMapping("/find")
    public ResponseEntity<?> find(@RequestParam(required = true) String name) {
        Role role = roleRepository.findByName(RoleName.valueOf(name)).orElse(null);
        
        return ResponseEntity.ok(role);
    }
}
