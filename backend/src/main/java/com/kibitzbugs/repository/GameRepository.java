package com.kibitzbugs.repository;

import com.kibitzbugs.entity.Game;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRepository extends JpaRepository<Game, Long> {
}
