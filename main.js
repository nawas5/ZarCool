const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const player1 = {
    player: 1,
    name: 'Weekend',
    hp: 100,
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP,
    weapon: 'Sweet Voice',
    img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
    attack: attack,
}

const player2 = {
    player: 2,
    name: 'Zar',
    hp: 100,
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP,
    weapon: 'Round videos in Telegram',
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    attack: attack,
}

function attack() {
    return this.name + ' Fight...';
}

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
    const $name = createElement('div', 'name');
    const $img = createElement('img');

    $life.style.width = playerObject.hp +'%';
    $name.innerText = playerObject.name;
    $img.src = playerObject.img;

    $progressbar.appendChild($name);
    $progressbar.appendChild($life);

    $character.appendChild($img);

    $player.append($progressbar, $character);

    return $player;
}

function getRandom(number) {
    return Math.floor(Math.random() * number);
}

function changeHP(valueHP) {
    this.hp -= valueHP;
    if (this.hp <= 0) {
        this.hp = 0;
    }
    return this.hp
}

function elHP() {
    return document.querySelector('.player' + this.player + ' .life');
}

function renderHP() {
    (this.elHP()).style.width = this.hp + '%';
}

function playerWins(name) {
    const $loseTitle = createElement('div', 'loseTitle');
    if (name) {
        $loseTitle.innerText = name + ' Wins';
    } else {
        $loseTitle.innerText = 'Draw';
    }
    return $loseTitle;
}

function createReloadButton() {
    const $reloadWrap = createElement('div','reloadWrap');
    const $button = document.querySelector('.button');
    $button.innerHTML = 'Restart';

    $reloadWrap.appendChild($button);
    $arenas.appendChild($reloadWrap);

    $button.addEventListener('click', function (){
        window.location.reload();
    })
}


$randomButton.addEventListener('click', function () {
    console.log('####: Click GO Button');

    player1.changeHP(getRandom(20));
    player2.changeHP(getRandom(20));

    console.log(player1.hp);
    console.log(player2.hp);

    player1.renderHP();
    player2.renderHP();

    if (player1.hp === 0 || player2.hp === 0) {
        createReloadButton();
        }
        // $randomButton.style = 'display: none';

    if (player1.hp > 0 && player2.hp === 0) {
        $arenas.appendChild(playerWins(player1.name));
    } else if (player1.hp === 0 && player2.hp > 0) {
        $arenas.appendChild(playerWins(player2.name));
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(playerWins());
    }

})

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

