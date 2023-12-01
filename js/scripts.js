// Добавление обработчика события, который выполнится после полной загрузки содержимого документа
document.addEventListener('DOMContentLoaded', () => {
    // Получение элементов интерфейса игры по их идентификаторам и селекторам
    const gameBoard = document.getElementById('gameBoard'); // игровое поле
    const errorCountElement = document.getElementById('errorCount'); // элемент для отображения количества ошибок
    const restartButton = document.getElementById('restartButton'); // кнопка перезапуска игры
    const winImage = document.querySelector('img[alt="картинка победителя"]'); // изображение для победы
    const loseImage = document.querySelector('img[alt="картинка проигравшего"]'); // изображение для проигрыша
    const winMessage = document.getElementById('winMessage'); // сообщение о победе
    const loseMessage = document.getElementById('loseMessage'); // сообщение о проигрыше

    // Инициализация массива карточек и переменных состояния игры
    const cards = ['🍎', '🍌', '🍓', '🍇', '🍎', '🍌', '🍓', '🍇']; // массив с картинками для карточек
    let chosenCards = []; // массив выбранных карточек
    let chosenCardsId = []; // массив идентификаторов выбранных карточек
    let errors = 6; // количество допустимых ошибок
    let matches = 0; // количество найденных пар

    // Перемешивание карточек
    cards.sort(() => 0.5 - Math.random());

    // Функция для создания игрового поля
    function createBoard() {
        for (let i = 0; i < cards.length; i++) {
            const card = document.createElement('div'); // создание нового элемента для карточки
            card.classList.add('card'); // добавление класса для стилизации
            card.setAttribute('data-id', i); // установка идентификатора карточки
            card.addEventListener('click', flipCard); // добавление обработчика клика
            gameBoard.appendChild(card); // добавление карточки на игровое поле
        }
    }

    // Функция для обработки клика по карточке
    function flipCard() {
        let cardId = this.getAttribute('data-id'); // получение идентификатора карточки
        chosenCards.push(cards[cardId]); // добавление выбранной карточки в массив
        chosenCardsId.push(cardId); // добавление идентификатора в массив
        this.innerHTML = cards[cardId]; // отображение картинки карточки
        if (chosenCards.length === 2) {
            setTimeout(checkForMatch, 500); // проверка на совпадение через 0.5 секунды
        }
    }

    // Функция для проверки совпадения карточек
    function checkForMatch() {
        const allCards = document.querySelectorAll('.card'); // получение всех карточек
        const firstCardId = chosenCardsId[0];
        const secondCardId = chosenCardsId[1];

        if (chosenCards[0] === chosenCards[1] && firstCardId !== secondCardId) {
            // Если карточки совпадают и не являются одной и той же карточкой
            allCards[firstCardId].style.visibility = 'hidden'; // скрытие первой карточки
            allCards[secondCardId].style.visibility = 'hidden'; // скрытие второй карточки
            matches++; // увеличение счетчика совпадений
        } else {
            // Если карточки не совпадают
            allCards[firstCardId].innerHTML = ''; // сброс первой карточки
            allCards[secondCardId].innerHTML = ''; // сброс второй карточки
            errors--; // уменьшение количества оставшихся попыток
            errorCountElement.innerText = `Попыток осталось: ${errors}`; // обновление отображения ошибок
            if (errors === 0) {
                gameOver(false); // вызов функции окончания игры в случае проигрыша
                return;
            }
        }

        chosenCards = []; // сброс массива выбранных карточек
        chosenCardsId = []; // сброс массива идентификаторов выбранных карточек
        if (matches === cards.length / 2) {
            gameOver(true); // вызов функции окончания игры в случае победы
        }
    }

    // Функция для обработки окончания игры
    function gameOver(isWin) {
        gameBoard.style.display = 'none'; // скрытие игрового поля
        errorCountElement.style.display = 'none'; // скрытие счетчика ошибок
        restartButton.style.display = 'block'; // отображение кнопки перезапуска
        if (isWin) {
            // Если игрок выиграл
            winImage.style.display = 'block'; // показать изображение победы
            winMessage.style.display = 'block'; // показать сообщение о победе
        } else {
            // Если игрок проиграл
            loseImage.style.display = 'block'; // показать изображение проигрыша
            loseMessage.style.display = 'block'; // показать сообщение о проигрыше
        }
        restartButton.addEventListener('click', () => location.reload()); // обработчик для кнопки перезапуска
    }

    createBoard(); // вызов функции создания игрового поля
});
