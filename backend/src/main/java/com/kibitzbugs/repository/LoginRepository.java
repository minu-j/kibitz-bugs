package com.kibitzbugs.repository;

import com.kibitzbugs.entity.Login;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LoginRepository extends JpaRepository<Login, Long> {

    Optional<Login> findFirstByOrderByIdDesc();

}
