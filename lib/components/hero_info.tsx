import { Hint } from "./model";
import { Section } from "./section";

import style from "./hero_info.module.css";
import ReactTyped from "react-typed";
import { Hero } from "../model";
import { HeroCard } from "./hero_card";
import { loadHeroMeta } from "../repository";

export interface HeroInfoProps {
    hero: Hero;
}

export const HeroInfo = ({ hero }: HeroInfoProps) => {

    return (
        <Section boxClazz={style.infoBox}>
            <HeroCard hero={hero}></HeroCard>
        </Section>
    );
};
