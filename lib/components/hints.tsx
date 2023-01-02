import { Hint } from "./model";
import { Section } from "./section";

import style from "./hints.module.css";
import ReactTyped from "react-typed";

export interface HintsProps {
    hints: Hint[];
    unlockHint: (idx) => void;
    cost: number;
}

export const Hints = ({ hints, unlockHint, cost }: HintsProps) => {
    return (
        <Section title="Hints">
            <div className={style.hintsContainer}>
                {hints.map((hint, i) => {
                    let text = hint.unlocked ? hint.text : `Hint #${i+1}`;
                    console.log(text);
                    return (
                        <div  key={i + "_" + hint.text + "_" + hint.unlocked} className={style.hintContainer}>
                            <ReactTyped strings={[
                                text
                            ]} showCursor={false} typeSpeed={25} className={style.hint}/>
                            {hint.unlocked ? <></> : 
                                <button onClick={() => unlockHint(i)} className={style.hintButton}>	
                                    &#128274; ({cost}c)
                                </button>
                            }
                        </div>
                    );
                })}
            </div>
        </Section>
    );
};
