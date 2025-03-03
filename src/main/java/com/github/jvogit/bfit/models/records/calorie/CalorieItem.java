package com.github.jvogit.bfit.models.records.calorie;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.github.jvogit.bfit.models.records.CalorieRecord;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(
        name = "calorie_items"
)
@NoArgsConstructor
@Getter
@Setter
public class CalorieItem {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    private Integer calories;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    private CalorieRecord record;

    public CalorieItem(String name, Integer calories) {
        this.name = name;
        this.calories = calories;
    }
}
