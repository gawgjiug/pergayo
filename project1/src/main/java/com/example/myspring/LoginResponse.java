package com.example.myspring;

public class LoginResponse {
    private boolean success;
    private String nickname;

    public LoginResponse(boolean success, String nickname) {
        this.success = success;
        this.nickname = nickname;
    }

    // Getters
    public boolean isSuccess() { return success; }
    public String getNickname() { return nickname; }
}