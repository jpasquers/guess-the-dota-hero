import { Hero, GameInstance, HeroMeta } from "./model";
import heroes from "../data/heroes.json";
import uniqueHeroHints from "../data/unique_hero_hints.json";
import moment from "moment";
import dailies from "../data/dailies.json";
import { MAX_HINT_COUNT } from "./config";

export const generateRandomGameInstance = (): GameInstance => {
    let hero = randomHero();
    let uniqueHints = loadHeroUniqueHints(hero);
    let uniqueHintOrder = randomHintOrder(uniqueHints.length).slice(0,MAX_HINT_COUNT);
    return {
        hero,
        hintDisplayOrder: uniqueHintOrder,
    };
};

export const loadHeroMeta = (hero: Hero): HeroMeta => {
    let meta = require(`../data/hero_meta/${hero.name}.json`) as HeroMeta;
    return meta;
}

export const getReorderedUniqueHints = (instance: GameInstance) => {
    let hints = loadHeroUniqueHints(instance.hero);
    return reorderHints(hints, instance.hintDisplayOrder);
}

export const loadHeroUniqueHints = (hero: Hero): string[] => {
    return uniqueHeroHints[hero.name];
}

export const getDailySeed = (): string => {
    let dayKey = moment.utc().format("MM/DD/YYYY");
    if (dailies[dayKey]) return dailies[dayKey];
    throw new Error("Couldn't find daily seed");
}

export const getGameSeed = (instance: GameInstance): string => {
    return Buffer.from(
        JSON.stringify([instance.hero.id, ...instance.hintDisplayOrder]).replace("[","").replace("]", "")
    ).toString("base64");
};

export const getGameInstance = (seed: string): GameInstance => {
    const [id, ...hintOrder] = JSON.parse(
        "[" + Buffer.from(seed, "base64").toString() + "]"
    );
    let cappedHintOrder = hintOrder.slice(0,MAX_HINT_COUNT);
    const hero = getHeroById(id);
    return {
        hero: hero,
        hintDisplayOrder: cappedHintOrder,
    };
};

export const getAllHeroes = () => {
    return heroes;
};

export const getHeroById = (id: number): Hero => {
    return heroes.find((hero) => hero.id === id);
};

export const getHeroByName = (name: string): Hero => {
    return heroes.find((hero) => hero.name === name);
}

export const randomHero = (): Hero => {
    return pickRandom(heroes);
};

export const randomHintOrder = (hintCount: number): number[] => {
    return shuffle(arrayOfIndices(hintCount));
};

export const reorderHints = (
    hints: string[],
    hintOrder: number[]
): string[] => {
    //The hint order also dictates the amount of hints displayed
    return arrayOfIndices(hintOrder.length).map((idx) => hints[hintOrder[idx]]);
};



export const arrayOfIndices = (len: number): number[] => {
    return Array.from(
        {
            length: len,
        },
        (item, index) => index
    );
};

export const pickRandom = <T>(arr: T[]): T => {
    return arr[Math.floor(Math.random() * arr.length)];
};

export const shuffle = <T>(arr: T[]): T[] => {
    return arr
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
};
