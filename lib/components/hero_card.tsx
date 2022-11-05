import Image from "next/image";
import { Hero } from "../model";

import styles from "./hero_card.module.css";

export interface HeroCardProps {
    hero: Hero;
}

export interface HeroLogoProps {
    hero: Hero;
    customClass?: string;
    height?: string;
    width?: string;
}

export const HeroCard = ({ hero }: HeroCardProps) => {
    return <div className={styles.heroCard}>
        <HeroLogo hero={hero} customClass={styles.heroCardLogo}/> 
        <span className={styles.heroCardText}>{hero.localized_name}</span>
    </div>
}

export const HeroLogo = ({ hero, customClass, height, width }: HeroLogoProps) => {
    return (
        <Image
            className="hero-logo"
            width={width ?? "20px"}
            height={height ?? "20px"}
            alt=""
            src={`/heroes/icons/${hero.name}.png`}
        ></Image>
    );
};
