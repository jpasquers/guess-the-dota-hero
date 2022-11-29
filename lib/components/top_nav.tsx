
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { generateRandomGameInstance, getGameSeed } from "../repository";
import styles from "./top_nav.module.css";

export interface TopNavProps {
    isDaily: boolean;
}

export const TopNav = (props: TopNavProps) => {

    //Stupid SSR necessitates this.
    const [isDesktop, setIsDesktop] = useState(false);
    let mediaQuery = useMediaQuery({minWidth: 750});
    useEffect(() => {
        if (mediaQuery !== isDesktop) {
            setIsDesktop(mediaQuery);
        }

    }, [mediaQuery]);

    //TODO this is duped....
    const playMore = () => {
        let newInstance = generateRandomGameInstance();
        window.location.href = `/more/${getGameSeed(newInstance)}`;
    }

    return <div className={styles.container}>
        <div className={styles.items}>
            <Link href="/daily">
                <div className={styles.itemContainer}>
                    <div className={styles.daily + " " + styles.item + " " + (props.isDaily ? styles.itemActive : "")}>
                        {isDesktop 
                            ? "Daily" 
                            : <Image 
                                src={props.isDaily ? "/calendar_icon_blue.png" : "/calendar_icon_white.png"} 
                                width="35px" 
                                height="35px">
                            </Image>
                        }
                    </div>
                </div>
                
            </Link>
            <div className={styles.itemContainer}>
                <div className={styles.item + " " + (props.isDaily ? "" : styles.itemActive)} onClick={playMore}>
                    {isDesktop 
                        ? "Random" 
                        : <Image 
                            src={props.isDaily ? "/dice_icon_white.png" : "/dice_icon_blue.png"} 
                            width="35px" 
                            height="35px">
                        </Image>
                    }
                </div>
            </div>
        </div>
    </div>
}