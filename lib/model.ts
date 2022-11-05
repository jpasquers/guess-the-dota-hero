export interface GameInstance {
    hero: Hero;
    uniqueHintOrder: number[];
}

export interface Hero {
    name: string;
    id: number;
    localized_name: string;
}

export interface HeroMeta {
    str_base: number;
    str_gain: number;
    agi_base: number;
    agi_gain: number;
    int_base: number;
    int_gain: number;
}
