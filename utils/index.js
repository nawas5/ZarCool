export const getRandom = (number) => Math.ceil(Math.random() * number);

export const getTime = () => {
    const date = new Date;
    const normalize = (num) => (num.toString().length > 1 ? num: `0${num}`);
    return `${normalize(date.getHours())}:${normalize(date.getMinutes())}:${normalize(date.getSeconds())}`;
}

export const createElement = (tag, className) => {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    return $tag
}

export const createDiv = (className) => createElement('div', className);
