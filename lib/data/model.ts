export interface GameInstance {
    hero: HeroDetails;
    hint_order: number[];
    effective_hints: string[];
}

export interface HeroDetails {
    name: string;
    id: number;
    localized_name: string;
    hints: string[];
}