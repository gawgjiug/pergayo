package com.example.myspring;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class LoginController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Users user = userRepository.findByUsernameAndPassword(
            loginRequest.getUsername(), loginRequest.getPassword());
        
        if (user != null) {
            return ResponseEntity.ok(new LoginResponse(true, user.getNickname()));
        } else {
            return ResponseEntity.ok(new LoginResponse(false, null));
        }
    }
}

