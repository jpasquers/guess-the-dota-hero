import { ReactElement, ReactNode, useState } from "react";
import { getAllHeroes, getHeroByName } from "../repository";
import { HeroCard, HeroLogo } from "./hero_card";

import Select, { createFilter } from "react-select";


import style from "./submit_guess.module.css";
import { stringify } from "querystring";
import { FilterOptionOption } from "react-select/dist/declarations/src/filters";

export interface SubmitGuessProps {
    submit: (id: number) => void;
}

interface HeroOption {
    searchKey: string;
    label: JSX.Element,
    value: number;
}

export const SubmitGuess = ({ submit }: SubmitGuessProps) => {
    let heroes = getAllHeroes();
    let [selected, setSelected] = useState<number>(heroes[0].id);
    
    let options = heroes.map(hero => ({
        searchKey: hero.localized_name,
        label: <HeroCard hero={hero}/>,
        value: hero.id
    }));

    const filterConfig = {
        stringify: option => option.data.searchKey
    }

    return (
        <div className={style.section}>
            <Select 
                className={style.heroSelect}
                filterOption={createFilter(filterConfig)}
                onChange={(selectedOption) => {
                    let val = typeof selectedOption.value === "string" ? parseInt(selectedOption.value) : selectedOption.value;
                    setSelected(val);
                }}
                placeholder="Search Heroes"
                options={options}
            />
            <button className={style.submit} onClick={() => submit(selected)}>
                Submit Guess
            </button>
        </div>
    );
};
