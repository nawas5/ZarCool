// добавлю описание задачи
// пусть у кажого игрока hp 100
// добавлю каждому игроку поле damage - значение урона, который может нанести игрок
// к этому значению добавлю целочисленный шум +- несколько ед. урона
// и хочу немножко поиграть, поэтому пусть первый игрок будет иметь некоторую вероятность двойного урона
// а второй некоторую вероятность крита в n раз, где n некоторые значения
// и поэтому добавлю каждому игроку свою вероятность probability

const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const player1 = {
    player: 1,
    name: 'Weekend',
    hp: 100,
    weapon: 'Sweet Voice',
    damage: 15,
    probability: 0.3,
    img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
    attack: function (name) {
        console.log(name + ' Fight...')
    }
}

player1.attack(player1.name);

const player2 = {
    player: 2,
    name: 'ZarMarathon',
    hp: 100,
    weapon: 'Round videos in Telegram',
    damage: 15,
    probability: 0.2,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    attack: function (name) {
        console.log(name + ' Fight...')
    }
}

player2.attack(player2.name);

function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    return $tag
}

function createPlayer(playerObject) {
    const $player = createElement('div', 'player' + playerObject.player);
    const $progressbar = createElement('div', 'progressbar');
    const $character = createElement('div', 'character');
    const $life = createElement('div', 'life');
    const $damage = createElement('div', 'damage');
    const $probability = createElement('div', 'probability');
    const $name = createElement('div', 'name');
    const $img = createElement('img');

    $life.style.width = playerObject.hp +'%';
    $name.innerText = playerObject.name;
    $img.src = playerObject.img;

    $progressbar.appendChild($name);
    $progressbar.appendChild($life);

    $character.appendChild($img);

    $player.append($progressbar, $character, $damage, $probability);

    return $player;
}

function getRandom() {
    if (Math.random() > 0.5) {
        noise = Math.random() * 5;
    }
    else {
        noise = (-1) * Math.random() * 5;
    }
    return Math.floor(noise);
}


function changeHP(player) {
    const $playerLife = document.querySelector('.player' + player.player + ' .life');

    if (player.player === 1) {
        if (Math.random() < player.probability) {
            player.hp -= (player.damage + getRandom()) * 2;
            console.log('double damage');
        }
    }

    else {
        if (Math.random() < player.probability) {
            player.hp -= (player.damage + getRandom()) * Math.floor(Math.random() * 3 + 1);
            console.log('critical strike');
        }
    }

    player.hp -= player.damage + getRandom();

    if (player.hp <= 0) {
        player.hp = 0;
    }

    $playerLife.style.width = player.hp + '%';

}

function playerLose(name) {
    const $loseTitle = createElement('div', 'loseTitle');
    $loseTitle.innerText = name + ' Win';
    return $loseTitle;
}

$randomButton.addEventListener('click', function (){
    console.log('####: Click GO Button');
    changeHP(player1);
    console.log(player1.hp);
    changeHP(player2);
    console.log(player2.hp);
    if (player1.hp === 0 || player2.hp === 0) {

        if (player1.hp > 0 && player2.hp === 0) {
            $arenas.appendChild(playerLose(player1.name));
        } else if (player1.hp === 0 && player2.hp > 0) {
            $arenas.appendChild(playerLose(player2.name));

        } else if (player1.hp === 0 && player2.hp === 0) {
            const $loseTitle = createElement('div', 'loseTitle');
            $loseTitle.innerText = 'Draw';
        }

        $randomButton.disabled = true;
        $randomButton.style = 'display: none';
    }
})

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer( player2));
