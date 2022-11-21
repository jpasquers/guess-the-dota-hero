import { useState } from 'react';
import Modal from 'react-modal';
import { Hero } from '../model';
import Image from "next/image";

import styles from "./end_screen.module.css";
import { generateRandomGameInstance, getGameSeed } from '../repository';

export interface EndScreenProps {
    score: number;
    answer: Hero
}

export const EndScreen = (props: EndScreenProps) => {
    const [isOpen, setIsOpen] = useState(true);
    const playMore = () => {
        let newInstance = generateRandomGameInstance();
        //Next router is behaving very strangely, no reason a raw link won't work.
        window.location.href = `/more/${getGameSeed(newInstance)}`;
    }
    return <Modal className={styles.modal} overlayClassName={styles.overlay} isOpen={isOpen}>
        <button onClick={() => setIsOpen(false)} className={styles.close}>X</button>
        <div className={styles.contentContainer}>
            <div className={styles.congrats}>Congratulations!</div>
            <div className={styles.hero}>
                <Image
                    className={styles.heroImg}
                    width="400px"
                    height="200px"
                    alt=""
                    src={`/heroes/${props.answer.name}.png`}
                >
                </Image>
                <div className={styles.heroName}>{props.answer.localized_name}</div>
            </div>
            <div className={styles.score}>Your Score: 1000</div>
            <div className={styles.sharing}>
                <button className={styles.share}>Share (coming soon)!</button>
            </div>
            <button className={styles.more} onClick={playMore}>Play More?</button>
        </div>
    </Modal>;
}
