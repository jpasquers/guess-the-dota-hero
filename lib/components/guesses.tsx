import { ReactElement } from "react";
import { getHeroById } from "../repository";
import { Guess } from "./model";
import { Section } from "./section";

import style from "./guesses.module.css";
import { HeroTag, HeroLogo } from "./hero_tag";

export interface GuessesProps {
    guesses: Guess[];
}

export const Guesses = ({ guesses }: GuessesProps) => {
    return (
        <Section
            title="Guesses"
            boxClazz={style.sectionBox}
            sectionClazz={style.section}
        >
            {
                guesses.length === 0 
                    ? <EmptyGuess/> 
                    : <></>
            }
            {guesses.map((guess): ReactElement => {
                let hero = getHeroById(guess.heroId);
                return (
                    <div
                        key={hero.id}
                        className={
                            guess.correct
                                ? style.correct + " " + style.guess
                                : style.incorrect + " " + style.guess
                        }
                    >
                        <HeroTag hero={hero}></HeroTag>
                    </div>
                );
            })}
        </Section>
    );
};

export const EmptyGuess = () => {
    return <div className={style.guess + " " + style.empty}>
        <div className={style.emptyLogo}></div>
        <div className={style.emptyText}></div>
    </div>
}
