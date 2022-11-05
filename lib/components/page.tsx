import { ReactNode } from "react";

import style from "./page.module.css";

export interface PageProps {
    children: ReactNode;
}

export const Page = ({ children }: PageProps) => {
    return (
        <div className={style.page}>
            <div className={style.header}></div>
            {children}
        </div>
    );
};
