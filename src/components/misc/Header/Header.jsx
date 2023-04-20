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
             <input type="button" value="<" onClick={goBack} 
             style={{backgroundColor: 'transparent', border:'none', color:'#9FB578'}}/>
             <h3>Instaplant</h3>
             <input type="button" value=">" onClick={goForward}
              style={{backgroundColor: 'transparent', border:'none', color:'#9FB578'}}
             />

        </div>
    );
};

export default Header;