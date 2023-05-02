import React from 'react';
import './Header.css'


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
             <h3>Instaplant</h3>
             <input id='inputButton' type="button" value=">" onClick={goForward}
              style={{backgroundColor: 'transparent', border:'none', color:'#27AE60'}}
             />

        </div>
    );
};

export default Header;