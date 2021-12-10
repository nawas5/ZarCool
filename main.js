
// task #0

const player1 = {
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
    name: 'ZarMarathon',
    hp: 100,
    weapon: 'Round videos in Telegram',
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    attack: function (name) {
        console.log(name + ' Fight...')
    }
}

player2.attack(player2.name);


// task #1

// function createPlayer() {
//
//     const $root = document.querySelector('.root');
//
//     const $player1 = document.createElement('div');
//     $player1.classList.add('player1');
//
//     const $progressbar = document.createElement('div');
//     $progressbar.classList.add('progressbar')
//
//     const $life = document.createElement('div');
//     $life.classList.add('life')
//     $life.style.width = '100%';
//     const $name = document.createElement('div');
//     $name.innerText = 'Scorpion'
//     $name.classList.add('name')
//
//     $progressbar.append($life, $name)
//     $player1.appendChild($progressbar)
//
//     const $character = document.createElement('div');
//     $character.classList.add('character');
//     const $img = document.createElement('img');
//     $img.src = 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif';
//
//     $character.appendChild($img)
//     $player1.appendChild($character)
//
//     $root.appendChild($player1);
//
// }
//
// createPlayer();

// task #2
// const $arenas = document.querySelector('.arenas');
//
// function createPlayerTask2(player, name, hp, img) {
//
//     const $player1 = document.createElement('div');
//     $player1.classList.add(player);
//
//     const $progressbar = document.createElement('div');
//     $progressbar.classList.add('progressbar');
//
//     const $life = document.createElement('div');
//     $life.classList.add('life');
//     $life.style.width = hp + '%';
//     const $name = document.createElement('div');
//     $name.classList.add('name');
//     $name.innerText = name;
//
//     $progressbar.append($life, $name);
//     $player1.appendChild($progressbar);
//
//     const $character = document.createElement('div');
//     $character.classList.add('character');
//     const $img = document.createElement('img');
//     $img.src = img;
//
//     $character.appendChild($img);
//     $player1.appendChild($character);
//
//     $arenas.appendChild($player1);
// }
//
// createPlayerTask2('player1', 'Scorpion', 50, 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif');
// createPlayerTask2('player2', 'Sub-zero', 80, 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif');

// task #3

const $arenas = document.querySelector('.arenas');

function createPlayerTask3(player, playerObject) {

    const $player = document.createElement('div');
    $player.classList.add(player);

    const $progressbar = document.createElement('div');
    $progressbar.classList.add('progressbar');

    const $life = document.createElement('div');
    $life.classList.add('life');
    $life.style.width = playerObject.hp + '%';

    const $name = document.createElement('div');
    $name.classList.add('name');
    $name.innerText = playerObject.name;

    $progressbar.append($life, $name);
    $player.appendChild($progressbar);

    const $character = document.createElement('div');
    $character.classList.add('character');
    const $img = document.createElement('img');
    $img.src = playerObject.img;

    // const $weapon = document.createElement('weapon');
    // $weapon.classList.add('weapon');
    // $weapon.innerText = playerObject.weapon;

    $character.appendChild($img);
    // $character.appendChild($weapon);
    $player.appendChild($character);

    $arenas.appendChild($player);
}


createPlayerTask3('player1', player1);
createPlayerTask3('player2', player2);