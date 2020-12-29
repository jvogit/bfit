package com.github.jvogit.bfit.services;

import java.time.LocalDate;
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
    private CalorieRecordRepository calorieRecordRepo;

    public CalorieRecord createRecord(Long user_id, RecordsCalorieBody body) {
        var date = LocalDate.parse(body.getDate());
        Set<CalorieItem> items = body.getItems().stream()
                .map(item -> new CalorieItem(item.getName(), item.getCalories()))
                .collect(Collectors.toSet());
        CalorieRecord record = new CalorieRecord(user_id, date, items);
        calorieRecordRepo.findByUserIdAndDate(user_id, date)
                .map(CalorieRecord::getId)
                .ifPresent(record::setId);

        return calorieRecordRepo.save(record);
    }

    public List<CalorieRecord> findRecords(Long user_id, LocalDate start, LocalDate end) {
        return calorieRecordRepo.findAllByUserIdAndDateBetween(user_id, start, end);
    }
}
