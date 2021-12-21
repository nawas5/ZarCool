import {HIT, IMG, ATTACK, LOGS} from './logs';
import getRandom from "./func";

const $arenas = document.querySelector('.arenas');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');

const player1 = {
    player: 1,
    name: 'SCORPION',
    hp: 100,
    img: IMG['SCORPION'],
    weapon: ['Sweet Voice'],
    changeHP,
    elHP,
    renderHP,
};

const player2 = {
    player: 2,
    name: 'SUBZERO',
    hp: 100,
    img: IMG['SUBZERO'],
    weapon: ['Round videos in Telegram'],
    changeHP,
    elHP,
    renderHP,
};

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
    (this.elHP()).style.width = `${this.hp}%`;
}

function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    return $tag
}

function createPlayer(playerObject) {
    const { name, player, hp, img} = playerObject;
    const $player = createElement('div',  `player${player}`);
    const $progressbar = createElement('div', 'progressbar');
    const $character = createElement('div', 'character');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $img = createElement('img');

    $life.style.width = `${hp}%`;
    $name.innerText = name;
    $img.src = img;

    $progressbar.append($name,$life);
    $character.appendChild($img);
    $player.append($progressbar, $character);

    return $player;
}

function playerWins(name) {
    const $loseTitle = createElement('div', 'loseTitle');
    if (name) {
        $loseTitle.innerText = `${name} Wins`;
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

function enemyAttack() {
    const length = ATTACK.length;
    const hit = ATTACK[getRandom(length) - 1];
    const defence = ATTACK[getRandom(length) - 1];

    return {
        value: getRandom(HIT[hit]),
        hit,
        defence,
    }
}

function playerAttack() {
    const attack = {};
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
    return attack;
}

function showResult() {
    const {name: name1, hp: hp1} = player1;
    const {name: name2, hp: hp2} = player2;

    if (hp1 === 0 || hp2 === 0) {
        createReloadButton();
    }

    if (hp1 > 0 && hp2 === 0) {
        $arenas.appendChild(playerWins(name1));
        generateLogs('end', player2, player1);

    } else if (hp1 === 0 && hp2 > 0) {
        $arenas.appendChild(playerWins(name2));
        generateLogs('end', player1, player2);

    } else if (hp1 === 0 && hp2 === 0) {
        $arenas.appendChild(playerWins());
        generateLogs('draw');
    }
}

function generateLogs(type, player1, player2, damage = 0) {
    
    const {name: name1} = player1;
    const {name: name2} = player2;

    const date = new Date;
    const normalize = (num) => (num.toString().length > 1 ? num: `0${num}`);
    const time = `${normalize(date.getHours())}:${normalize(date.getMinutes())}:${normalize(date.getSeconds())}`;

    function whereText(type) {
        switch (type) {
            case 'start':
                return LOGS[type]
                    .replace('[time]', time)
                    .replace('[player1]', name1)
                    .replace('[player2]', name2);
            case 'end':
                return `${time} - ${LOGS[type][getRandom(LOGS[type].length) - 1]}`
                    .replace('[playerLose]', name1)
                    .replace('[playerWins]', name2);
            case 'hit':
                return `${time} - ${LOGS[type][getRandom(LOGS[type].length) - 1]}  [${damage}xp]  [${player2.hp}/100]`
                    .replace('[playerKick]', name1)
                    .replace('[playerDefence]', name2);
            case 'defence':
                return `${time} - ${LOGS[type][getRandom(LOGS[type].length) - 1]}  [${damage}xp]  [${player2.hp}/100]`
                    .replace('[playerKick]', name1)
                    .replace('[playerDefence]', name2);
            case 'draw':
                return `${time} - ${LOGS[type]}`;
        }
    }

    const logMessage = whereText(type);
    $chat.insertAdjacentHTML('afterbegin', `<p>${logMessage}</p>`);
}

$formFight.addEventListener('submit', function (e){

    console.log('####: Click GO Button');

    e.preventDefault();
    const enemy = enemyAttack();
    const player = playerAttack();

    if (player.hit !== enemy.defence) {
        player1.changeHP(player.value);
        player1.renderHP();
        generateLogs('hit', player2, player1, player.value);
    }
    else {
        generateLogs('defence', player2, player1);
    }

    if (player.defence !== enemy.hit) {
        player2.changeHP(enemy.value);
        player2.renderHP();
        generateLogs('hit',player1, player2, enemy.value);
    }

    else {
        generateLogs('defence', player1, player2);
    }

    showResult();

})

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
generateLogs('start', player1, player2);