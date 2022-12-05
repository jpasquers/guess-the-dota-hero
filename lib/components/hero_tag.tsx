import Image from "next/image";
import { Hero } from "../model";

import styles from "./hero_tag.module.css";

export interface HeroTagProps {
    hero: Hero;
    textClazz?: string;
}

export interface HeroLogoProps {
    hero: Hero;
    customClass?: string;
    height?: string;
    width?: string;
}

export const getHeroIconSrc = (hero: Hero) => {
    return `
    https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/icons/${hero.name}.png
    `;
}

export const HeroTag = ({ hero, textClazz }: HeroTagProps) => {
    return <div className={styles.heroCard}>
        <HeroLogo hero={hero} customClass={styles.heroCardLogo}/> 
        <span className={styles.heroCardText + " " + textClazz}>{hero.localized_name}</span>
    </div>
}

export const HeroLogo = ({ hero, customClass, height, width }: HeroLogoProps) => {
    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            className="hero-logo"
            width={width ?? "25px"}
            height={height ?? "25px"}
            alt=""
            src={getHeroIconSrc(hero)}
        ></img>
    );
};
