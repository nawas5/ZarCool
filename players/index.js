

const IMG = {
    SCORPION: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    KITANA: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    LIUKANG: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
    SONYA: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    SUBZERO: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
};

export const player1 = {
    player: 1,
    name: 'SCORPION',
    hp: 100,
    img: IMG['SCORPION'],
    weapon: ['Sweet Voice'],
    changeHP,
    elHP,
    renderHP,
};

export const player2 = {
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