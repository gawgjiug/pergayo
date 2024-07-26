document.addEventListener('DOMContentLoaded', function () {
    const nickname = localStorage.getItem('nickname');
    const greetingElement = document.getElementById('greeting');

    if (nickname) {
        greetingElement.textContent = `안녕하세요! ${nickname}님!`;
    } else {
        greetingElement.textContent = '안녕하세요!';
    }

    const gameStartButton = document.querySelector('.game__start');
    if (gameStartButton) {
        gameStartButton.addEventListener('click', function (event) {
            event.preventDefault(); // 폼의 기본 동작 방지
            window.location.href = 'game.html';
            console.log("게임 페이지로 이동");
        });
    }

    const rankingStartButton = document.querySelector('.lakin__btn');
    if (rankingStartButton) {
        rankingStartButton.addEventListener('click', function (event) {
            event.preventDefault(); // 폼의 기본 동작 방지
            window.location.href = 'ranking.html';
            console.log("랭킹 페이지로 이동");
        });
    }
});
