import { Hint } from "./model";
import { Section } from "./section";

import style from "./hints.module.css";
import ReactTyped from "react-typed";

export interface HintsProps {
    hints: Hint[];
    totalCount: number;
    nextHint: () => void;
}

export const Hints = ({ hints, totalCount, nextHint }: HintsProps) => {
    let rendered = Array.from({ length: totalCount }, (val, i) => {
        return i < hints.length ? hints[i] : { text: `Hint #${i+1}` };
    });
    return (
        <Section title="Hints">
            <div className={style.hintsContainer}>
                {rendered.map((hint, i) => {
                    return (
                        <ReactTyped strings={[
                            hint.text
                        ]} showCursor={false} typeSpeed={25} className={style.hint} key={i + hint.text}/>
                    );
                })}
            </div>
            <div className={style.nextHintContainer}>
                <button className={style.nextHint} onClick={nextHint}>
                    + Next Hint
                </button>
            </div>
        </Section>
    );
};
