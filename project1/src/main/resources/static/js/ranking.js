document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:8080/api/ranking')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(users => {
            const tableBody = document.getElementById('rankingTableBody');
            tableBody.innerHTML = ''; // 기존 내용을 지웁니다

            // 랭킹을 내림차순으로 정렬
            users.sort((a, b) => b.score - a.score);

            users.forEach((user, index) => {
                // 등급 계산 및 이미지/클래스 설정
                let grade;
                let avatar;
                let rowClass;
                let audioFile;
                if (index === 0) {
                    grade = 'Kpop의 황제 방시혁';
                    avatar = './image/방시혁.jpg'; // 1등 이미지
                    rowClass = 'table-rank1'; // 1등 스타일 클래스
                    audioFile = './music/bsh_audio.mp3'; // 방시혁 MP3 파일
                } else if (index === 1) {
                    grade = '만년 2등 박진영';
                    avatar = './image/박진영.png'; // 2등 이미지
                    rowClass = 'table-rank2'; // 2등 스타일 클래스
                    audioFile = './music/jyp_audio.mp3'; // 박진영 MP3 파일
                } else {
                    grade = '안습';
                    avatar = './image/normal.jpg'; // 3등 이하 이미지
                    rowClass = 'table-rank-other'; // 기타 유저 스타일 클래스
                    audioFile = null; // 음악 파일 없음
                }

                // 행 추가
                const row = document.createElement('tr');
                row.className = rowClass;
                row.innerHTML = `
                    <td><img src="${avatar}" alt="${grade}" data-audio="${audioFile}"></td>
                    <td>${user.nickname}</td>
                    <td>${user.score}</td>
                    <td>${grade}</td>
                `;
                tableBody.appendChild(row);
            });

            // 이미지 클릭 이벤트 추가
            tableBody.addEventListener('click', function(event) {
                const target = event.target;
                if (target.tagName === 'IMG' && target.dataset.audio) {
                    playAudio(target.dataset.audio);
                }
            });

            function playAudio(src) {
                const audio = new Audio(src);
                audio.play();
            }
        })
        .catch(error => console.error('Error fetching ranking:', error));
});
