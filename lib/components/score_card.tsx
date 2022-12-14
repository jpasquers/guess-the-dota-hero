import { Section } from "./section";
import CountUp from "react-countup";

export interface ScoreCardProps {
    score: number;
}

import styles from "./score_card.module.css";
import { STARTING_SCORE } from "../config";

export const ScoreCard = ({ score }: ScoreCardProps) => {
    return <Section boxClazz={styles.scoreBox} title="Score">
        <CountUp className={styles.scoreValue} start={STARTING_SCORE} end={score} preserveValue={true} duration={0.8}/>
    </Section>;
};
