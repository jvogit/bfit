package com.github.jvogit.bfit.models.records;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.github.jvogit.bfit.models.accounts.User;
import com.github.jvogit.bfit.models.records.calorie.CalorieItem;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(
        name = "calorie_records",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"user_id", "date"})
        })
@NoArgsConstructor
@Getter
@Setter
public class CalorieRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    @JsonIgnore
    private User user;

    private LocalDate date;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "record", cascade = CascadeType.ALL,
            orphanRemoval = true)
    @JsonManagedReference
    private Set<CalorieItem> items;

    public void addItem(CalorieItem item) {
        items.add(item);
        item.setRecord(this);
    }

    public CalorieRecord(Long userId, LocalDate date, Set<CalorieItem> items) {
        this.userId = userId;
        this.date = date;
        this.items = new HashSet<>();
        items.forEach(this::addItem);
    }
}
