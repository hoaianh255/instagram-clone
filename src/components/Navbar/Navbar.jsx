import React, { useEffect, useState } from 'react';

function Navbar({children}) {
  const [value, setValue] = useState('');
  useEffect(()=>{
    setValue('oke');
    return value;
  },[value])
  return (
    <div className="navbar bg-white p-3 border border-gray-300a">
        <div className="container">
          <div className="flex justify-between">
            <div className="navbar__logo object-contain">
              <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="Logo"/>
            </div>
            {children}
          </div>
        </div>
    </div>
  );
}

export default Navbar;