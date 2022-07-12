import React from 'react'

const Dropdown = ({ label, value, options, onChange }) => {
	return (
    <div>
      <label>
      <dt>{label}</dt>
      <dd>
        <select value={value} onChange={onChange}>
          {options.map((option, idx) => (
            <option key={idx} value={option.value}>{option.value}</option>
          ))}
        </select>
      </dd>
    </label>
    </div>
  )
}

export default Dropdown