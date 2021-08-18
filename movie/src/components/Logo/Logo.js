import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../../assets/img/logo/theaterRB.svg';

export default function Logo(props) {
    return (
        <NavLink to="/" aria-label="Back to homepage" className="flex items-center p-2">
            <img src={logo} alt="logo" className="w-20 h-20" />
            <span className="text-purple-400 text-5xl pl-3">Movie</span>
        </NavLink>
    )
}
