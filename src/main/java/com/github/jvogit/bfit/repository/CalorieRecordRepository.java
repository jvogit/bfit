package com.github.jvogit.bfit.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.github.jvogit.bfit.models.records.CalorieRecord;

@Repository
public interface CalorieRecordRepository extends CrudRepository<CalorieRecord, Long> {
    List<CalorieRecord> findAllByUserIdAndDateBetween(Long user_id, LocalDate first, LocalDate second);
    Optional<CalorieRecord> findByUserIdAndDate(Long user_id, LocalDate date);
}
