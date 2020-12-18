package com.github.jvogit.bfit.responses.accounts;

import lombok.Data;
import lombok.NonNull;

@Data
public class UserAvailability {
    @NonNull
    Boolean available;
}
