import React from 'react';
import {Link} from 'react-router-dom';


const NavBar = () => {
    return (
        <header className='container row'>
            <h1 className='col-6'>Pokemon</h1>
            <Link to={'/'} className='col-6'>All Pokemon</Link>
        </header>
    );
};


export default NavBar;
