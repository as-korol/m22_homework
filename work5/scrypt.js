
const buttonChat = document.querySelector('.buttonChat');
const buttonGeo = document.querySelector('.buttonGeo');
const messageInput = document.querySelector('.messageInput');
const messageOutput = document.querySelector('.messageOutput');
const geoPosition = document.querySelector('.geoPosition');
const websocket = new WebSocket('wss://echo-ws-service.herokuapp.com/');


websocket.onopen = function (event) {
    console.log('Соединение установлено');
};

websocket.onmessage = function (event) {
    let reqServer = event.data;
    messageInput.textContent = document.querySelector('.inputArea').value;
    messageOutput.textContent = 'Ответ сервера: ' + event.data;
};

websocket.onerror = function (error) {
    console.error('Ошибка соединения:', error.message);
};

buttonChat.addEventListener('click', function () {
    let input = document.querySelector('.inputArea').value;
    if (input !== '') {
        websocket.send(input);
    } else {
        alert('Введите сообщение');
    }
});

buttonGeo.addEventListener('click', function () {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const mapLink = `https://www.openstreetmap.org/#map=19/${latitude}/${longitude}`;
            const link = document.createElement('a');
            link.href = mapLink;
            link.textContent = "Посмотреть на карте";
            geoPosition.appendChild(link);
        });
    } else {
        console.log('Геолокация недоступна');
    }
});





