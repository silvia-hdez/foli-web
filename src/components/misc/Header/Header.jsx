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

             <h3>Instaplant</h3>
          <div>
             <input type="button" value="⇦" onClick={goBack}/>
             <input type="button" value="⇨" onClick={goForward}/>
          </div>

        </div>
    );
};

export default Header;