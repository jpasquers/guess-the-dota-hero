import React, { ReactNode } from "react";

export interface SectionProps {
    title?: string;
    children: ReactNode;
    sectionClazz?: string;
    boxClazz?: string;
}

export interface ColumnProps {
    children: ReactNode;
}

import style from "./section.module.css";

export const Section = ({
    title,
    children,
    sectionClazz,
    boxClazz,
}: SectionProps) => {
    return (
        <div className={style.section + " " + sectionClazz ?? ""}>
            {title ? <div className={style.sectionTitle}>{title}</div> : <></>}
            <div className={style.sectionBox + " " + boxClazz}>{children}</div>
        </div>
    );
};

export const Column = ({
    children,
}: ColumnProps) => {
   return <div className={style.column}>{children}</div>
}
