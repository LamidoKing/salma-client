import React from 'react';
import logo from '../../images/q4.svg';

const Logo = ({width}) => {
  width = width === undefined ? 80 : width;
  return ( <img src={logo} width={width} alt="Logo" /> );
}
 
export default Logo;