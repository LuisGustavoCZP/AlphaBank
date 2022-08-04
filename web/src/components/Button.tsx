/* eslint-disable react/react-in-jsx-scope */

import { MouseEventHandler } from "react";

interface PropTypes{
    label: string;
    category?: '' | 'primary' | 'secondary' | 'cancel';
    onClick: MouseEventHandler<HTMLButtonElement>; 
    className?: string
}

export function Button (props: PropTypes)
{
    function onClick (e : any)
    {
        e.preventDefault();
        props.onClick(e);
    }

    return (
        <button className={`${props.className?`${props.className} `:''}btn${props.category || props.category != ''?` ${props.category}`:''}`} onClick={onClick}>{props.label}</button>
    );
}