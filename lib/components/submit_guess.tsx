import { ReactElement, ReactNode, useState } from "react";
import { getAllHeroes, getHeroByName } from "../repository";
import { HeroTag } from "./hero_tag";

import {SCORE_LOSS_PER_GUESS, STARTING_SCORE} from "../config";

import Select, { createFilter } from "react-select";


import style from "./submit_guess.module.css";
import CountUp from "react-countup";
import { useMediaQuery } from "react-responsive";

export interface SubmitGuessProps {
    submit: (id: number) => void;
    score: number;
}

interface HeroOption {
    searchKey: string;
    label: JSX.Element,
    value: number;
}

export const SubmitGuess = ({ submit, score }: SubmitGuessProps) => {
    let heroes = getAllHeroes();
    let isDesktop = useMediaQuery({minWidth: 750});

    let [selected, setSelected] = useState<number|undefined>(undefined);
    
    let options = heroes.map(hero => ({
        searchKey: hero.localized_name,
        label: <HeroTag hero={hero} textClazz={style.guessOptiontext}/>,
        value: hero.id
    }));

    const filterConfig = {
        stringify: option => option.data.searchKey
    }

    return (
        <div className={style.section}>
            <div className={style.submitSection}>
                <Select 
                    className={style.heroSelect}
                    filterOption={createFilter(filterConfig)}
                    onChange={(selectedOption) => {
                        let val = typeof selectedOption.value === "string" ? parseInt(selectedOption.value) : selectedOption.value;
                        setSelected(val);
                    }}
                    placeholder="Search Heroes"
                    options={options}
                    maxMenuHeight={150}
                    menuPlacement={isDesktop ? 'auto' : 'top'}
                />
                <button disabled={!selected} className={style.submit} onClick={() => submit(selected)}>
                    Guess ({SCORE_LOSS_PER_GUESS}c)
                </button>
            </div>
            <div className={style.score}>
                Score:&nbsp;
                <CountUp className={style.scoreValue} start={STARTING_SCORE} end={score} preserveValue={true} duration={0.8}/>
                c
            </div>
        </div>
    );
};
