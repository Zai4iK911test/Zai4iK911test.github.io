    // Отримуємо параметри з URL
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const first_name = urlParams.get('first_name');
  const last_name = urlParams.get('last_name');
  const username = urlParams.get('username');
  const photo_url = urlParams.get('photo_url');

  const userData = {
    id: id,
    first_name: first_name,
    last_name: last_name,
    username: username,
    photo_url: photo_url,
    win: 0,
    loss: 0
  };
        import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
        import { getDatabase, ref, push, set, orderByChild, equalTo, get, runTransaction, child } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

    const firebaseConfig = {
    apiKey: "AIzaSyBRJTg3yhWDIp_EKhehn7gqR3wYDcqMla4",
    authDomain: "pooltest-8745f.firebaseapp.com",
    databaseURL: "https://pooltest-8745f-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "pooltest-8745f",
    storageBucket: "pooltest-8745f.appspot.com",
    messagingSenderId: "913085881268",
    appId: "1:913085881268:web:5754bbea52b395fdf4f0e1"
  };


        const app = initializeApp(firebaseConfig);

        const db = getDatabase();

  // Перевірка, чи користувач вже існує в базі даних за допомогою id
  function checkUserExists(id) {
    const userRef = ref(db, 'users/' + id); // Змініть 'users' на ваш шлях в базі даних
    return get(userRef)
      .then((snapshot) => {
        return snapshot.exists();
      })
      .catch((error) => {
        console.error("Помилка при перевірці користувача: ", error);
        return false;
      });
  }



  // Перевіряємо, чи користувач вже існує за допомогою id
  checkUserExists(id)
    .then((userExists) => {
      if (!userExists) {
        // Зберігаємо userData в базі даних, оскільки користувача не існує
        const userDataRef = ref(db, 'users/' + id); // Змініть 'users' на ваш шлях в базі даних
        set(userDataRef, userData)
          .then(() => {
            console.log("Дані користувача збережено у базі даних.");
          })
          .catch((error) => {
            console.error("Помилка при збереженні даних: ", error);
          });
      } else {
        console.log("Користувач вже існує у базі даних.");
        document.getElementById('usernameSpan').textContent = userData.username; // Вставка нікнейму користувача
        document.getElementById('myImage').src = userData.photo_url;
      }
    });
    
function initializePlayer1Ref() {
 const playerRef = ref(db, "player1");
  // Зчитування даних з бази даних
get(playerRef)
  .then((snapshot) => {
    if (snapshot.exists()) {
      const players = snapshot.val();
      const player1 = players.player1;
      const id = players.id;
      const username = players.username;
      const photo_url = players.photo_url;

      if (player1 === 0) {
        showInitialView();
      } else {
         showPlayerInfo(id, username, photo_url);
        }
    }
  });
}

// Виклик функції при старті
initializePlayer1Ref();
    setInterval(initializePlayer1Ref, 1000);

  function initializePlayer2Ref() {
 const playerRef = ref(db, "player2");
  // Зчитування даних з бази даних
get(playerRef)
  .then((snapshot) => {
    if (snapshot.exists()) {
      const players = snapshot.val();
      const player2 = players.player2;
      const id = players.id;
      const username = players.username;
      const photo_url = players.photo_url;

      if (player2 === 0) {
        showInitialView2();
      } else {
         showPlayerInfo2(id, username, photo_url);
        }
    }
  });
}

// Виклик функції при старті
initializePlayer2Ref();
    setInterval(initializePlayer2Ref, 1000);



const blockmain = document.querySelector('.blockmain:nth-child(1)');
let isPlayerInfoShown = false;
const blockmain2 = document.querySelector('.blockmain:nth-child(3)');
let isPlayerInfoShown2 = false;

function showPlayerInfo(id, username, photo_url) {
    blockmain.innerHTML = `
        <div class="container">
            <div class="nickname">${username}</div>
            <div class="photo"><img src="${photo_url}" alt="Фото користувача"></div>
            <div class="exit"><button id="changeStyleButton">ВИЙТИ</button></div>
        </div>
    `;
    isPlayerInfoShown = true;

    const playerRef = ref(db, "player1/player1");
    runTransaction(playerRef, (currentData) => {
        return 1; //  значення на 1
    });
    const playerIUPRef = ref(db, "player1");
    runTransaction(playerIUPRef, (currentData) => {
        currentData.id = id;
        currentData.username = username;
        currentData.photo_url = photo_url;
        return currentData; 
    });
}

