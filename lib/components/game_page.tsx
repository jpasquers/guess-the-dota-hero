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
import { TopNav } from "./top_nav";
import { GameInstance } from "../model";

const localStorageKey = "GTDH_SEED_STATES";

export interface GamePageProps {
    seed: string;
    isDaily: boolean;
}

export interface GameState {
    currentHints: Hint[];
    currentGuesses: Guess[];
    currentScore: number;
    gameEnded: boolean;
}

export const gameStart = (instance: GameInstance): GameState => {
    return {
        currentHints: getReorderedUniqueHints(instance).map((hint,i) => {
            let unlocked = i === 0;
            return {
                text: hint, unlocked: unlocked
            }
        }),
        currentGuesses: [],
        currentScore: STARTING_SCORE,
        gameEnded: false
    }
}

export const getStore = (): object => {
    return JSON.parse(window.localStorage.getItem(localStorageKey) ?? "{}");
}

export const saveFinishState = (seed: string, gameState: GameState) => {
    let storage = getStore();
    if (!storage) storage = {};
    storage[seed] = gameState;
    window.localStorage.setItem(localStorageKey, JSON.stringify(storage));
}

export const GamePage = (props: GamePageProps) => {
    let instance = getGameInstance(props.seed);
    let [gameState, setGameState] = useState<GameState>(gameStart(instance));
    
    useEffect(() => {
        const storage = getStore();
        if (props.seed in storage) {
            setGameState(storage[props.seed]);
        }
    }, [props.seed]);

    let [resultsOpen, setResultsOpen] = useState(false);
    let maxAllowedGuesses = Math.floor(STARTING_SCORE / SCORE_LOSS_PER_GUESS); 

    useEffect(() => {
        setResultsOpen(gameState.gameEnded)
    }, [gameState]);
    const unlockHint = (idx: number) => {
        if (gameState.currentHints[idx].unlocked) return;
        let lostScore = gameState.gameEnded ? 0 : SCORE_LOSS_PER_HINT;
        let newScore = Math.max(gameState.currentScore - lostScore, 0);
        let nextHints = [...gameState.currentHints];
        nextHints[idx].unlocked = true;
        setGameState({
            ...gameState,
            currentScore: newScore,
            currentHints: nextHints
        })
    };

    const setModalOpen = (open: boolean) => {
        setResultsOpen(open);
    }

    const alreadyGuessed = (id) => {
        return !!gameState.currentGuesses.find(
            guess => guess.heroId === id
        );
    }

    const submitGuess = (id) => {
        if (alreadyGuessed(id)) return;
        let isCorrect = id === instance.hero.id;
        let gameEnded = false;
        let newScore = gameState.currentScore;
        if (!isCorrect) {
            newScore = Math.max(gameState.currentScore - SCORE_LOSS_PER_GUESS, 0);
            if (newScore === 0) {
                gameEnded = true;
            }

        }
        else {
            gameEnded = true;
        }
        let newState = {
            ...gameState,
            gameEnded: gameEnded,
            currentScore: newScore,
            currentGuesses: [
                ...gameState.currentGuesses,
                {
                    correct: isCorrect,
                    heroId: id,
                },
            ]   
        }
        setGameState(newState);
        if (newState.gameEnded) {
            saveFinishState(props.seed, newState);
        }

    };

    return (
        <Page>
            <TopNav isDaily={props.isDaily}></TopNav>
            {
                gameState.gameEnded ? 
                <EndScreen 
                    isOpen={resultsOpen}
                    setIsOpen={setModalOpen}
                    daily={props.isDaily}
                    score={gameState.currentScore}
                    instance={instance}
                    hintsUsed={gameState.currentHints.filter(hint => hint.unlocked).length}
                    guesses={gameState.currentGuesses}
                ></EndScreen> : <></>
            }
            <div className={style.sections}>
                <Column>
                    <Guesses guesses={gameState.currentGuesses}></Guesses>
                </Column>
                <Column>
                    <HeroInfo
                        hero={instance.hero}
                        
                    ></HeroInfo>
                    { gameState.gameEnded 
                        ? <div className={style.viewResultsContainer}>
                            <button className={style.viewResults} onClick={() => setModalOpen(true)}>View Results</button>
                        </div>
                        : <SubmitGuess score={gameState.currentScore} submit={submitGuess}></SubmitGuess>
                    }
                </Column>
                <Column>
                    <Hints 
                        hints={gameState.currentHints}
                        unlockHint={unlockHint}
                        cost={gameState.gameEnded ? 0 : SCORE_LOSS_PER_HINT}
                    />
                </Column>
                
            </div>
        </Page>
    );
};
