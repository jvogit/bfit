package com.github.jvogit.bfit.repository;

import java.sql.Date;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.github.jvogit.bfit.models.records.CalorieRecord;

@Repository
public interface CalorieRecordRepository extends JpaRepository<CalorieRecord, Long> {
    List<CalorieRecord> findAllByUserIdAndDateBetween(Long user_id, Date first, Date second);
    CalorieRecord findByUserIdAndDate(Long user_id, Date date);
}
