import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
 
    return (
        <div className='Header'>
             <h3>Instaplant</h3>

             <input type="button" onclick="history.back()" name="volver atrás" value="volver atrás"></input>
        </div>
    );
};

export default Header;