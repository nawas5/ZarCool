import {ATTACK, HIT} from "../constants";
import {getRandom} from "../utils";
import {$formFight} from "./layout";
import {generateLogs} from "../logs";


const enemyAttack = () => {
    const hit = ATTACK[getRandom(ATTACK.length) - 1];
    const defence = ATTACK[getRandom(ATTACK.length) - 1];

    return {
        value: getRandom(HIT[hit]),
        hit,
        defence,
    }
}

const playerAttack = () => {
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

export const gameAffect = (player1, player2) => {
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
}