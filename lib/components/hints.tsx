import { Hint } from "./model";
import { Section } from "./section";

import style from "./hints.module.css";
import ReactTyped from "react-typed";

export interface HintProps {
    hints: Hint[];
    totalCount: number;
    nextHint: () => void;
}

export const Hints = ({ hints, totalCount, nextHint }: HintProps) => {
    let rendered = Array.from({ length: totalCount }, (val, i) => {
        return i < hints.length ? hints[i] : { text: "" };
    });
    return (
        <Section title="Hints" sectionClazz={style.hintsSection} boxClazz={style.hintsBox}>
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
