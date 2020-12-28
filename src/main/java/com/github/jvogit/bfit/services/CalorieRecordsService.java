package com.github.jvogit.bfit.services;

import java.sql.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.github.jvogit.bfit.models.records.CalorieRecord;
import com.github.jvogit.bfit.models.records.calorie.CalorieItem;
import com.github.jvogit.bfit.payloads.records.RecordsCalorieBody;
import com.github.jvogit.bfit.repository.CalorieRecordRepository;

@Service
@Transactional
public class CalorieRecordsService {
    @Autowired
    CalorieRecordRepository calorieRecordRepo;
    
    public CalorieRecord createRecord(Long user_id, RecordsCalorieBody body) {
        Set<CalorieItem> items = body.getItems().stream()
                .map(item -> new CalorieItem(item.getName(), item.getCalories()))
                .collect(Collectors.toSet());
        CalorieRecord record = new CalorieRecord(user_id, new Date(body.getTimestamp()), items);
        calorieRecordRepo.save(record);
        
        return record;
    }
    
    public List<CalorieRecord> findRecords(Long user_id, Long start, Long end) {
        return calorieRecordRepo.findAllByUserIdAndDateBetween(user_id, new Date(start), new Date(end));
    }
}
