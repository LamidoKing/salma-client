import React from 'react';
import lo from '../images/undraw1.svg';

const Undraw = ({width}) => {
  width = width === undefined ? 500 : width;
  return ( <img src={lo} width={width} height="500px" alt="Help" /> );
}
 
export default Undraw;