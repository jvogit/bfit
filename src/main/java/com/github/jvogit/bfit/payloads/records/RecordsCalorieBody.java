package com.github.jvogit.bfit.payloads.records;

import java.util.List;
import lombok.Data;

@Data
public class RecordsCalorieBody {
    private String date;
    private List<RecordsCalorieItem> items;
    
    @Data
    public static class RecordsCalorieItem {
        private String name;
        private Integer calories;
    }
}
