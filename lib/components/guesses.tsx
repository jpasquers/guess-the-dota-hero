import { ReactElement } from "react";
import { getHeroById } from "../repository";
import { Guess } from "./model";
import { Section } from "./section";

import style from "./guesses.module.css";
import { HeroCard, HeroLogo } from "./hero_card";

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
                        <HeroCard hero={hero}></HeroCard>
                    </div>
                );
            })}
        </Section>
    );
};
