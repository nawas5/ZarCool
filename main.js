const $arenas = document.querySelector('.arenas');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');

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

function createPlayer(playerObject) {
    const $player = createElement('div',  `player${playerObject.player}`);
    const $progressbar = createElement('div', 'progressbar');
    const $character = createElement('div', 'character');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $img = createElement('img');

    $life.style.width = `${playerObject.hp}%`;
    $name.innerText = playerObject.name;
    $img.src = playerObject.img;

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
    if (player1.hp === 0 || player2.hp === 0) {
        createReloadButton();
    }

    if (player1.hp > 0 && player2.hp === 0) {
        $arenas.appendChild(playerWins(player1.name));
        generateLogs('end', player2, player1);

    } else if (player1.hp === 0 && player2.hp > 0) {
        $arenas.appendChild(playerWins(player2.name));
        generateLogs('end', player1, player2);

    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(playerWins());
        generateLogs('draw');
    }
}

function generateLogs(type, player1, player2, damage = 0) {

    const date = new Date;
    const normalize = (num) => (num.toString().length > 1 ? num: `0${num}`);
    const time = `${normalize(date.getHours())}:${normalize(date.getMinutes())}:${normalize(date.getSeconds())}`;

    function whereText(type) {
        switch (type) {
            case 'start':
                return LOGS[type]
                    .replace('[time]', time)
                    .replace('[player1]', player1.name)
                    .replace('[player2]', player2.name);
            case 'end':
                return `${time} - ${LOGS[type][getRandom(LOGS[type].length) - 1]}`
                    .replace('[playerLose]', player1.name)
                    .replace('[playerWins]', player2.name);
            case 'hit':
                return `${time} - ${LOGS[type][getRandom(LOGS[type].length) - 1]}  [${damage}xp]  [${player2.hp}/100]`
                    .replace('[playerKick]', player1.name)
                    .replace('[playerDefence]', player2.name);
            case 'defence':
                return `${time} - ${LOGS[type][getRandom(LOGS[type].length) - 1]}  [${damage}xp]  [${player2.hp}/100]`
                    .replace('[playerKick]', player1.name)
                    .replace('[playerDefence]', player2.name);
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

    console.log('####: a', player);
    console.log('####: e', enemy);

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