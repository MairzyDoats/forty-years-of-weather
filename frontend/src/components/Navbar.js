import React from "react";

export default function Navbar() {
    return (
        <header className="nav">
            <ul className="nav__list">
                <li className="nav__link"><h1 className="nav__brand"><a href="/">40 Years Of Weather</a></h1></li>
                <li className="nav__link">Hamburg</li>
            </ul>
        </header>
    )
}