package com.example.myspring;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<Users, Long> {

    // 기존 메소드
    @Query("SELECT u FROM Users u WHERE u.username = :username AND u.password = :password")
    Users findByUsernameAndPassword(@Param("username") String username, @Param("password") String password);

    // 새로운 메소드 추가
    @Query("SELECT u FROM Users u WHERE u.nickname = :nickname")
    Users findByNickname(@Param("nickname") String nickname);
    

}