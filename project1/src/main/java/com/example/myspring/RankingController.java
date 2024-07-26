package com.example.myspring;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class RankingController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/ranking")
    public ResponseEntity<List<Users>> getRanking() {
        List<Users> users = userRepository.findAll();
        // 점수를 내림차순으로 정렬
        users.sort((u1, u2) -> Integer.compare(u2.getScore(), u1.getScore()));
        return ResponseEntity.ok(users);
    }
}

