import { useEffect, useState } from "react";
import { STARTING_SCORE, SCORE_LOSS_PER_GUESS, SCORE_LOSS_PER_HINT } from "../config";
import { getGameInstance, getReorderedUniqueHints } from "../repository";
import { Guesses } from "./guesses";
import { HeroInfo } from "./hero_info";
import { Guess, Hint } from "./model";
import { SubmitGuess } from "./submit_guess";

import style from "./game_page.module.css";
import { Page } from "./page";
import { Column, Section } from "./section";
import { Hints } from "./hints";
import { EndScreen } from "./end_screen";

export interface GamePageProps {
    seed: string;
    isDaily: boolean;
}

export const GamePage = (props: GamePageProps) => {
    let instance = getGameInstance(props.seed);
    let orderedHints = getReorderedUniqueHints(instance).map((hint,i) => {
        let unlocked = i === 0;
        return {
            text: hint, unlocked: unlocked
        }
    });
    let [currentHints, setCurrentHints] = useState<Hint[]>(orderedHints);
    let [currentGuesses, setCurrentGuesses] = useState<Guess[]>([]);
    let [currentScore, setCurrentScore] = useState(STARTING_SCORE);
    let [gameEnded, setGameEnded] = useState(false);
    let maxAllowedGuesses = Math.floor(STARTING_SCORE / SCORE_LOSS_PER_GUESS); 

    const unlockHint = (idx: number) => {
        if (currentHints[idx].unlocked) return;
        setCurrentScore(Math.max(currentScore - SCORE_LOSS_PER_HINT, 0));
        let nextHints = [...currentHints];
        nextHints[idx].unlocked = true;
        setCurrentHints(nextHints);
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
            let newScore = Math.max(currentScore - SCORE_LOSS_PER_GUESS, 0);
            setCurrentScore(newScore);
            if (newScore === 0) {
                setGameEnded(true);
            }

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
                    daily={props.isDaily}
                    score={currentScore}
                    instance={instance}
                    hintsUsed={currentHints.filter(hint => hint.unlocked).length}
                    guesses={currentGuesses}
                ></EndScreen> : <></>
            }
            <div className={style.sections}>
                <Column>
                    <Guesses guesses={currentGuesses}></Guesses>
                </Column>
                <Column>
                    <HeroInfo
                        hero={instance.hero}
                        
                    ></HeroInfo>
                    <SubmitGuess score={currentScore} submit={submitGuess}></SubmitGuess>
                </Column>
                <Column>
                    <Hints 
                        hints={currentHints}
                        totalCount={orderedHints.length}
                        unlockHint={unlockHint}/>
                </Column>
                
            </div>
        </Page>
    );
};
