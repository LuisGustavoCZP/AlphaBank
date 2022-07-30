/* eslint-disable react/react-in-jsx-scope */
import { Navigate, Link } from 'react-router-dom';
//

interface NavigatorItemProps
{
    title: string
    to : string
    children? : JSX.Element
}

export function NavigatorItem (props : NavigatorItemProps)
{
    const {title, to, children} = props;
    return (
        <li className='nav-item'>
            <Link className="nav-btn" to={to}>
                {children}
            </Link>
            <span>{title}</span>
        </li>
    );
}