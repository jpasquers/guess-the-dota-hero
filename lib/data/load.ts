import { HeroDetails, GameInstance } from "./model";
import heroesWithHints from "./heroes_with_hints.json";


const generateRandomGameInstance = (): GameInstance => {
    let hero = randomHero();
    let hintOrder = randomHintOrder(hero.hints.length);
}

const randomHero = (): HeroDetails => {
    return pickRandom(heroesWithHints);
}

const randomHintOrder = (hintCount: number): number[] => {
    let basicOrder = Array.from({
        length: hintCount
    }, (item, index) => index);
    return shuffle(basicOrder);
}

const generateEffectiveHints = (hints: string[], hintOrder: number[]) => {
    //TODO
}

const pickRandom = <T> (arr: T[]): T => {
    return arr[Math.floor(Math.random()*arr.length)];
}

const shuffle = <T> (arr: T[]): T[] => {
    return arr
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
}