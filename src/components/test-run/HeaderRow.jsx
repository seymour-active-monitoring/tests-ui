import React from 'react';

function HeaderRow({ header, headerNum }) {
  const className = 'whitespace-nowrap py-2 px-2 text-sm text-table-value';
  return (
    <tr>

      <td className={className}>
        {header[0]}
      </td>
      <td className={className}>
        {header[1]}
      </td>
    </tr>
  );
}

export default HeaderRow;
