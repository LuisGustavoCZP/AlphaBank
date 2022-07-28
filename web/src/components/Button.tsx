/* eslint-disable react/react-in-jsx-scope */

import { MouseEventHandler } from "react";

interface PropTypes{
    label: string;
    category: 'primary' | 'secondary' | 'cancel';
    onClick: MouseEventHandler<HTMLButtonElement>; 
}

export function Button (props: PropTypes)
{
    return (
        <button className={`btn-${props.category}-base`} onClick={props.onClick}>{props.label}</button>
    );
}