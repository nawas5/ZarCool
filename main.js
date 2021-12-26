import {gameAffect} from './game/logic.js';
import {player1, player2} from './players/index.js';
import {generateLogs} from './logs/index.js';
import {renderPlayer, showResult} from './game/layout.js';

const init = () => {
    const $formFight = document.querySelector('.control .button');
    $formFight.addEventListener('submit', function (e){
        console.log('####: Click GO Button');
        e.preventDefault();
        gameAffect(player1, player2);
        showResult(player1, player2);
    })

    renderPlayer(player1);
    renderPlayer(player2);
    generateLogs('start', player1, player2);
}

init();

export class $formFight {
}