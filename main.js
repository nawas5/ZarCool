const HIT = {
    head: 30,
    body: 25,
    foot: 20,
};

const ATTACK = ['head', 'body', 'foot'];

const LOGS = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
};

const IMG = {
    SCORPION: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    KITANA: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    LIUKANG: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
    SONYA: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    SUBZERO: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
};

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

function changeHP(randomNumber) {
    this.hp -= randomNumber;
    if (this.hp <= 0) {
        this.hp = 0;
    }
}

function elHP() {
    return document.querySelector(`.player${this.player} .life`);
}

function renderHP() {
    (this.elHP()).style.width = `${this.hp}%`;
}

function getRandom(number) {
    return Math.ceil(Math.random() * number);
}

function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    return $tag
}


function createPlayer({ name, player, hp, img}) {
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


function playerLose(name) {

    const $loseTitle = createElement('div', 'loseTitle');
    if (name) {
        $loseTitle.innerText = `${name} Wins`;
    } else {
        $loseTitle.innerText = 'Draw';
    }
    return $loseTitle;
}

function createReloadButton() {
    const $reloadButtonDiv = createElement('div','reloadWrap');
    const $reloadButton = createElement('button', 'button');
    $reloadButton.innerHTML = 'Reload';

    $reloadButton.addEventListener('click', function (){
        window.location.reload();
    })

    $reloadButtonDiv.appendChild($reloadButton);
    $arenas.appendChild($reloadButtonDiv);
}

function enemyAttack() {
    const hit = ATTACK[getRandom(ATTACK.length) - 1];
    const defence = ATTACK[getRandom(ATTACK.length) - 1];

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

    const {name: playerName1, hp: hp1} = player1;
    const {name: playerName2, hp: hp2} = player2;

    if (hp1 === 0 || hp2 === 0) {

        createReloadButton();
    }

    if (hp1 > 0 && hp2 === 0) {
        $arenas.appendChild(playerLose(playerName1));
        generateLogs('end', player2, player1);


    } else if (hp1 === 0 && hp2 > 0) {
        $arenas.appendChild(playerLose(playerName2));
        generateLogs('end', player1, player2);

    } else if (hp1 === 0 && hp2 === 0) {
        $arenas.appendChild(playerLose());

        generateLogs('draw');
    }
}


function getTime() {
    const date = new Date;
    const normalize = (num) => (num.toString().length > 1 ? num: `0${num}`);
    return `${normalize(date.getHours())}:${normalize(date.getMinutes())}:${normalize(date.getSeconds())}`;
}

function getTextLog(type, playerName1, playerName2) {
    switch (type) {
        case 'start':
            return LOGS[type]
                .replace('[time]', getTime())
                .replace('[player1]', playerName1)
                .replace('[player2]', playerName2);
        case 'end':
            return LOGS[type][getRandom(LOGS[type].length) - 1]
                .replace('[playerLose]', playerName1)
                .replace('[playerWins]', playerName2);
        case 'hit':
            return LOGS[type][getRandom(LOGS[type].length) - 1]
                .replace('[playerKick]', playerName1)
                .replace('[playerDefence]', playerName2);
        case 'defence':
            return LOGS[type][getRandom(LOGS[type].length) - 1]
                .replace('[playerKick]', playerName1)
                .replace('[playerDefence]', playerName2);
        case 'draw':
            return LOGS[type];
    }
}

function generateLogs(type, {name: playerName1} = {}, {name: playerName2, hp} = {}, valueAttack = 0) {

    let text = getTextLog(type, playerName1, playerName2);

    switch (type) {
        case 'start':
            break;
        case 'hit':
        case 'defence':
            text = `${getTime()} ${text} -${valueAttack}hp [${hp}/100]`;
            break;
        case 'end':
        case 'draw':
            text = `${getTime()} ${text}`;
            break;
    }
    $chat.insertAdjacentHTML('afterbegin', `<p>${text}</p>`);

}

$formFight.addEventListener('submit', function (e){

    console.log('####: Click GO Button');

    e.preventDefault();
    const {hit: hitEnemy, defence: defenceEnemy, value: valueEnemy} = enemyAttack();
    const {hit, defence, value} = playerAttack();

    if (defence !== hitEnemy) {
        player1.changeHP(valueEnemy);
        player1.renderHP();

        generateLogs('hit',player2, player1, valueEnemy);

    }
    else {
        generateLogs('defence', player2, player1);
    }

    if (hit !== defenceEnemy) {
        player2.changeHP(value);
        player2.renderHP();

        generateLogs('hit', player1, player2, value);

    }
    else {
        generateLogs('defence', player1, player2);
    }

    showResult();
})


function init() {
    $arenas.appendChild(createPlayer(player1));
    $arenas.appendChild(createPlayer(player2));
    generateLogs('start', player1, player2);
}

init();
