package com.github.jvogit.bfit.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import org.hibernate.annotations.NaturalId;
import com.github.jvogit.bfit.models.audits.DateAudit;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NonNull;

@Data
@EqualsAndHashCode(callSuper = false)
@Entity
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(columnNames = {
            "username"
        }),
        @UniqueConstraint(columnNames = {
            "email"
        })
})
public class User extends DateAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank
    @NonNull
    @Size(max = 40)
    private String name;

    @NotBlank
    @NonNull
    @Size(max = 15)
    private String username;

    @NaturalId
    @NotBlank
    @NonNull
    @Size(max = 40)
    @Email
    private String email;

    @NotBlank
    @NonNull
    @Size(max = 100)
    private String password;
    
    
}
