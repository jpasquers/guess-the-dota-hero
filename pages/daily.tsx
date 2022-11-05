import { ReactElement } from "react";
import { GamePage } from "../lib/components/game_page";
import { getDailySeed } from "../lib/repository";

const Daily = (): ReactElement => {
    return (
        <div className="page">
            <GamePage
                seed={getDailySeed()}
            ></GamePage>
        </div>
    );
};

export default Daily;
