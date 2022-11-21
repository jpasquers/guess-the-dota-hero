import { useEffect, useState } from "react";
import { STARTING_SCORE, SCORE_LOSS_PER_GUESS, SCORE_LOSS_PER_HINT } from "../config";
import { getGameInstance, getReorderedUniqueHints } from "../repository";
import { Guesses } from "./guesses";
import { HeroInfo } from "./hero_info";
import { Guess, Hint } from "./model";
import { ScoreCard } from "./score_card";
import { SubmitGuess } from "./submit_guess";

import style from "./game_page.module.css";
import { Page } from "./page";
import { Column, Section } from "./section";
import { Hints } from "./hints";
import { EndScreen } from "./end_screen";

export interface GamePageProps {
    seed: string;
}

export const GamePage = (props: GamePageProps) => {
    let instance = getGameInstance(props.seed);
    let orderedHints = getReorderedUniqueHints(instance);
    let [currentHints, setCurrentHints] = useState<Hint[]>([]);
    let [currentGuesses, setCurrentGuesses] = useState<Guess[]>([]);
    let [currentScore, setCurrentScore] = useState(STARTING_SCORE);
    let [gameEnded, setGameEnded] = useState(false);
    let maxAllowedGuesses = Math.floor(STARTING_SCORE / SCORE_LOSS_PER_GUESS); 

    const nextHint = () => {
        let nextIndex = currentHints.length;
        if (nextIndex < orderedHints.length) {
            setCurrentScore(Math.max(currentScore - SCORE_LOSS_PER_HINT, 0));
            setCurrentHints([
                ...currentHints,
                {
                    text: orderedHints[nextIndex],
                },
            ]);
        }
    };

    const submitGuess = (id) => {
        let isCorrect = id === instance.hero.id;
        setCurrentGuesses([
            ...currentGuesses,
            {
                correct: isCorrect,
                heroId: id,
            },
        ]);
        if (!isCorrect) {
            setCurrentScore(Math.max(currentScore - SCORE_LOSS_PER_GUESS, 0));
        }
        else {
            setGameEnded(true);
        }
    };

    return (
        <Page>
            {
                gameEnded ? 
                <EndScreen 
                    score={currentScore}
                    answer={instance.hero}
                ></EndScreen> : <></>
            }
            <div className={style.sections}>
                <Column>
                    <Guesses guesses={currentGuesses}></Guesses>
                    {/*<ScoreCard score={currentScore}></ScoreCard>*/}
                </Column>
                <Column>
                    <HeroInfo
                        hero={instance.hero}
                        
                    ></HeroInfo>
                    <SubmitGuess submit={submitGuess}></SubmitGuess>
                </Column>
                <Column>
                    <Hints 
                        hints={currentHints}
                        totalCount={orderedHints.length}
                        nextHint={nextHint}/>
                </Column>
                
            </div>
        </Page>
    );
};
