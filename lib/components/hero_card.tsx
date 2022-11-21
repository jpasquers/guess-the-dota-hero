import Image from "next/image";
import { Hero, HeroMeta } from "../model";
import { loadHeroMeta } from "../repository";

import styles from "./hero_card.module.css";

export interface HeroCardProps {
    hero: Hero;
}



export const HeroCard = ({ hero }: HeroCardProps) => {
    let meta = loadHeroMeta(hero);

    return <div className={styles.cardContainer}>
        <div className={styles.preview}>
            <div className={styles.mystery}>?</div>
            <div className={styles.hp}>{meta.max_health} <span className={styles.healthRegen}>+ {meta.health_regen.toFixed(1)}</span></div>
            <div className={styles.mana}>{meta.max_mana} <span className={styles.manaRegen}>+ {meta.mana_regen.toFixed(1)}</span></div>
        </div>
        <div className={styles.stats}>
            <div className={styles.statsCol}>
                <div className={styles.str}>
                    <Image src="/hero_strength.png" width="40px" height="40px" alt="strength"/>
                    <span className={styles.statText}>
                        <span className={styles.statBase}>{meta.str_base}</span>
                        <span className={styles.statPlus}>+</span>
                        <span className={styles.statGain}>{meta.str_gain}</span>
                    </span>
                </div>
                <div className={styles.agi}>
                    <Image src="/hero_agility.png" width="40px" height="40px" alt="agility"/>
                    <span className={styles.statText}>
                        <span className={styles.statBase}>{meta.agi_base}</span>
                        <span className={styles.statPlus}>+</span>
                        <span className={styles.statGain}>{meta.agi_gain}</span>
                    </span>
                </div>
                <div className={styles.int}>
                    <Image src="/hero_intelligence.png" width="40px" height="40px" alt="intelligence"/>
                    <span className={styles.statText}>
                        <span className={styles.statBase}>{meta.int_base}</span>
                        <span className={styles.statPlus}>+</span>
                        <span className={styles.statGain}>{meta.int_gain}</span>
                    </span>
                </div>
            </div>
            <div className={styles.statsCol}>
                <div className={styles.dmg}>
                    <Image src="/icon_damage.png" width="40px" height="40px" alt="damage"/>
                    <span className={styles.statText}>
                        {meta.damage_min} - {meta.damage_max}
                    </span>
                </div>
            </div>
        </div>
    </div>
}
