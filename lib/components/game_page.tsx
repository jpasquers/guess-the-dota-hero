import { useEffect, useState } from "react";
import { STARTING_SCORE, SCORE_LOSS_PER_GUESS, SCORE_LOSS_PER_HINT } from "../config";
import { getCommonHints, getGameInstance, getReorderedUniqueHints } from "../repository";
import { Guesses } from "./guesses";
import { Hints } from "./hints";
import { Guess, Hint } from "./model";
import { ScoreCard } from "./score_card";
import { SubmitGuess } from "./submit_guess";

import style from "./game_page.module.css";
import { Page } from "./page";

export interface GamePageProps {
    seed: string;
}

export const GamePage = (props: GamePageProps) => {
    let instance = getGameInstance(props.seed);
    let orderedUniqueHints = getReorderedUniqueHints(instance);
    let commonHints = getCommonHints(instance);
    let totalHints = [...commonHints, ...orderedUniqueHints];
    let [currentHints, setCurrentHints] = useState<Hint[]>(commonHints.map(hint => ({text: hint})));
    let [currentGuesses, setCurrentGuesses] = useState<Guess[]>([]);
    let [currentScore, setCurrentScore] = useState(STARTING_SCORE);
    let maxAllowedGuesses = Math.floor(STARTING_SCORE / SCORE_LOSS_PER_GUESS); 

    const nextHint = () => {
        let nextIndex = currentHints.length;
        if (nextIndex < totalHints.length) {
            setCurrentScore(Math.max(currentScore - SCORE_LOSS_PER_HINT, 0));
            setCurrentHints([
                ...currentHints,
                {
                    text: totalHints[nextIndex],
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
    };

    return (
        <Page>
            <div className={style.sections}>
                <Guesses guesses={currentGuesses}></Guesses>
                <Hints
                    hints={currentHints}
                    totalCount={totalHints.length}
                    nextHint={nextHint}
                ></Hints>
                <ScoreCard score={currentScore}></ScoreCard>
            </div>
            <SubmitGuess submit={submitGuess}></SubmitGuess>
        </Page>
    );
};
