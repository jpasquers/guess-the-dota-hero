export interface GameInstance {
    hero: Hero;
    hintDisplayOrder: number[];
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
    damage_min: number;
    damage_max: number;
    max_health: number;
    max_mana: number;
    health_regen: number;
    mana_regen: number;
}