function showPlayerInfo2(id, username, photo_url) {
    blockmain2.innerHTML = `
        <div class="container">
            <div class="nickname">${username}</div>
            <div class="photo"><img src="${photo_url}" alt="Фото користувача"></div>
            <div class="exit"><button id="changeStyleButton2">ВИЙТИ</button></div>
        </div>
    `;
    isPlayerInfoShown2 = true;

    const playerRef = ref(db, "player2/player2");
    runTransaction(playerRef, (currentData) => {
        return 1; //  значення на 1
    });
    const playerIUPRef = ref(db, "player2");
    runTransaction(playerIUPRef, (currentData) => {
        currentData.id = id;
        currentData.username = username;
        currentData.photo_url = photo_url;
        return currentData; 
    });
}
function showInitialView() {
    blockmain.innerHTML = `
        <button id="changeStyleButton">Ігрок 1</button>
    `;
    isPlayerInfoShown = false;

      const playerRef = ref(db, "player1/player1");
    runTransaction(playerRef, (currentData) => {
        return 0; 
    });
  const playerIUPRef = ref(db, "player1");
    runTransaction(playerIUPRef, (currentData) => {
        currentData.id = "";
        currentData.username = "";
        currentData.photo_url = "";
        return currentData; 
    });
}

function showInitialView2() {
    blockmain2.innerHTML = `
        <button id="changeStyleButton2">Ігрок 2</button>
    `;
    isPlayerInfoShown2 = false;

    const playerRef = ref(db, "player2/player2");
    runTransaction(playerRef, (currentData) => {
        return 0; 
    });
    const playerIUPRef = ref(db, "player2");
    runTransaction(playerIUPRef, (currentData) => {
        currentData.id = "";
        currentData.username = "";
        currentData.photo_url = "";
        return currentData; 
    });
}
// Передаємо дані користувача для вставки
blockmain.addEventListener('click', (event) => {
    if (event.target.matches('#changeStyleButton')) {
        if (isPlayerInfoShown) {
            showInitialView();
        } else {
            showPlayerInfo(userData.id, userData.username, userData.photo_url); 
        }
    }
});

blockmain2.addEventListener('click', (event) => {
    if (event.target.matches('#changeStyleButton2')) {
        if (isPlayerInfoShown2) {
            showInitialView2();
        } else {
            showPlayerInfo2(userData.id, userData.username, userData.photo_url);
        }
    }
});

// Отримуємо посилання на кнопку "START"
const startButton = document.querySelector('#startButton');

// Додаємо обробник події для натиснення кнопки "START"
startButton.addEventListener('click', () => {
    // Отримуємо дані користувача з бази даних Firebase для "player1"
    const player1Ref = ref(db, "player1");
    get(player1Ref).then((snapshot) => {
            if (snapshot.exists()) {
                const player1Data = snapshot.val();
                const id = player1Data.id;
                const username = player1Data.username;
                const photo_url = player1Data.photo_url;
                // Отримуємо вибраний режим зі списку вибору
                const selectedMode = document.querySelector('select').value;
                // Перенаправляємо користувача на сторінку "1v1.index" з параметрами даних
                const queryString1 = `&id_1=${encodeURIComponent(id)}&username_1=${encodeURIComponent(username)}&photo_url_1=${encodeURIComponent(photo_url)}`;
              
                  const player2Ref = ref(db, "player2");
                  get(player2Ref).then((snapshot) => {
                    if (snapshot.exists()) {
                      const player2Data = snapshot.val();
                      const id = player2Data.id;
                      const username = player2Data.username;
                      const photo_url = player2Data.photo_url;
                      
                      const queryString2 = `&id_2=${encodeURIComponent(id)}&username_2=${encodeURIComponent(username)}&photo_url_2=${encodeURIComponent(photo_url)}`;
                    
                      window.location.href = `main.html?mode=${encodeURIComponent(selectedMode)}${queryString1}${queryString2}`;
              } 
          });
            } 
        });
});
