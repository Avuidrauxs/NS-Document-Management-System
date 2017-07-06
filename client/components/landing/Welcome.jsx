import React from 'react';
import nsdmsLogo from '../../images/nsdms-logo-text.png';

/**
 * Welcome Component
 * this function returns a single React element ie. native DOM component
 * @return {React.Component} [A react componet element]
 */
const Welcome = () => (
  <div className="welcome-page">
    <img src={nsdmsLogo} alt="No-logo" />
  </div>
);

export default Welcome;
