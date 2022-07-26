import React from 'react';
import {
  GARBAGE_CAN, GREEN_CHECK_MARK, LIGHTNING, PENCIL, RED_X,
} from '../../constants/IconUrls';

function TestRow({ test }) {
  return (
    <tr>
      <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
        {test.name}
      </td>
      <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
        <div className="flex">
          {test.runs.map((run) => (
            <img
              className="h-6 w-auto ml-2"
              src={run.success ? GREEN_CHECK_MARK : RED_X}
              alt="result"
            />
          ))}
        </div>
      </td>
      <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
        {test.minutesBetweenRuns}
        {' '}
        mins
      </td>
      <td>
        <button type="button" className="pl-2">
          <img
            className="h-6 w-auto"
            src={GARBAGE_CAN}
            alt="delete"
          />
        </button>
      </td>
      <td>
        <button type="button" className="pl-2">
          <img
            className="h-6 w-auto"
            src={PENCIL}
            alt="edit"
          />
        </button>
      </td>
      <td>
        <button type="button" className="pl-2">
          <img
            className="h-6 w-auto"
            src={LIGHTNING}
            alt="run now"
          />
        </button>
      </td>
    </tr>
  );
}

export default TestRow;
