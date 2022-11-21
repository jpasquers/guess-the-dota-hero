import { useRouter } from "next/router";
import { ReactElement } from "react";
import { GamePage } from "../../lib/components/game_page";

const Random = (): ReactElement => {
    const router = useRouter();
    const { gameId } = router.query ?? {gameId: null};
    return (
        <div className="page">
            {gameId 
                ? <GamePage
                    seed={gameId as string}
                ></GamePage>
                : <></>};
        </div>
    );
};

export default Random;
