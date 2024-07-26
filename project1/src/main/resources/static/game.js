document.addEventListener("DOMContentLoaded", () => {
    const allSongs = [
        { file: './music/A.mp3', answer: 'A', image: './image/A.jpg' },
        { file: './music/누예삐오.mp3', answer: '누예삐오', image: './image/누예삐오.jpg' },
        { file: './music/디바.mp3', answer: '디바', image: './image/디바.jpg' },
        { file: './music/다른 남자 말고 너.mp3', answer: '다른 남자 말고 너', image: './image/다른 남자 말고 너.jpg' },
        { file: './music/장난아냐.mp3', answer: '장난아냐', image: './image/장난아냐.jfif' },
        { file: './music/마돈나.mp3', answer: '마돈나', image: './image/마돈나.jpg' },
        { file: './music/추격자.mp3', answer: '추격자', image: './image/추격자.jpg' },
        { file: './music/향수뿌리지마.mp3', answer: '향수뿌리지마', image: './image/향수뿌리지마.jfif' },
        { file: './music/숨.mp3', answer: '숨', image: './image/숨.jpg' },
        { file: './music/미스터.mp3', answer: '미스터', image: './image/미스터.jpg' },
        { file: './music/걸어본다.mp3', answer: '걸어본다', image: './image/걸어본다.jpg' },
    ];

    const answerInput = document.querySelector("#answerInput");
    const resultDisplay = document.querySelector("#resultDisplay");
    const musicAnimation = document.querySelector(".music-animation");
    const logoImage = document.querySelector("#logoImage");

    let currentAudio = null;
    let currentSong = null;
    let attempts = 0;
    let correctAnswers = 0;
    let usedSongs = [];

    function showAlert(title, text, icon) {
        Swal.fire({
            title: title,
            text: text,
            icon: icon,
            confirmButtonText: '확인'
        });
    }

    async function sendScoreToServer(nickname, score) {
        try {
            console.log("Sending score update:", { nickname, score });
            const response = await fetch('http://localhost:8080/api/score', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nickname, score })
            });
            console.log("Received response:", response);

            if (response.ok) {
                const data = await response.json();
                console.log("Score update successful:", data);
                return data;
            } else {
                const errorText = await response.text();
                console.error("Failed to update score:", response.status, errorText);
                throw new Error(`Failed to update score: ${errorText}`);
            }
        } catch (error) {
            console.error("Error updating score:", error);
            throw error;
        }
    }

    async function updateScore(score) {
        const nickname = localStorage.getItem('nickname');
        if (!nickname) {
            console.error("닉네임을 찾을 수 없습니다.");
            showAlert("오류", "사용자 정보를 찾을 수 없습니다.", "error");
            return;
        }

        console.log("Attempting to send score to server with nickname:", nickname);
        try {
            const result = await sendScoreToServer(nickname, score);
            console.log("Score update successful:", result);
        } catch (error) {
            console.error("점수 업데이트 실패:", error);
            showAlert("오류", "점수 업데이트에 실패했습니다.", "error");
        }
    }

    function playRandomSong() {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio = null;
        }

        if (attempts >= 10) {
            endGame();
            return;
        }

        let availableSongs = allSongs.filter(song => !usedSongs.includes(song.file));

        if (availableSongs.length === 0) {
            usedSongs = [];
            availableSongs = allSongs.slice();
        }

        const randomIndex = Math.floor(Math.random() * availableSongs.length);
        currentSong = availableSongs[randomIndex];
        usedSongs.push(currentSong.file);

        currentAudio = new Audio(currentSong.file);
        currentAudio.play();

        musicAnimation.style.display = 'flex';
        answerInput.value = '';
        resultDisplay.textContent = '';
        logoImage.src = './image/index_logo.png';
    }

    function checkAnswer() {
        const userAnswer = answerInput.value.trim().toLowerCase();
        const correctAnswer = currentSong.answer.toLowerCase();

        attempts++;

        let feedbackAudio;
        let feedbackImage;

        if (userAnswer === correctAnswer) {
            correctAnswers++;
            resultDisplay.textContent = `정답! "${currentSong.answer}"`;
            resultDisplay.style.color = 'green';
            feedbackAudio = new Audio('./music/correct.mp3');
            feedbackImage = currentSong.image;

            // 정답을 맞출 때마다 점수 업데이트
            updateScore(correctAnswers);
        } else {
            resultDisplay.textContent = `오답! 정답은 "${currentSong.answer}" 입니다!`;
            resultDisplay.style.color = 'red';
            feedbackAudio = new Audio('./music/error.mp3');
            feedbackImage = currentSong.image;
        }

        feedbackAudio.play();
        logoImage.src = feedbackImage;

        setTimeout(() => {
            logoImage.src = './image/index_logo.png';
        }, 1500);

        console.log(`시도 횟수: ${attempts}, 맞춘 정답 개수: ${correctAnswers}`);

        if (attempts < 10) {
            setTimeout(playRandomSong, 2000);
        } else {
            endGame();
        }
    }

    function endGame() {
        musicAnimation.style.display = 'none';
        showAlert("게임 종료!", `10문제 중 ${correctAnswers}개 맞췄습니다!`, "info");
        
        // 게임 종료 시 최종 점수 업데이트
        updateScore(correctAnswers)
            .then(() => {
                setTimeout(() => {
                    window.location.href = 'home.html';
                }, 3000);
            });
    }

    answerInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            checkAnswer();
        }
    });

    playRandomSong();
});