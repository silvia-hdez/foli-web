import React from 'react';
import './Header.css'
import { Link } from 'react-router-dom';


const Header = () => {

    const goBack = () => {
        window.history.back();
      };
      const goForward = () => {
        window.history.forward();
      };
 
    return (
        <div className='Header'>
             <input id='inputButton' type="button" value="<" onClick={goBack} 
             style={{backgroundColor: 'transparent', border:'none', color:'#27AE60'}}/>
             <Link to={`/profile`} style={{display:'flex', textDecoration:'none', color:'black', alignItems:'center'}}><h3>Instaplant</h3></Link>
             <input id='inputButton' type="button" value=">" onClick={goForward}
              style={{backgroundColor: 'transparent', border:'none', color:'#27AE60'}}
             />

        </div>
    );
};

export default Header;