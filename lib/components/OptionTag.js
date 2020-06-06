import React from 'react';

export default (props) => (
  <div
    className="raf-tag"
    style={{ background: props.color || '#069' }}
  >
    {props.label}
    <span onClick={props.onRemove} className="raf-tag__span">X</span>
  </div>
)
