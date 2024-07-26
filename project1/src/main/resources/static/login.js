document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const userInfo = document.getElementById('user-info');
    const greeting = document.getElementById('greeting');
    const playButton = document.getElementById('play-button');
    const rankingButton = document.getElementById('ranking-button');
    
    const scrollReveal = ScrollReveal({
        origin: 'top',
        distance: '60px',
        duration: 2000,
        delay: 200,
    });
    
    scrollReveal.reveal('.logo', { delay: 300 }); // Add animation to logo
    scrollReveal.reveal('.login', { delay: 800 });

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.querySelector('input[type="text"]').value;
        const password = document.querySelector('input[type="password"]').value;

        console.log("Attempting login with:", username, password);

        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
        .then(response => {
            console.log("Received response:", response);
            return response.json();
        })
        .then(data => {
            console.log("Parsed JSON data:", data);

            if (data.success) {
                console.log("Login successful, redirecting to home.html");
                localStorage.setItem('nickname', data.nickname);
                window.location.href = 'home.html';
            } else {
                alert('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('로그인 중 오류가 발생했습니다.');
        });
    });
});
