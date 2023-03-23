import React, { useContext } from 'react';
import GlobalContext from '../context/GlobalContext';
import './Labels.scss'


export default function Labels() {
  const { labels, updateLabel } = useContext(GlobalContext);
  return (
    <React.Fragment>
      <p className="label">Label</p>
      {labels.map(({ label: lbl, checked }, idx) => (
        <label key={idx} className="items">
          <input
            type="checkbox"
            checked={checked}
            onChange={() =>
              updateLabel({ label: lbl, checked: !checked })
            }
            className={`form-checkbox h-5 w-5 text-${lbl}-400 rounded focus:ring-0 cursor-pointer`}
          />
          <span className="indigo">{lbl}</span>
        </label>
      ))}
    </React.Fragment>
  );
}
