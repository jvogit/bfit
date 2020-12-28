package com.github.jvogit.bfit.controllers.api;

import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.github.jvogit.bfit.jwt.JwtUserPrincipal;
import com.github.jvogit.bfit.models.records.CalorieRecord;
import com.github.jvogit.bfit.payloads.records.RecordsCalorieBody;
import com.github.jvogit.bfit.responses.ApiResponse;
import com.github.jvogit.bfit.responses.ApiSuccess;
import com.github.jvogit.bfit.services.CalorieRecordsService;

@RestController
@RequestMapping("/api/records/calorie")
public class RecordsCalorieController {
    @Autowired
    private CalorieRecordsService calorieRecordsService;

    @PostMapping
    public ApiResponse post(@AuthenticationPrincipal JwtUserPrincipal userPrincipal,
            @Valid @RequestBody RecordsCalorieBody body) {
        calorieRecordsService.createRecord(userPrincipal.getId(), body);

        return new ApiSuccess("success");
    }

    @GetMapping
    public List<CalorieRecord> get(@AuthenticationPrincipal JwtUserPrincipal userPrincipal,
            @RequestParam(required = true) Long start, @RequestParam(required = true) Long end) {
        return calorieRecordsService.findRecords(userPrincipal.getId(), start, end);
    }
}
