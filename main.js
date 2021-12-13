const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const player1 = {
    player: 1,
    name: 'Weekend',
    hp: 100,
    weapon: 'Sweet Voice',
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


function changeHP(player) {
    const $playerLife = document.querySelector('.player' + player.player + ' .life');
    player.hp -= Math.floor(Math.random() * 20);

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

$randomButton.addEventListener('click', function () {
    console.log('####: Click GO Button');
    changeHP(player1);
    console.log(player1.hp);
    changeHP(player2);
    console.log(player2.hp);


    if (player1.hp > 0 && player2.hp === 0) {
        $arenas.appendChild(playerLose(player1.name));
        $randomButton.disabled = true;
        $randomButton.style = 'display: none';

    } else if (player1.hp === 0 && player2.hp > 0) {
        $arenas.appendChild(playerLose(player2.name));
        $randomButton.disabled = true;
        $randomButton.style = 'display: none';
    }
})

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer( player2));
