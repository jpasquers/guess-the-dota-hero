import { ReactElement } from "react";
import { GamePage } from "../../lib/components/game_page";

export interface RandomProps {
    id: string;
}

const Random = ({id}): ReactElement => {
    return (
        <div className="page">
            <GamePage
                seed={id}
            ></GamePage>
        </div>
    );
};

export default Random;
