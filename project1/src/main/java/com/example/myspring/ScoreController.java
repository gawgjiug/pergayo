package com.example.myspring;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // 개발 환경에서만 사용. 프로덕션에서는 특정 origin으로 제한해야 합니다.
public class ScoreController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/score")
    public ResponseEntity<?> updateScore(@RequestBody ScoreUpdateRequest request) {
        System.out.println("Received score update request: " + request);
        Users user = userRepository.findByNickname(request.getNickname());
        if (user != null) {
            user.setScore(request.getScore());
            userRepository.save(user);
            return ResponseEntity.ok().body(new ScoreUpdateResponse(true, "Score updated successfully"));
        } else {
            return ResponseEntity.ok().body(new ScoreUpdateResponse(false, "User not found"));
        }
    }
}


class ScoreUpdateResponse {
    private boolean success;
    private String message;

    public ScoreUpdateResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    // getters
    public boolean isSuccess() { return success; }
    public String getMessage() { return message; }
}