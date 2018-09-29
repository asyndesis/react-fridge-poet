import React from 'react';
import PropTypes from 'prop-types';

const CheckSwitch = ({ type = 'checkbox', name, checked = false, onChange }) => (

  <label className="switch ">
    <input type={type} name={name} checked={checked} onChange={onChange} className="success" />
    <span className="slider round"></span>
  </label>
);

CheckSwitch.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
}

export default CheckSwitch;