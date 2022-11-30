import { useState } from 'react';
import Modal from 'react-modal';
import { GameInstance, Hero } from '../model';
import Image from "next/image";

import styles from "./end_screen.module.css";
import { generateRandomGameInstance, getGameSeed } from '../repository';
import { Guess } from './model';
import moment from 'moment';

export interface EndScreenProps {
    hintsUsed: number;
    guesses: Guess[];
    score: number;
    instance: GameInstance;
    daily: boolean;
    isOpen: boolean;
    setIsOpen: (x: boolean) => void;
}

export const EndScreen = (props: EndScreenProps) => {
    const [copied, setCopied] = useState(false);
    const playMore = () => {
        let newInstance = generateRandomGameInstance();
        //Next router is behaving very strangely, no reason a raw link won't work.
        window.location.href = `/more/${getGameSeed(newInstance)}`;
    }

    const share = () => {
        const title = props.daily 
            ? `GTDH - Daily ${moment.utc().format("MM/DD")}` 
            : `GTDH - Random ${getGameSeed(props.instance)}`;
        const hintsText = '🄷'.repeat(props.hintsUsed);
        const guessesText = props.guesses.map(guess => guess.correct ? "🟩" : "🟥").join("");
        const url = `https://guess-the-dota-hero.io${window.location.pathname}`;
        const fullText = `${title}\n\n${hintsText}\n\n${guessesText}\nScore: ${props.score}\n\n${url}`;
        if (navigator.share) {
            navigator.share({
                text: fullText,
                //url: url,
                //title: title
            })
        }
        else {
            navigator.clipboard.writeText(fullText);
            setCopied(true);
        }
    }
    
    return <Modal className={styles.modal} overlayClassName={styles.overlay} isOpen={props.isOpen}>
        <button onClick={() => props.setIsOpen(false)} className={styles.close}>X</button>
        <div className={styles.contentContainer}>
            <div className={styles.congrats}>{props.score > 0 ? "Congratulations!" : "Ooooof"}</div>
            <div className={styles.hero}>
                <Image
                    className={styles.heroImg}
                    width="400px"
                    height="200px"
                    alt=""
                    src={`/heroes/${props.instance.hero.name}.png`}
                >
                </Image>
                <div className={styles.heroName}>{props.instance.hero.localized_name}</div>
            </div>
            <div className={styles.score}>Your Score: {props.score}</div>
            <div className={styles.sharing}>
                <button className={styles.share} onClick={share}>
                    Share&nbsp;
                    <Image src="/share_icon_2.png" width="20px" height="20px" alt="share"/>
                </button>
                {copied ? <div className={styles.copied}>Copied &#10003;</div> : <></>}
            </div>
            <button className={styles.more} onClick={playMore}>Play More?</button>
        </div>
    </Modal>;
}
