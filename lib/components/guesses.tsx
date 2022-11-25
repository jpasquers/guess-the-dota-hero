import { ReactElement, useEffect, useState } from "react";
import { getHeroById } from "../repository";
import { Guess } from "./model";
import { Section } from "./section";

import style from "./guesses.module.css";
import { HeroTag, HeroLogo } from "./hero_tag";
import { useMediaQuery } from "react-responsive";

export interface GuessesProps {
    guesses: Guess[];
}

export const Guesses = ({ guesses }: GuessesProps) => {
    //Stupid SSR necessitates this.
    const [isDesktop, setIsDesktop] = useState(false);
    let mediaQuery = useMediaQuery({minWidth: 900});
    useEffect(() => {
        if (mediaQuery !== isDesktop) {
            setIsDesktop(mediaQuery);
        }

    }, [mediaQuery]);
    return (
        <Section
            title={isDesktop ? "Guesses" : ""}
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
                        {isDesktop ? <HeroTag hero={hero}></HeroTag> : <HeroLogo hero={hero} width="35px" height="35px"></HeroLogo>}
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
