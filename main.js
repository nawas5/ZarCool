import {gameAffect} from './game/logic.js';
import {player1, player2} from './players/index.js';
import {generateLogs} from './logs/index.js';
import {renderPlayer, showResult} from './game/layout.js';

const init = () => {
    const $arenas = document.querySelector('.arenas');
    const $chat = document.querySelector('.chat');
    const $formFight = document.querySelector('.control');
    $formFight.addEventListener('submit', function (e){
        console.log('####: Click GO Button');
        e.preventDefault();
        gameAffect($formFight, $chat, player1, player2);
        showResult($arenas, $chat, player1, player2);
    })

    renderPlayer($arenas, player1);
    renderPlayer($arenas, player2);
    generateLogs($chat, 'start', player1, player2);
}

init();

