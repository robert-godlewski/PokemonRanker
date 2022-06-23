import React from 'react';
import {Link} from 'react-router-dom';


const NavBar = () => {
    return (
        <header>
            <h1>Pokemon</h1>
            <Link to={'/'}>All Pokemon</Link>
        </header>
    );
};


export default NavBar;
