package com.kibitzbugs.repository;

import com.kibitzbugs.entity.Game;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface GameRepository extends JpaRepository<Game, Long> {
    List<Game> findGamesByStreamerId(String streamerId);

    Optional<Game> findFirstByOrderByIdDesc();
}
