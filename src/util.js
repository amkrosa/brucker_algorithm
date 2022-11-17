export const randomInt = (max) => Math.floor(Math.random() * max);
export const randomIntBetween = (min, max) => Math.random() * (max - min) + min;
export const randomColor = () => `${randomIntBetween(50, 200)}, ${randomIntBetween(50, 200)}, ${randomIntBetween(50, 200)}`