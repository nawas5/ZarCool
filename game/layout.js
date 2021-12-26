import {createElement} from '../utils/index.js';
import {generateLogs} from '../logs/index.js';

const createPlayer = ({ player, name, hp, img}) => {
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
    return $reloadButtonDiv;
}

export const showResult = ($arenas, $chat, player1, player2) => {
    const {name: playerName1, hp: hp1} = player1;
    const {name: playerName2, hp: hp2} = player2;

    if (hp1 === 0 || hp2 === 0) {
        $arenas.appendChild(createReloadButton());
    }

    if (hp1 > 0 && hp2 === 0) {
        $arenas.appendChild(playerLose(playerName1));
        generateLogs($chat,'end', player2, player1);

    } else if (hp1 === 0 && hp2 > 0) {
        $arenas.appendChild(playerLose(playerName2));
        generateLogs($chat,'end', player1, player2);

    } else if (hp1 === 0 && hp2 === 0) {
        $arenas.appendChild(playerLose());
        generateLogs($chat,'draw');
    }
}


export const createChatText = ($chat, text) => {
    $chat.insertAdjacentHTML('afterbegin', `<p>${text}</p>`);
}

export const renderPlayer = ($arenas, player) => {
    $arenas.appendChild(createPlayer(player));
}