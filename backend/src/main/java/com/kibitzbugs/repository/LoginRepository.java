package com.kibitzbugs.repository;

import com.kibitzbugs.entity.Login;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoginRepository extends JpaRepository<Login, Long> {
}
