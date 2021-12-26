import {createElement} from '../utils/index.js';
import {generateLogs} from '../logs/index.js';

const $arenas = document.querySelector('.arenas');
const $chat = document.querySelector('.chat');

const createPlayer = ({ name, player, hp, img}) => {
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

const playerLose = ({name: playerName}) => {
    const $loseTitle = createElement('div', 'loseTitle');
    if (playerName) {
        $loseTitle.innerText = `${playerName} Wins`;
    } else {
        $loseTitle.innerText = 'Draw';
    }
    return $loseTitle;
}

const createReloadButton = () => {
    const $reloadButtonDiv = createElement('div','reloadWrap');
    const $reloadButton = createElement('button', 'button');
    $reloadButton.innerHTML = 'Reload';

    $reloadButton.addEventListener('click', function (){
        window.location.reload();
    })

    $reloadButtonDiv.appendChild($reloadButton);
    $arenas.appendChild($reloadButtonDiv);
}

export const showResult = (player1, player2) => {
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


export const createChatText = (text) => {
    $chat.insertAdjacentHTML('afterbegin', `<p>${text}</p>`);
}

export const renderPlayer = (player) => {
    $arenas.appendChild(createPlayer(player));
}