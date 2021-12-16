const $arenas = document.querySelector('.arenas');
// const $randomButton = document.querySelector('.button');

const $formFight = document.querySelector('.control');

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

const player1 = {
    player: 1,
    name: 'Weekend',
    hp: 100,
    changeHP,
    elHP,
    renderHP,
    weapon: 'Sweet Voice',
    img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
    attack,
}

const player2 = {
    player: 2,
    name: 'Zar',
    hp: 100,
    changeHP,
    elHP,
    renderHP,
    weapon: 'Round videos in Telegram',
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    attack,
}
function changeHP(damage) {
    this.hp -= damage;
    if (this.hp <= 0) {
        this.hp = 0;
    }
}

function elHP() {
    return document.querySelector('.player' + this.player + ' .life');
}

function renderHP() {
    (this.elHP()).style.width = this.hp + '%';
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

    $progressbar.append($name,$life);
    $character.appendChild($img);
    $player.append($progressbar, $character);

    return $player;
}

function getRandom(number) {
    return Math.ceil(Math.random() * number);
    // обязательно поставить округление в большую сторону, чтобы не было -1
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
    const $reloadButton = document.querySelector('.button');
    $reloadButton.innerHTML = 'Restart';

    $reloadButton.addEventListener('click', function (){
        window.location.reload();
    })

    $reloadWrap.appendChild($reloadButton);
    $arenas.appendChild($reloadWrap);
}


// $randomButton.addEventListener('click', function () {
//     console.log('####: Click GO Button');
//
//     player1.changeHP(getRandom(20));
//     player2.changeHP(getRandom(20));
//
//     console.log(player1.hp);
//     console.log(player2.hp);
//
//     player1.renderHP();
//     player2.renderHP();
//
//     if (player1.hp === 0 || player2.hp === 0) {
//         $randomButton.disabled = true;
//         createReloadButton();
//         }
//         // $randomButton.style = 'display: none';
//
//     if (player1.hp > 0 && player2.hp === 0) {
//         $arenas.appendChild(playerWins(player1.name));
//     } else if (player1.hp === 0 && player2.hp > 0) {
//         $arenas.appendChild(playerWins(player2.name));
//     } else if (player1.hp === 0 && player2.hp === 0) {
//         $arenas.appendChild(playerWins());
//     }
//
// })

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

function enemyAttack() {
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];

    return {
        value: getRandom(HIT[hit]),
        hit,
        defence,
    }

}

$formFight.addEventListener('submit', function (e){

    console.log('####: Click GO Button');

    e.preventDefault();
    const enemy = enemyAttack(); // куда бьёт компьютер, компьютер player2
    const attack = {}; // куда бьём мы и что мы выбрали из формы, мы player1

    for (let item of $formFight) {
        if (item.checked && item.name === 'hit') {
            attack.value = getRandom(HIT[item.value]);
            attack.hit = item.value;
        }

        if (item.checked && item.name === 'defence') {
            attack.defence = item.value;
        }

        item.checked = false;
    }

    console.log('####: a', attack);
    console.log('####: e', enemy);

    if (attack.hit !== enemy.defence) {
        player1.changeHP(attack.value);
        player1.renderHP();
    }
    if (attack.defence !== enemy.hit) {
        player2.changeHP(enemy.value);
        player2.renderHP();
    }

    console.log(player1.hp);
    console.log(player2.hp);


    if (player1.hp === 0 || player2.hp === 0) {
        createReloadButton();
        }

    if (player1.hp > 0 && player2.hp === 0) {
        $arenas.appendChild(playerWins(player1.name));
    } else if (player1.hp === 0 && player2.hp > 0) {
        $arenas.appendChild(playerWins(player2.name));
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(playerWins());
    }

})

