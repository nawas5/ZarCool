import {gameAffect} from './game/logic.js';
import {generateLogs} from './logs/index.js';
import {renderPlayer, showResult} from './game/layout.js';



// let player1;
// let player2;
//
// class Game {
//     getPlayers = async () => {
//         return fetch('https://reactmarathon-api.herokuapp.com/api/mk/players').then(res => res.json());
//     }
//
//     getEnemy = async () => {
//         return fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose').then(res => res.json());
//     }
//
//     getFight = async () => {
//         return fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
//             method: 'POST',
//             body: JSON.stringify({
//                 hit,
//                 defence,
//             })
//         });
//     }
//
//     start = async () => {
//         const players = await this.getPlayers();
//         const enemy = await this.getEnemy();
//         const p1 = players[getRandom(players.length) - 1];
//         const p2 = players[getRandom(enemy.length) - 1];
//         player1 = new Player ({
//             ...p1,
//             player: 1,
//             rootSelector: 'arenas',
//         });
//         player2 = new Player ({
//             ...p2,
//             player: 2,
//             rootSelector: 'arenas',
//         });
//     }
// }
//
// const game = new Game();
// game.start();

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

