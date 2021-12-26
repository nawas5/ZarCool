const IMG = {
    SCORPION: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    KITANA: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    LIUKANG: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
    SONYA: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    SUBZERO: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
};

class Player {
    constructor(props) {
        this.player = props.player;
        this.name = props.name;
        this.hp = props.hp;
        this.img = props.img;
    }
    changeHP = function changeHP(randomNumber) {
        this.hp -= randomNumber;
        if (this.hp <= 0) {
            this.hp = 0;
        }
    }
    elHP = () => document.querySelector(`.player${this.player} .life`);
    renderHP = () =>(this.elHP()).style.width = `${this.hp}%`;
}

export const player1 = new Player ({
    player: 1,
    name: 'SCORPION',
    hp: 100,
    img: IMG['SCORPION'],
    weapon: ['Sweet Voice'],
})

export const player2 = new Player ({
    player: 2,
    name: 'SUBZERO',
    hp: 100,
    img: IMG['SUBZERO'],
    weapon: ['Round videos in Telegram'],
})